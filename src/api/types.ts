
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Workout {
  id: string;
  userId: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
  description?: string;
  notes?: string;
}
