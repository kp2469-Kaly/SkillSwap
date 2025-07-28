import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function Experts() {
  const { data: experts = [] } = useQuery({
    queryKey: ["/api/experts"],
    retry: false,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Expert Sessions</h1>
          <p className="text-slate-600">Book one-on-one sessions with verified experts in various fields.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">No experts available at the moment.</p>
            </div>
          ) : (
            experts.map((expert: any) => (
              <Card key={expert.users.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={expert.users.profileImageUrl} />
                      <AvatarFallback>
                        {expert.users.firstName?.[0]}{expert.users.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {expert.users.firstName} {expert.users.lastName}
                      </h3>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-slate-600 ml-2">5.0 (0 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="text-sm font-medium text-slate-700">Expertise:</span>
                      <span className="text-sm text-slate-600 ml-1">Expert Skills</span>
                    </div>
                    {expert.user_profiles.expertRate && (
                      <div>
                        <span className="text-sm font-medium text-slate-700">Rate:</span>
                        <span className="text-sm text-slate-600 ml-1">
                          ${(expert.user_profiles.expertRate / 100).toFixed(0)}/hour
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-slate-600">
                      {expert.user_profiles.bio || "Professional expert ready to help you learn."}
                    </p>
                  </div>
                  <Button className="w-full bg-primary text-white hover:bg-accent">
                    Book Session
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
