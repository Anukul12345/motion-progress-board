
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { WorkoutProvider } from "./contexts/WorkoutContext";
import Layout from "./components/Layout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Profile from "./pages/Profile";
import Tutorials from "./pages/Tutorials";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <WorkoutProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <Layout>
                      <Dashboard />
                    </Layout>
                  }
                />
                <Route
                  path="/workouts"
                  element={
                    <Layout>
                      <Workouts />
                    </Layout>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Layout>
                      <Profile />
                    </Layout>
                  }
                />
                <Route
                  path="/tutorials"
                  element={
                    <Layout>
                      <Tutorials />
                    </Layout>
                  }
                />
                <Route
                  path="/blogs"
                  element={
                    <Layout>
                      <Blogs />
                    </Layout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Layout>
                      <Contact />
                    </Layout>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </WorkoutProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
