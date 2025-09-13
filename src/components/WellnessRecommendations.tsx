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
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Wellness Recommendations</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {recommendations.map((rec, index) => (
          <Card key={index} className="p-4 hover:shadow-wellness transition-all duration-300 border-0 bg-card/50 backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {rec.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors">
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