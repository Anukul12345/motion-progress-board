
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, Star, ChevronRight } from "lucide-react";
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent 
} from "@/components/ui/hover-card";

const tutorialData = [
  {
    id: 1,
    title: "Perfect Squat Form",
    description: "Learn the proper technique for squats to maximize gains and prevent injuries.",
    category: "Legs",
    duration: "15 min",
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1566241142888-11183cda6e84?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
    videoUrl: "https://www.youtube.com/embed/bEv6CCg2BC8"
  },
  {
    id: 2,
    title: "Full Back Workout",
    description: "Complete guide to strengthen your back muscles and improve posture.",
    category: "Back",
    duration: "25 min",
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
    videoUrl: "https://www.youtube.com/embed/eE7dzM0iexc"
  },
  {
    id: 3,
    title: "HIIT Cardio Workout",
    description: "High-intensity interval training to maximize calorie burn in minimum time.",
    category: "Cardio",
    duration: "20 min",
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
    videoUrl: "https://www.youtube.com/embed/ml6cT4AZdqI"
  },
  {
    id: 4,
    title: "Core Strengthening",
    description: "Build a strong core with these effective exercises.",
    category: "ABS",
    duration: "15 min",
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
    videoUrl: "https://www.youtube.com/embed/DHD1-2P94DI"
  },
  {
    id: 5,
    title: "Perfect Push-up Form",
    description: "Master different push-up variations to build a stronger chest.",
    category: "Chest",
    duration: "10 min",
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1598971639058-fab3c3177e85?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4"
  },
  {
    id: 6,
    title: "Shoulder Mobility Exercises",
    description: "Improve shoulder mobility and prevent injury with these exercises.",
    category: "Shoulder",
    duration: "12 min",
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500",
    videoUrl: "https://www.youtube.com/embed/3aRpAO6bfvA"
  }
];

const Tutorials = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handlePlayVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsVideoModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tutorials</h1>
        <p className="text-muted-foreground mt-2">
          Learn proper form and techniques for various exercises
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorialData.map((tutorial) => (
          <Card key={tutorial.id} className="overflow-hidden">
            <div className="relative h-48 bg-muted">
              <img 
                src={tutorial.thumbnail} 
                alt={tutorial.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handlePlayVideo(tutorial.videoUrl)}
                >
                  <PlayCircle className="h-4 w-4" />
                  Watch Now
                </Button>
              </div>
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {tutorial.duration}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  <CardDescription className="text-xs">{tutorial.category}</CardDescription>
                </div>
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs font-medium">{tutorial.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{tutorial.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {tutorial.duration}
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    Save <ChevronRight className="h-3 w-3" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-52">
                  <p className="text-sm">Save this tutorial to watch later</p>
                </HoverCardContent>
              </HoverCard>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isVideoModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closeVideoModal}>
          <div className="relative w-full max-w-4xl bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="outline" 
              size="icon"
              className="absolute right-2 top-2 z-10 bg-white/80 hover:bg-white"
              onClick={closeVideoModal}
            >
              ✕
            </Button>
            <div className="aspect-video w-full">
              <iframe 
                src={selectedVideo} 
                className="w-full h-full" 
                title="Tutorial Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Button variant="outline">Load More Tutorials</Button>
      </div>
    </div>
  );
};

export default Tutorials;
