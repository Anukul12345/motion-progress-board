
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock login - in a real app, this would call an API
      if (email === "demo@example.com" && password === "password") {
        const mockUser = {
          id: "user-123",
          name: "Demo User",
          email: "demo@example.com",
          avatar: "/lovable-uploads/87971e2a-f99b-45b4-b126-be3d67f3af83.png"
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate("/dashboard");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock registration - in a real app, this would call an API
      const mockUser = {
        id: "user-" + Date.now(),
        name,
        email,
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast({
        title: "Registration successful",
        description: "Welcome to FitTrack!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) throw new Error("Not authenticated");
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
