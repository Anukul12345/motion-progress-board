
import React, { useState } from "react";
import { useWorkout, Workout } from "@/contexts/WorkoutContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pencil, 
  Trash, 
  MoreVertical, 
  Calendar, 
  Clock, 
  Flame, 
  Search, 
  Dumbbell, 
  PlusCircle 
} from "lucide-react";
import { format, parseISO, isToday, isThisWeek, isThisMonth } from "date-fns";
import WorkoutForm from "@/components/WorkoutForm";

const Workouts = () => {
  const { workouts, deleteWorkout } = useWorkout();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Filter and sort workouts
  const filteredWorkouts = workouts
    .filter(
      (workout) =>
        workout.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Split workouts by time period
  const todayWorkouts = filteredWorkouts.filter((workout) =>
    isToday(parseISO(workout.date))
  );
  
  const thisWeekWorkouts = filteredWorkouts.filter(
    (workout) => isThisWeek(parseISO(workout.date)) && !isToday(parseISO(workout.date))
  );
  
  const thisMonthWorkouts = filteredWorkouts.filter(
    (workout) => 
      isThisMonth(parseISO(workout.date)) && 
      !isThisWeek(parseISO(workout.date))
  );
  
  const olderWorkouts = filteredWorkouts.filter(
    (workout) => !isThisMonth(parseISO(workout.date))
  );

  const handleEdit = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteWorkout(id);
  };

  const renderWorkoutCard = (workout: Workout) => (
    <Card key={workout.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{workout.type}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(workout)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(workout.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm mb-2">{workout.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {format(parseISO(workout.date), "MMM d, yyyy")}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {workout.duration} min
          </div>
          <div className="flex items-center">
            <Fire className="mr-1 h-4 w-4" />
            {workout.calories} kcal
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
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

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search workouts..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filteredWorkouts.length === 0 ? (
            <div className="text-center py-10">
              <Dumbbell className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="font-medium">No workouts found</h3>
              <p className="text-muted-foreground mb-4">
                Try a different search term or add a new workout
              </p>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Workout
              </Button>
            </div>
          ) : (
            filteredWorkouts.map(renderWorkoutCard)
          )}
        </TabsContent>

        <TabsContent value="today">
          {todayWorkouts.length === 0 ? (
            <div className="text-center py-10">
              <Dumbbell className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="font-medium">No workouts for today</h3>
              <p className="text-muted-foreground mb-4">
                Start your day with a new workout
              </p>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Today's Workout
              </Button>
            </div>
          ) : (
            todayWorkouts.map(renderWorkoutCard)
          )}
        </TabsContent>

        <TabsContent value="week">
          {thisWeekWorkouts.length === 0 ? (
            <div className="text-center py-10">
              <Dumbbell className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="font-medium">No workouts this week</h3>
              <p className="text-muted-foreground mb-4">
                Add some workouts to your weekly routine
              </p>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add This Week's Workout
              </Button>
            </div>
          ) : (
            thisWeekWorkouts.map(renderWorkoutCard)
          )}
        </TabsContent>

        <TabsContent value="month">
          {thisMonthWorkouts.length === 0 ? (
            <div className="text-center py-10">
              <Dumbbell className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="font-medium">No workouts this month</h3>
              <p className="text-muted-foreground mb-4">
                Start building your monthly workout history
              </p>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add A Workout
              </Button>
            </div>
          ) : (
            thisMonthWorkouts.map(renderWorkoutCard)
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
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
