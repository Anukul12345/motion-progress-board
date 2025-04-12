
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWorkout, Workout } from "@/contexts/WorkoutContext";

const workoutSchema = z.object({
  type: z.string().min(1, "Workout type is required"),
  sets: z.string().min(1, "Sets are required"),
  reps: z.string().min(1, "Reps are required"),
  weight: z.string().min(1, "Weight is required"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  calories: z.coerce.number().min(1, "Calories must be at least 1"),
});

interface WorkoutFormProps {
  workout?: Workout;
  onComplete: () => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ workout, onComplete }) => {
  const { addWorkout, updateWorkout } = useWorkout();
  const isEditing = !!workout;

  // Parse existing workout description
  const parseExerciseDetails = (description: string) => {
    const setsMatch = description.match(/(\d+)\s*sets?\s*x\s*(\d+)\s*reps?/i);
    const weightMatch = description.match(/(\d+)\s*kg/i);
    
    return {
      sets: setsMatch ? setsMatch[1] : "5",
      reps: setsMatch ? setsMatch[2] : "15",
      weight: weightMatch ? weightMatch[1] : "30",
    };
  };

  const { sets, reps, weight } = isEditing 
    ? parseExerciseDetails(workout.description) 
    : { sets: "5", reps: "15", weight: "30" };

  const form = useForm<z.infer<typeof workoutSchema>>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      type: workout?.type || "",
      sets: sets,
      reps: reps,
      weight: weight,
      duration: workout?.duration || 10,
      calories: workout?.calories || 100,
    },
  });

  const onSubmit = (values: z.infer<typeof workoutSchema>) => {
    // Create description in format: "Back Squat - 5 sets x 15 reps - 30 kg - 10 min"
    const description = `${values.type} - ${values.sets} sets x ${values.reps} reps - ${values.weight} kg`;
    
    if (isEditing && workout) {
      updateWorkout(workout.id, {
        type: values.type,
        description: description,
        duration: values.duration,
        calories: values.calories,
        date: workout.date,
      });
    } else {
      addWorkout({
        type: values.type,
        description: description,
        duration: values.duration,
        calories: values.calories,
        date: new Date().toISOString(),
      });
    }
    onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Legs">Legs</SelectItem>
                  <SelectItem value="Back">Back</SelectItem>
                  <SelectItem value="Chest">Chest</SelectItem>
                  <SelectItem value="Shoulder">Shoulder</SelectItem>
                  <SelectItem value="ABS">ABS</SelectItem>
                  <SelectItem value="Arms">Arms</SelectItem>
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="Full Body">Full Body</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="sets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sets</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reps</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calories Burned</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onComplete}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update" : "Add"} Workout
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WorkoutForm;
