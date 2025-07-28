import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function Groups() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch groups
  const { data: groups = [] } = useQuery({
    queryKey: ["/api/groups"],
    retry: false,
  });

  // Join group mutation
  const joinGroupMutation = useMutation({
    mutationFn: async (groupId: string) => {
      await apiRequest("POST", `/api/groups/${groupId}/join`, {});
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Joined group successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/groups"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user-groups"] });
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
        description: "Failed to join group",
        variant: "destructive",
      });
    },
  });

  const handleJoinGroup = (groupId: string) => {
    if (!isAuthenticated) {
      window.location.href = "/api/login";
      return;
    }
    joinGroupMutation.mutate(groupId);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Community Groups</h1>
          <p className="text-slate-600">Join skill-based communities to learn and share knowledge with like-minded people.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">No groups available at the moment.</p>
            </div>
          ) : (
            groups.map((group: any) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {group.imageUrl ? (
                      <img
                        src={group.imageUrl}
                        alt={group.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-32 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="w-12 h-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{group.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {group.description || "A community for sharing knowledge and learning together."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{group.memberCount} members</span>
                    <Button
                      onClick={() => handleJoinGroup(group.id)}
                      disabled={joinGroupMutation.isPending}
                      size="sm"
                      className="bg-primary text-white hover:bg-accent"
                    >
                      {joinGroupMutation.isPending ? "Joining..." : "Join Group"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
