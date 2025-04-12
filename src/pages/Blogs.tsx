
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, MessageSquare } from "lucide-react";
import { format } from "date-fns";

const blogData = [
  {
    id: 1,
    title: "10 Tips for Sustainable Fitness Progress",
    excerpt: "Learn how to maintain consistent progress in your fitness journey without burnout or plateaus.",
    author: "Sarah Johnson",
    date: "2025-03-15T10:00:00.000Z",
    comments: 24,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
  },
  {
    id: 2,
    title: "The Science Behind Effective Warm-ups",
    excerpt: "Discover why proper warm-up routines are crucial for performance and injury prevention.",
    author: "Dr. Michael Chen",
    date: "2025-03-10T14:30:00.000Z",
    comments: 18,
    image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
  },
  {
    id: 3,
    title: "Nutrition Myths Debunked",
    excerpt: "Separating fact from fiction in the world of fitness nutrition and dietary supplements.",
    author: "Alex Martinez",
    date: "2025-03-05T09:15:00.000Z",
    comments: 32,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
  },
  {
    id: 4,
    title: "Building Mental Resilience Through Exercise",
    excerpt: "How your physical training routine can strengthen your mental health and emotional wellbeing.",
    author: "Emma Wilson",
    date: "2025-02-28T16:45:00.000Z",
    comments: 27,
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
  }
];

const Blogs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Fitness Blog</h1>
        <p className="text-muted-foreground mt-2">
          Insights, tips, and expert advice to optimize your fitness journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {blogData.slice(0, 2).map((blog) => (
          <Card key={blog.id} className="overflow-hidden">
            <div className="h-64 bg-muted">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{blog.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <User className="h-3 w-3" />
                {blog.author}
                <span className="mx-1">•</span>
                <Calendar className="h-3 w-3" />
                {format(new Date(blog.date), "MMMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{blog.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4 mr-1" />
                {blog.comments} Comments
              </div>
              <Button variant="outline" size="sm">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogData.slice(2).map((blog) => (
          <Card key={blog.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-32 md:h-auto bg-muted">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-4">
                <h3 className="font-bold mb-2">{blog.title}</h3>
                <p className="text-sm mb-2">{blog.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(blog.date), "MMM d, yyyy")}
                  </div>
                  <Button variant="ghost" size="sm">Read</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline">View All Articles</Button>
      </div>
    </div>
  );
};

export default Blogs;
