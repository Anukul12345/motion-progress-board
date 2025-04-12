
import React from "react";
import { useWorkout } from "@/contexts/WorkoutContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fire, Dumbbell, LineChart, Clock, PlusCircle } from "lucide-react";
import WorkoutForm from "@/components/WorkoutForm";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const COLORS = ["#30D5C8", "#00A8CC", "#8B5CF6", "#FF6B6B"];

const Dashboard = () => {
  const { workouts } = useWorkout();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();
  const today = new Date().setHours(0, 0, 0, 0);

  // Calculate summary stats
  const todaysWorkouts = workouts.filter(
    (workout) => new Date(workout.date).setHours(0, 0, 0, 0) === today
  );

  const totalCaloriesToday = todaysWorkouts.reduce(
    (total, workout) => total + workout.calories,
    0
  );

  const workoutCountToday = todaysWorkouts.length;

  const avgCaloriesPerWorkout = workoutCountToday
    ? Math.round(totalCaloriesToday / workoutCountToday)
    : 0;

  // Prepare data for pie chart
  const typeCount: Record<string, number> = {};
  workouts.forEach((workout) => {
    if (typeCount[workout.type]) {
      typeCount[workout.type] += 1;
    } else {
      typeCount[workout.type] = 1;
    }
  });

  const pieChartData = Object.keys(typeCount).map((key) => ({
    name: key,
    value: typeCount[key],
  }));

  // Prepare data for bar chart - last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const barChartData = last7Days.map((date) => {
    const dayWorkouts = workouts.filter(
      (workout) => new Date(workout.date).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
    );
    const totalCalories = dayWorkouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    return {
      day: format(date, "EEE"),
      calories: totalCalories,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-blue-500">Calories Burned</p>
              <div className="flex items-baseline mt-1">
                <h2 className="text-3xl font-bold">{totalCaloriesToday.toLocaleString()}</h2>
                <span className="text-sm ml-1">kcal</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total calories burned today
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Fire className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-green-500">Workouts</p>
              <div className="flex items-baseline mt-1">
                <h2 className="text-3xl font-bold">{workoutCountToday}</h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total no. of workouts for today
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Dumbbell className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-purple-500">Average Calories Burned</p>
              <div className="flex items-baseline mt-1">
                <h2 className="text-3xl font-bold">{avgCaloriesPerWorkout.toLocaleString()}</h2>
                <span className="text-sm ml-1">kcal</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Average calories burned on each workout
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <LineChart className="h-6 w-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Workout Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Calories Burned</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#30D5C8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Workout Categories</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Add New Workout</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Workout
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Workout</DialogTitle>
                </DialogHeader>
                <WorkoutForm onComplete={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Recent Workouts</h3>
              {workouts.slice(0, 3).map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center">
                    <div className="bg-muted rounded p-1 mr-3">
                      <Dumbbell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{workout.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(workout.date), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm">{workout.calories} kcal</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Workouts Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Today's Workouts</h2>
        {todaysWorkouts.length === 0 ? (
          <p className="text-muted-foreground">No workouts for today. Add your first workout!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {todaysWorkouts.map((workout) => (
              <Card key={workout.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{workout.type}</h3>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(workout.date), "h:mm a")}
                      </p>
                    </div>
                    <div className="bg-muted rounded p-1">
                      <Dumbbell className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-sm mt-2 mb-3">{workout.description}</p>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{workout.duration} min</span>
                    </div>
                    <div className="flex items-center">
                      <Fire className="h-4 w-4 mr-1" />
                      <span>{workout.calories} kcal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
