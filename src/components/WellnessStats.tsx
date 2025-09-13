import { Card } from "@/components/ui/card";
import { TrendingUp, Calendar, Target, Award } from "lucide-react";

interface MoodEntry {
  emoji: string;
  label: string;
  value: number;
  timestamp: Date;
}

interface WellnessStatsProps {
  moods: MoodEntry[];
}

export const WellnessStats = ({ moods }: WellnessStatsProps) => {
  const currentStreak = moods.length > 0 ? Math.min(moods.length, 7) : 0;
  const avgMood = moods.length > 0 
    ? (moods.reduce((sum, mood) => sum + mood.value, 0) / moods.length).toFixed(1)
    : "0";
  
  const weeklyMoods = moods.slice(-7);
  const weeklyAvg = weeklyMoods.length > 0
    ? (weeklyMoods.reduce((sum, mood) => sum + mood.value, 0) / weeklyMoods.length).toFixed(1)
    : "0";

  const getMoodTrend = () => {
    if (moods.length < 2) return "neutral";
    const recent = moods.slice(-3).reduce((sum, mood) => sum + mood.value, 0) / 3;
    const previous = moods.slice(-6, -3).reduce((sum, mood) => sum + mood.value, 0) / 3;
    if (recent > previous) return "up";
    if (recent < previous) return "down";
    return "neutral";
  };

  const stats = [
    {
      icon: <Calendar className="w-5 h-5 text-primary" />,
      label: "Current Streak",
      value: `${currentStreak} days`,
      color: "text-primary"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-accent" />,
      label: "Overall Average",
      value: avgMood,
      color: "text-accent"
    },
    {
      icon: <Target className="w-5 h-5 text-primary-glow" />,
      label: "Weekly Average",
      value: weeklyAvg,
      color: "text-primary-glow"
    },
    {
      icon: <Award className="w-5 h-5 text-secondary-foreground" />,
      label: "Mood Trend",
      value: getMoodTrend() === "up" ? "📈 Rising" : getMoodTrend() === "down" ? "📉 Declining" : "➡️ Stable",
      color: "text-secondary-foreground"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 text-center bg-gradient-wellness/10 border-0 hover:shadow-glow transition-all duration-300">
          <div className="flex justify-center mb-2">
            {stat.icon}
          </div>
          <div className={`text-2xl font-bold ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-xs text-muted-foreground">
            {stat.label}
          </div>
        </Card>
      ))}
    </div>
  );
};