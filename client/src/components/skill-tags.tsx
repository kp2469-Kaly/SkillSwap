import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillTagsProps {
  skills: any[];
  type: "offer" | "want";
  className?: string;
}

export default function SkillTags({ skills, type, className }: SkillTagsProps) {
  const [newSkillName, setNewSkillName] = useState("");
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: allSkills = [] } = useQuery({
    queryKey: ["/api/skills"],
    retry: false,
  });

  const addSkillMutation = useMutation({
    mutationFn: async (skillName: string) => {
      let skill = allSkills.find((s: any) => s.name.toLowerCase() === skillName.toLowerCase());
      
      if (!skill) {
        const response = await apiRequest("POST", "/api/skills", {
          name: skillName,
          category: "General",
        });
        skill = await response.json();
      }

      await apiRequest("POST", "/api/user-skills", {
        skillId: skill.id,
        type,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Skill added to ${type === "offer" ? "teaching" : "learning"} list`,
      });
      setNewSkillName("");
      queryClient.invalidateQueries({ queryKey: ["/api/user-skills"] });
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
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
        description: "Failed to add skill",
        variant: "destructive",
      });
    },
  });

  const removeSkillMutation = useMutation({
    mutationFn: async (skillId: string) => {
      await apiRequest("DELETE", `/api/user-skills/${skillId}/${type}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Skill removed",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user-skills"] });
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
        description: "Failed to remove skill",
        variant: "destructive",
      });
    },
  });

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      addSkillMutation.mutate(newSkillName.trim());
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    removeSkillMutation.mutate(skillId);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill: any) => (
          <Badge
            key={skill.id}
            variant={type === "offer" ? "default" : "secondary"}
            className={cn(
              "px-3 py-1 text-sm",
              type === "offer" ? "bg-primary text-white" : "bg-secondary text-white"
            )}
          >
            {skill.name}
            {isAuthenticated && (
              <button
                onClick={() => handleRemoveSkill(skill.id)}
                className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                disabled={removeSkillMutation.isPending}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </Badge>
        ))}
      </div>
      
      {isAuthenticated && (
        <div className="flex space-x-2">
          <Input
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add new skill..."
            className="flex-1"
          />
          <Button
            onClick={handleAddSkill}
            disabled={!newSkillName.trim() || addSkillMutation.isPending}
            size="sm"
            className="bg-primary text-white hover:bg-accent"
          >
            {addSkillMutation.isPending ? (
              "Adding..."
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
