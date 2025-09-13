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
    <Card className="p-6 bg-gradient-calm border-0 shadow-wellness">
      <h3 className="text-xl font-semibold mb-4 text-center">How are you feeling today?</h3>
      
      <div className="grid grid-cols-5 gap-3 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105
              ${selectedMood === mood.value 
                ? 'border-primary bg-primary/10 shadow-glow' 
                : 'border-border hover:border-primary/50 bg-card'
              }
            `}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-xs font-medium text-muted-foreground">{mood.label}</div>
          </button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="How was your day? (optional)"
        className="w-full p-3 border border-border rounded-lg bg-background resize-none h-20 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      />

      <Button 
        onClick={handleSubmit}
        disabled={!selectedMood}
        className="w-full bg-gradient-wellness hover:shadow-glow transition-all duration-300"
      >
        Record Mood
      </Button>
    </Card>
  );
};