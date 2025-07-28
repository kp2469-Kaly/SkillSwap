import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MatchCardProps {
  match: any;
}

export default function MatchCard({ match }: MatchCardProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/sessions", {
        teacherId: match.user.id,
        studentId: match.user.id, // This would be the current user in a real implementation
        skillId: match.offeredSkill.id,
        title: `${match.offeredSkill.name} Session`,
        description: `Learn ${match.offeredSkill.name} from ${match.user.firstName}`,
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        duration: 60,
        type: 'video',
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Session request sent successfully",
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
        description: "Failed to send session request",
        variant: "destructive",
      });
    },
  });

  const handleConnect = () => {
    if (!isAuthenticated) {
      window.location.href = "/api/login";
      return;
    }
    createSessionMutation.mutate();
  };
  const matchScore = Math.floor(Math.random() * 20) + 80; // Mock score between 80-100

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={match.user.profileImageUrl} />
            <AvatarFallback>
              {match.user.firstName?.[0]}{match.user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-slate-900">
              {match.user.firstName} {match.user.lastName}
            </h3>
            <p className="text-sm text-slate-600">{match.profile?.location || "Location not specified"}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div>
            <span className="text-sm font-medium text-slate-700">Teaches:</span>
            <span className="text-sm text-slate-600 ml-1">{match.offeredSkill?.name}</span>
          </div>
          <div>
            <span className="text-sm font-medium text-slate-700">Wants to learn:</span>
            <span className="text-sm text-slate-600 ml-1">{match.wantedSkill?.name}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-slate-700">Match Score:</span>
            <Badge
              variant={matchScore >= 90 ? "default" : "secondary"}
              className={cn(
                "ml-2",
                matchScore >= 90 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              )}
            >
              {matchScore}%
            </Badge>
          </div>
        </div>
        
        <Button
          onClick={handleConnect}
          disabled={createSessionMutation.isPending}
          className="w-full bg-primary text-white hover:bg-accent"
        >
          {createSessionMutation.isPending ? "Connecting..." : "Connect"}
        </Button>
      </CardContent>
    </Card>
  );
}

function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(" ");
}
