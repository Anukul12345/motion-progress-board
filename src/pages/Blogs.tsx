
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Heart, 
  MessageSquare, 
  Search, 
  Share2,
  BookText,
  Tag,
  Eye
} from "lucide-react";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Effective Exercises for Building Muscle",
    excerpt: "Discover the most efficient exercises to build muscle mass quickly and effectively without spending hours in the gym.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    author: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Fitness Coach"
    },
    date: "Apr 2, 2025",
    readTime: "5 min read",
    category: "Strength Training",
    tags: ["Muscle Building", "Fitness", "Workout"],
    likes: 245,
    comments: 32
  },
  {
    id: 2,
    title: "The Ultimate Guide to Nutrition for Athletes",
    excerpt: "Learn how to fuel your body properly for maximum performance and recovery with this comprehensive nutrition guide.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    author: {
      name: "Sarah Miller",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Nutritionist"
    },
    date: "Apr 5, 2025",
    readTime: "8 min read",
    category: "Nutrition",
    tags: ["Diet", "Health", "Performance"],
    likes: 187,
    comments: 24
  },
  {
    id: 3,
    title: "How to Create a Sustainable Workout Routine",
    excerpt: "Building a workout routine you can stick with is key to long-term fitness success. Here's how to create one that lasts.",
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    author: {
      name: "Mike Thompson",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      role: "Personal Trainer"
    },
    date: "Apr 8, 2025",
    readTime: "6 min read",
    category: "Fitness",
    tags: ["Routine", "Consistency", "Motivation"],
    likes: 203,
    comments: 41
  },
  {
    id: 4,
    title: "The Science Behind HIIT Workouts",
    excerpt: "High-intensity interval training has taken the fitness world by storm. Discover the science that makes it so effective.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    author: {
      name: "Dr. Lisa Chen",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      role: "Exercise Physiologist"
    },
    date: "Apr 10, 2025",
    readTime: "7 min read",
    category: "Cardio",
    tags: ["HIIT", "Cardio", "Science"],
    likes: 176,
    comments: 19
  },
  {
    id: 5,
    title: "Mindfulness and Exercise: A Perfect Combination",
    excerpt: "Combining mindfulness practices with your workout routine can enhance results and improve mental health.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1220&q=80",
    author: {
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      role: "Mindfulness Coach"
    },
    date: "Apr 12, 2025",
    readTime: "5 min read",
    category: "Wellness",
    tags: ["Mindfulness", "Mental Health", "Wellness"],
    likes: 168,
    comments: 27
  }
];

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});

  const handleLike = (id: number) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          FitTrack Fitness Blog
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Expert advice, tips, and insights to help you achieve your fitness goals
        </p>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  isLiked={!!likedPosts[post.id]} 
                  onLike={() => handleLike(post.id)} 
                />
              ))}
            </div>
          </TabsContent>

          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts
                  .filter(post => post.category === category)
                  .map((post) => (
                    <BlogCard 
                      key={post.id} 
                      post={post} 
                      isLiked={!!likedPosts[post.id]} 
                      onLike={() => handleLike(post.id)} 
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center">
          <Button variant="outline" size="lg" className="animate-pulse">
            <BookOpen className="mr-2 h-4 w-4" />
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

interface BlogCardProps {
  post: typeof blogPosts[0];
  isLiked: boolean;
  onLike: () => void;
}

const BlogCard = ({ post, isLiked, onLike }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary hover:bg-primary/80">{post.category}</Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors cursor-pointer">
              {post.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              <span>{Math.floor(Math.random() * 1000) + 200}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{post.author.name}</span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{post.author.name}</h4>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
                <div className="flex items-center pt-2">
                  <BookText className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 20) + 5} articles</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={isLiked ? "text-red-500" : ""}
            onClick={onLike}
          >
            <Heart className={`mr-1 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {post.likes + (isLiked ? 1 : 0)}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="mr-1 h-4 w-4" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Blogs;
