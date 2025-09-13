import { useState, useEffect } from "react";
import { MoodSelector } from "@/components/MoodSelector";
import { MoodChart } from "@/components/MoodChart";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";
import { WellnessStats } from "@/components/WellnessStats";
import { Button } from "@/components/ui/button";
import { Heart, Brain, BarChart3, Settings } from "lucide-react";
import wellnessHero from "@/assets/wellness-hero.jpg";

interface MoodEntry {
  emoji: string;
  label: string;
  value: number;
  timestamp: Date;
}

const Index = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  useEffect(() => {
    const savedMoods = localStorage.getItem('wellness-moods');
    if (savedMoods) {
      const parsedMoods = JSON.parse(savedMoods).map((mood: any) => ({
        ...mood,
        timestamp: new Date(mood.timestamp)
      }));
      setMoods(parsedMoods);
    }
  }, []);

  const handleMoodSelect = (mood: MoodEntry) => {
    const newMoods = [...moods, mood];
    setMoods(newMoods);
    localStorage.setItem('wellness-moods', JSON.stringify(newMoods));
    setShowMoodSelector(false);
  };

  const todayMood = moods.find(mood => 
    mood.timestamp.toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="relative mb-12">
            <img 
              src={wellnessHero} 
              alt="Wellness and mental health illustration" 
              className="w-full max-w-2xl mx-auto rounded-3xl shadow-soft animate-float"
            />
            <div className="absolute inset-0 bg-gradient-wellness/10 rounded-3xl"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-wellness bg-clip-text text-transparent font-rounded">
            Student Wellness Monitor
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-rounded leading-relaxed">
            Track your daily mood, discover patterns, and receive personalized wellness recommendations to support your mental health journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => setShowMoodSelector(true)}
              className="bg-gradient-wellness hover:shadow-glow transition-all duration-500 text-lg px-10 py-4 rounded-2xl font-rounded font-medium hover:scale-105"
              disabled={!!todayMood}
            >
              <Heart className="w-5 h-5 mr-2" />
              {todayMood ? "Mood Recorded Today" : "Check In Today"}
            </Button>
            <Button variant="outline" className="text-lg px-10 py-4 hover:bg-primary/10 transition-all duration-500 rounded-2xl font-rounded font-medium hover:scale-105">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-12">
          {/* Stats Overview */}
          <WellnessStats moods={moods} />

          {/* Mood Check-in */}
          {showMoodSelector && (
            <div className="max-w-2xl mx-auto">
              <MoodSelector onMoodSelect={handleMoodSelect} />
            </div>
          )}

          {/* Charts and Recommendations */}
          <div className="grid md:grid-cols-2 gap-12">
            <MoodChart moods={moods} />
            <div>
              <WellnessRecommendations />
            </div>
          </div>

          {/* Recent Moods */}
          {moods.length > 0 && (
            <div className="bg-card/60 backdrop-blur rounded-3xl p-8 border-0 shadow-soft">
              <h3 className="text-2xl font-medium mb-6 flex items-center gap-3 font-rounded">
                <Brain className="w-6 h-6 text-primary animate-soft-pulse" />
                Recent Check-ins
              </h3>
              <div className="grid gap-4">
                {moods.slice(-5).reverse().map((mood, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background/60 backdrop-blur rounded-2xl hover:shadow-soft transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl animate-float">{mood.emoji}</span>
                      <div>
                        <p className="font-medium font-rounded text-lg">{mood.label}</p>
                        <p className="text-sm text-muted-foreground font-rounded">
                          {mood.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
