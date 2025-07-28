import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import SkillTags from "@/components/skill-tags";
import MatchCard from "@/components/match-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Video, MapPin, Bell, CheckCircle, XCircle, X } from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    bio: "",
    location: "",
    availabilityDays: [] as string[],
    availabilityTimes: "",
    preferVideoCall: true,
    preferInPerson: true,
  });

  const [showSessionForm, setShowSessionForm] = useState(false);
  const [sessionData, setSessionData] = useState({
    teacherId: "",
    skillId: "",
    title: "",
    description: "",
    scheduledAt: "",
    duration: 60,
    type: "video" as "video" | "in_person",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: profile } = useQuery({
    queryKey: ["/api/profile"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: userSkills = [] } = useQuery({
    queryKey: ["/api/user-skills"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: matches = [] } = useQuery({
    queryKey: ["/api/matches"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: sessions = [] } = useQuery({
    queryKey: ["/api/sessions"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["/api/notifications"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: allSkills = [] } = useQuery({
    queryKey: ["/api/skills"],
    retry: false,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/profile", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const createSessionMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/sessions", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Session scheduled successfully",
      });
      setShowSessionForm(false);
      setSessionData({
        teacherId: "",
        skillId: "",
        title: "",
        description: "",
        scheduledAt: "",
        duration: 60,
        type: "video",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to schedule session",
        variant: "destructive",
      });
    },
  });

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(profileData);
  };

  const handleCreateSession = () => {
    if (!sessionData.teacherId || !sessionData.skillId || !sessionData.title || !sessionData.scheduledAt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    createSessionMutation.mutate({
      ...sessionData,
      studentId: (user as any)?.id, 
    });
  };

  useEffect(() => {
    if (profile) {
      setProfileData({
        bio: (profile as any).bio || "",
        location: (profile as any).location || "",
        availabilityDays: (profile as any).availabilityDays || [],
        availabilityTimes: (profile as any).availabilityTimes || "",
        preferVideoCall: (profile as any).preferVideoCall ?? true,
        preferInPerson: (profile as any).preferInPerson ?? true,
      });
    }
  }, [profile]);

  const offeredSkills = (userSkills as any[]).filter((us: any) => us.user_skills?.type === 'offer');
  const wantedSkills = (userSkills as any[]).filter((us: any) => us.user_skills?.type === 'want');

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome back, {(user as any)?.firstName || 'there'}!
          </h1>
          <p className="text-slate-600">Here's what's happening with your skill exchanges.</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="matches">My Matches</TabsTrigger>
            <TabsTrigger value="sessions">Scheduled Sessions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Location
                    </label>
                    <Input
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Availability Times
                    </label>
                    <Input
                      value={profileData.availabilityTimes}
                      onChange={(e) => setProfileData({ ...profileData, availabilityTimes: e.target.value })}
                      placeholder="Weekdays 6-9pm, Weekends anytime"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bio
                  </label>
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Tell others about yourself and your interests..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Skills I Can Teach
                  </label>
                  <SkillTags
                    skills={offeredSkills.map((us: any) => us.skills)}
                    type="offer"
                    className="mb-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Skills I Want to Learn
                  </label>
                  <SkillTags
                    skills={wantedSkills.map((us: any) => us.skills)}
                    type="want"
                    className="mb-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Learning Method
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="video"
                        checked={profileData.preferVideoCall}
                        onCheckedChange={(checked) =>
                          setProfileData({ ...profileData, preferVideoCall: !!checked })
                        }
                      />
                      <label htmlFor="video" className="text-slate-700">Video Call</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inperson"
                        checked={profileData.preferInPerson}
                        onCheckedChange={(checked) =>
                          setProfileData({ ...profileData, preferInPerson: !!checked })
                        }
                      />
                      <label htmlFor="inperson" className="text-slate-700">In-Person</label>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  disabled={updateProfileMutation.isPending}
                  className="bg-primary text-white hover:bg-accent"
                >
                  {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(matches as any[]).length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-500">No matches found yet. Complete your profile to find skill partners!</p>
                </div>
              ) : (
                (matches as any[]).map((match: any) => (
                  <MatchCard key={match.user.id} match={match} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Scheduled Sessions</h2>
                <p className="text-sm text-slate-600">Manage your upcoming skill exchange sessions</p>
              </div>
              <Button 
                onClick={() => setShowSessionForm(true)}
                className="bg-primary text-white hover:bg-accent"
              >
                Schedule New Session
              </Button>
            </div>
            
            <div className="space-y-4">
              {(sessions as any[]).length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500">No sessions scheduled yet.</p>
                  <Button 
                    onClick={() => setShowSessionForm(true)}
                    className="mt-4 bg-primary text-white hover:bg-accent"
                  >
                    Schedule Your First Session
                  </Button>
                </div>
              ) : (
                (sessions as any[]).map((session: any) => (
                  <Card key={session.sessions_table.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-slate-900">
                              {session.sessions_table.title}
                            </h3>
                            <Badge
                              variant={
                                session.sessions_table.status === 'accepted'
                                  ? 'default'
                                  : session.sessions_table.status === 'pending'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                            >
                              {session.sessions_table.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 space-y-1">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(session.sessions_table.scheduledAt).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })} at {new Date(session.sessions_table.scheduledAt).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </div>
                            <div className="flex items-center">
                              {session.sessions_table.type === 'video' ? (
                                <Video className="w-4 h-4 mr-2" />
                              ) : (
                                <MapPin className="w-4 h-4 mr-2" />
                              )}
                              {session.sessions_table.type === 'video' ? 'Video Call' : 'In-Person'}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {session.sessions_table.duration} minutes
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {session.sessions_table.status === 'accepted' && (
                            <Button size="sm" className="bg-primary text-white hover:bg-accent">
                              Join Call
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-slate-200">
                  {(notifications as any[]).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500">No notifications yet.</p>
                    </div>
                  ) : (
                    (notifications as any[]).map((notification: any) => (
                      <div key={notification.id} className="p-4 hover:bg-slate-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-slate-900 font-medium">{notification.title}</p>
                            <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-slate-500 mt-2">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full ml-4 mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Session Form Dialog */}
        <Dialog open={showSessionForm} onOpenChange={setShowSessionForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Choose Teacher/Partner *
                </label>
                <Select 
                  value={sessionData.teacherId} 
                  onValueChange={(value) => setSessionData({ ...sessionData, teacherId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {(matches as any[]).map((match: any) => (
                      <SelectItem key={match.user.id} value={match.user.id}>
                        {match.user.firstName} {match.user.lastName} - {match.offeredSkill?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Skill *
                </label>
                <Select 
                  value={sessionData.skillId} 
                  onValueChange={(value) => setSessionData({ ...sessionData, skillId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {(allSkills as any[]).map((skill: any) => (
                      <SelectItem key={skill.id} value={skill.id}>
                        {skill.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Session Title *
                </label>
                <Input
                  value={sessionData.title}
                  onChange={(e) => setSessionData({ ...sessionData, title: e.target.value })}
                  placeholder="e.g., Introduction to Guitar Playing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <Textarea
                  value={sessionData.description}
                  onChange={(e) => setSessionData({ ...sessionData, description: e.target.value })}
                  placeholder="Describe what you'd like to learn or accomplish in this session..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date & Time *
                  </label>
                  <Input
                    type="datetime-local"
                    value={sessionData.scheduledAt}
                    onChange={(e) => setSessionData({ ...sessionData, scheduledAt: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Duration (minutes)
                  </label>
                  <Select 
                    value={sessionData.duration.toString()} 
                    onValueChange={(value) => setSessionData({ ...sessionData, duration: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Session Type
                </label>
                <Select 
                  value={sessionData.type} 
                  onValueChange={(value: "video" | "in_person") => setSessionData({ ...sessionData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="in_person">In-Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={() => setShowSessionForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateSession}
                  disabled={createSessionMutation.isPending}
                  className="flex-1 bg-primary text-white hover:bg-accent"
                >
                  {createSessionMutation.isPending ? "Scheduling..." : "Schedule Session"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
