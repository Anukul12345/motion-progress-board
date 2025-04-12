
import React, { useState } from "react";
import { useWorkout, Workout } from "@/contexts/WorkoutContext";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  MoreVertical, 
  Calendar as CalendarIcon, 
  Clock, 
  Dumbbell,
  PlusCircle,
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, isToday } from "date-fns";
import WorkoutForm from "@/components/WorkoutForm";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const Workouts = () => {
  const { workouts, deleteWorkout } = useWorkout();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Get workouts for the selected date
  const todaysWorkouts = selectedDate 
    ? workouts.filter(workout => {
        const workoutDate = parseISO(workout.date);
        return (
          workoutDate.getDate() === selectedDate.getDate() &&
          workoutDate.getMonth() === selectedDate.getMonth() &&
          workoutDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  const handleEdit = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsEditDialogOpen(true);
  };

  // Extract exercise details from description
  const parseExerciseDetails = (description: string) => {
    // Try to extract sets, reps and weight from descriptions like "Back Squat - 5 sets x 15 reps - 30 kg - 10 min"
    const setsMatch = description.match(/(\d+)\s*sets?\s*x\s*(\d+)\s*reps?/i);
    const weightMatch = description.match(/(\d+)\s*kg/i);
    
    return {
      sets: setsMatch ? setsMatch[1] : "5",
      reps: setsMatch ? setsMatch[2] : "15",
      weight: weightMatch ? weightMatch[1] : "30",
    };
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Workouts</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Workout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Workout</DialogTitle>
            </DialogHeader>
            <WorkoutForm onComplete={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Date selector panel */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Select Date</h2>
          <div className="calendar-container">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mb-4",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "MMMM yyyy") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <div className="mt-2 calendar-navigation flex justify-between items-center mb-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  if (selectedDate) {
                    const prevDay = new Date(selectedDate);
                    prevDay.setDate(prevDay.getDate() - 1);
                    setSelectedDate(prevDay);
                  }
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                {selectedDate && isToday(selectedDate) && (
                  <span className="ml-2 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">Today</span>
                )}
              </span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  if (selectedDate) {
                    const nextDay = new Date(selectedDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setSelectedDate(nextDay);
                  }
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Workouts display */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedDate 
              ? `${isToday(selectedDate) ? "Today's" : format(selectedDate, "MMMM d")} Workouts` 
              : "Workouts"}
          </h2>
          
          {todaysWorkouts.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg border shadow-sm">
              <Dumbbell className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="font-medium">No workouts found</h3>
              <p className="text-muted-foreground mb-4">
                {isToday(selectedDate || new Date()) 
                  ? "Add your workout for today" 
                  : `Add a workout for ${format(selectedDate || new Date(), "MMM d")}`}
              </p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Workout
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todaysWorkouts.map((workout) => {
                const { sets, reps, weight } = parseExerciseDetails(workout.description);
                
                return (
                  <Card key={workout.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="px-4 py-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge 
                              variant="outline" 
                              className="mb-2 bg-blue-50 text-blue-600 hover:bg-blue-50 border-blue-100"
                            >
                              #{workout.type}
                            </Badge>
                            <h3 className="text-lg font-semibold">{workout.type}</h3>
                            <p className="text-sm text-gray-500 mt-1">Count: {sets} sets x {reps} reps</p>
                          </div>
                          <div className="flex">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(workout)}>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="border-t px-4 py-3 bg-gray-50 flex justify-between">
                        <div className="flex items-center">
                          <Dumbbell className="mr-2 h-4 w-4 text-gray-500" /> 
                          <span className="text-sm">{weight} kg</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm">{workout.duration} min</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Workout</DialogTitle>
          </DialogHeader>
          {selectedWorkout && (
            <WorkoutForm 
              workout={selectedWorkout} 
              onComplete={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workouts;
