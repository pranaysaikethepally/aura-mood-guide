import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

interface MoodEntry {
  emoji: string;
  label: string;
  value: number;
  timestamp: Date;
}

interface MoodChartProps {
  moods: MoodEntry[];
}

export const MoodChart = ({ moods }: MoodChartProps) => {
  const chartData = moods.slice(-7).map((mood, index) => ({
    day: mood.timestamp.toLocaleDateString('en-US', { weekday: 'short' }),
    mood: mood.value,
    label: mood.label,
    emoji: mood.emoji,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/90 backdrop-blur p-4 rounded-2xl border shadow-soft">
          <p className="font-medium font-rounded">{label}</p>
          <p className="text-primary font-rounded">
            {data.emoji} {data.label}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-8 bg-gradient-mood border-0 shadow-soft rounded-3xl backdrop-blur-sm">
      <h3 className="text-2xl font-medium mb-6 font-rounded">Your Mood Trend</h3>
      
      {chartData.length > 0 ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="hsl(var(--primary))"
                strokeWidth={4}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 3, r: 8 }}
                activeDot={{ r: 10, stroke: "hsl(var(--primary-glow))", strokeWidth: 3, fill: "hsl(var(--background))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-muted-foreground">
          <p className="font-rounded text-lg">Start tracking your mood to see trends!</p>
        </div>
      )}
    </Card>
  );
};