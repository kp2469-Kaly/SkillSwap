import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar";
import MatchCard from "@/components/match-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function Matches() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated
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

  // Fetch matches
  const { data: matches = [] } = useQuery({
    queryKey: ["/api/matches"],
    enabled: isAuthenticated,
    retry: false,
  });

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
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Find Skill Matches</h1>
          <p className="text-slate-600">Discover people who can teach you new skills while learning from your expertise.</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Skill Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="languages">Languages</SelectItem>
                    <SelectItem value="arts">Arts & Music</SelectItem>
                    <SelectItem value="sports">Sports & Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Within 25 miles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">Within 25 miles</SelectItem>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                    <SelectItem value="50">Within 50 miles</SelectItem>
                    <SelectItem value="remote">Remote only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Learning Method</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Both" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Match Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">No matches found yet. Complete your profile to find skill partners!</p>
            </div>
          ) : (
            matches.map((match: any) => (
              <MatchCard key={match.user.id} match={match} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
