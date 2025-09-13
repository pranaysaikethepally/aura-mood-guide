import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const moods = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "text-blue-500" },
  { emoji: "😔", label: "Sad", value: 2, color: "text-blue-400" },
  { emoji: "😐", label: "Neutral", value: 3, color: "text-gray-500" },
  { emoji: "🙂", label: "Good", value: 4, color: "text-green-400" },
  { emoji: "😊", label: "Great", value: 5, color: "text-green-500" },
];

interface MoodSelectorProps {
  onMoodSelect: (mood: { emoji: string; label: string; value: number; timestamp: Date }) => void;
}

export const MoodSelector = ({ onMoodSelect }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (selectedMood) {
      const mood = moods.find(m => m.value === selectedMood);
      if (mood) {
        onMoodSelect({
          ...mood,
          timestamp: new Date(),
        });
        setSelectedMood(null);
        setNote("");
      }
    }
  };

  return (
    <Card className="p-8 bg-gradient-calm border-0 shadow-soft rounded-3xl backdrop-blur-sm">
      <h3 className="text-2xl font-medium mb-6 text-center font-rounded">How are you feeling today?</h3>
      
      <div className="grid grid-cols-5 gap-4 mb-8">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={`
              p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-105 font-rounded
              ${selectedMood === mood.value 
                ? 'border-primary bg-primary/10 shadow-glow animate-gentle-bounce' 
                : 'border-border hover:border-primary/50 bg-card/80 backdrop-blur hover:shadow-soft'
              }
            `}
          >
            <div className="text-4xl mb-3 animate-float">{mood.emoji}</div>
            <div className="text-sm font-medium text-muted-foreground">{mood.label}</div>
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="How was your day? (optional)"
        className="w-full p-4 border border-border rounded-2xl bg-background/50 backdrop-blur resize-none h-24 mb-6 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 font-rounded placeholder:text-muted-foreground/60"
      />

      <Button 
        onClick={handleSubmit}
        disabled={!selectedMood}
        className="w-full bg-gradient-wellness hover:shadow-glow transition-all duration-500 py-4 rounded-2xl font-medium text-lg font-rounded"
      >
        Record Mood
      </Button>
    </Card>
  );
};