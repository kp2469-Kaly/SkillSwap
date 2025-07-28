import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const { data: notifications = [] } = useQuery({
    queryKey: ["/api/notifications"],
    enabled: isAuthenticated,
    retry: false,
  });

  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/matches", label: "Find Matches" },
    { path: "/experts", label: "Experts" },
    { path: "/groups", label: "Groups" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-semibold text-slate-900">SkillSwap</div>
          
          {isAuthenticated && (
            <>
              <div className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <a
                      className={`${
                        location === item.path
                          ? "text-primary font-medium"
                          : "text-slate-600 hover:text-slate-900"
                      } transition-colors`}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-slate-600 hover:text-slate-900 relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profileImageUrl} />
                    <AvatarFallback>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
