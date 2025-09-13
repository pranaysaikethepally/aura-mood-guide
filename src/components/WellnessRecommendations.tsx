import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Moon, Zap } from "lucide-react";

interface Recommendation {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}

const recommendations: Recommendation[] = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "Mindfulness Meditation",
    description: "Take 5 minutes to practice breathing exercises and center yourself.",
    action: "Start Session"
  },
  {
    icon: <Heart className="w-6 h-6 text-accent" />,
    title: "Gratitude Practice",
    description: "Write down three things you're grateful for today.",
    action: "Open Journal"
  },
  {
    icon: <Zap className="w-6 h-6 text-primary-glow" />,
    title: "Quick Exercise",
    description: "Get your blood flowing with a 10-minute movement break.",
    action: "View Exercises"
  },
  {
    icon: <Moon className="w-6 h-6 text-secondary-foreground" />,
    title: "Sleep Hygiene",
    description: "Prepare for better rest with our evening routine guide.",
    action: "Learn More"
  }
];

export const WellnessRecommendations = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-medium font-rounded">Wellness Recommendations</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        {recommendations.map((rec, index) => (
          <Card key={index} className="p-6 hover:shadow-soft transition-all duration-500 hover:scale-105 border-0 bg-card/60 backdrop-blur rounded-3xl group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300 animate-soft-pulse">
                {rec.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2 font-rounded text-lg">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 font-rounded leading-relaxed">{rec.description}</p>
                <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors duration-300 rounded-xl font-rounded">
                  {rec.action}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};