
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dumbbell } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Workouts", path: "/workouts" },
    { name: "Tutorials", path: "/tutorials" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  if (!isAuthenticated && location.pathname !== "/login" && location.pathname !== "/register") {
    return children;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-fitness-primary" />
              <span className="text-xl font-bold text-gray-800">FitTrack</span>
            </Link>
          </div>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || ""} />
                    <AvatarFallback className="bg-primary text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
