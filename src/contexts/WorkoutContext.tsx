
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Workout {
  id: string;
  type: string;
  description: string;
  duration: number;
  calories: number;
  date: string;
}

interface WorkoutContextType {
  workouts: Workout[];
  addWorkout: (workout: Omit<Workout, "id">) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  isLoading: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load workouts from localStorage
  useEffect(() => {
    const storedWorkouts = localStorage.getItem("workouts");
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    } else {
      // Add some sample workouts if none exist
      const sampleWorkouts = [
        {
          id: "workout-1",
          type: "Legs",
          description: "Back Squat - 5 sets x 15 reps - 30 kg - 10 min",
          duration: 45,
          calories: 350,
          date: new Date().toISOString(),
        },
        {
          id: "workout-2",
          type: "Back",
          description: "Deadlift - 5 sets x 10 reps - 60 kg - 15 min",
          duration: 50,
          calories: 400,
          date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "workout-3",
          type: "Shoulder",
          description: "Overhead Press - 4 sets x 12 reps - 25 kg - 12 min",
          duration: 35,
          calories: 280,
          date: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: "workout-4",
          type: "ABS",
          description: "Crunches - 3 sets x 20 reps - bodyweight - 10 min",
          duration: 30,
          calories: 200,
          date: new Date(Date.now() - 259200000).toISOString(),
        },
      ];
      setWorkouts(sampleWorkouts);
      localStorage.setItem("workouts", JSON.stringify(sampleWorkouts));
    }
    setIsLoading(false);
  }, []);

  // Save workouts to localStorage when they change
  useEffect(() => {
    if (workouts.length > 0) {
      localStorage.setItem("workouts", JSON.stringify(workouts));
    }
  }, [workouts]);

  const addWorkout = (workout: Omit<Workout, "id">) => {
    const newWorkout = {
      ...workout,
      id: `workout-${Date.now()}`,
    };
    
    setWorkouts((prev) => [...prev, newWorkout]);
    toast({
      title: "Workout added",
      description: "Your workout has been added successfully",
    });
  };

  const updateWorkout = (id: string, workout: Partial<Workout>) => {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...workout } : w))
    );
    toast({
      title: "Workout updated",
      description: "Your workout has been updated successfully",
    });
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
    toast({
      title: "Workout deleted",
      description: "Your workout has been deleted successfully",
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        isLoading,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};
