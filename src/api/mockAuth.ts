
import { User } from "./types";
import { setToken } from "./api";

// Mock user data
const mockUsers = [
  {
    id: "user-123",
    name: "Demo User",
    email: "demo@example.com",
    password: "password", // In a real app, this would be hashed
    avatar: "/lovable-uploads/87971e2a-f99b-45b4-b126-be3d67f3af83.png"
  }
];

export const mockLogin = async (email: string, password: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const user = mockUsers.find(u => u.email === email);
  
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  
  // Create a mock token
  const token = `mock-token-${Date.now()}`;
  
  // Store the token
  setToken(token);
  
  return { 
    user: userWithoutPassword,
    token 
  };
};

export const mockRegister = async (name: string, email: string, password: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Check if user already exists
  if (mockUsers.some(u => u.email === email)) {
    throw new Error("User with this email already exists");
  }
  
  // Create new user
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
  };
  
  mockUsers.push(newUser);
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser;
  
  // Create a mock token
  const token = `mock-token-${Date.now()}`;
  
  // Store the token
  setToken(token);
  
  return {
    user: userWithoutPassword,
    token
  };
};

export const mockUpdateProfile = async (userId: string, data: Partial<User>) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  
  // Update user
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...data
  };
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = mockUsers[userIndex];
  
  return userWithoutPassword;
};
