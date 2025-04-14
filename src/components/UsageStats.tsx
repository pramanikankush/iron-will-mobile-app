
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DailyUsage, WeeklyUsage, AppUsage } from "@/types";

interface UsageStatsProps {
  dailyUsage: DailyUsage;
  weeklyUsage: WeeklyUsage;
}

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const UsageStats = ({ dailyUsage, weeklyUsage }: UsageStatsProps) => {
  const weeklyData = weeklyUsage.days.map((day) => {
    const date = new Date(day.date);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      distracting: day.distractingTimeMinutes,
      productive: day.productiveTimeMinutes,
      neutral: day.neutralTimeMinutes,
    };
  });

  // Calculate percentage over weekly goal
  const totalDistractingMinutes = weeklyUsage.days.reduce(
    (sum, day) => sum + day.distractingTimeMinutes, 
    0
  );
  
  const percentageOfGoal = Math.round((totalDistractingMinutes / weeklyUsage.weeklyGoalMinutes) * 100);
  const isOverGoal = percentageOfGoal > 100;

  const getAppCategoryColor = (category: string) => {
    switch(category) {
      case 'productive': return '#4ade80';
      case 'distracting': return '#f43f5e';
      case 'neutral': return '#94a3b8';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-ironWill-dark border-ironWill-gray overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Today's Usage</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 pt-0">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Total Screen Time:</span>
              <span className="font-bold">{formatTime(dailyUsage.totalScreenTimeMinutes)}</span>
            </div>
            <div className="h-3 bg-ironWill-gray rounded-full overflow-hidden">
              <div className="flex h-full">
                <div 
                  className="bg-[#4ade80]" 
                  style={{ width: `${(dailyUsage.productiveTimeMinutes / dailyUsage.totalScreenTimeMinutes) * 100}%` }}
                />
                <div 
                  className="bg-[#94a3b8]" 
                  style={{ width: `${(dailyUsage.neutralTimeMinutes / dailyUsage.totalScreenTimeMinutes) * 100}%` }}
                />
                <div 
                  className="bg-[#f43f5e]" 
                  style={{ width: `${(dailyUsage.distractingTimeMinutes / dailyUsage.totalScreenTimeMinutes) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs mt-1 text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#4ade80] mr-1"></div>
                <span>Productive</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#94a3b8] mr-1"></div>
                <span>Neutral</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#f43f5e] mr-1"></div>
                <span>Distracting</span>
              </div>
            </div>
          </div>

          <div className="border-t border-ironWill-gray p-4">
            <h4 className="font-bold mb-2 text-sm">App Breakdown</h4>
            <div className="space-y-3 max-h-64 overflow-auto">
              {dailyUsage.apps.sort((a, b) => b.timeSpentMinutes - a.timeSpentMinutes).map((app, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge variant="outline" className={`mr-2 ${
                      app.category === 'distracting' ? 'border-[#f43f5e] text-[#f43f5e]' : 
                      app.category === 'productive' ? 'border-[#4ade80] text-[#4ade80]' : 
                      'border-[#94a3b8] text-[#94a3b8]'
                    }`}>
                      {app.category === 'distracting' ? '!' : 
                       app.category === 'productive' ? '✓' : 
                       '○'}
                    </Badge>
                    <span>{app.appName}</span>
                  </div>
                  <span className="font-mono">{formatTime(app.timeSpentMinutes)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-ironWill-dark border-ironWill-gray">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">Weekly Overview</CardTitle>
            <Badge className={isOverGoal ? "bg-ironWill-red" : "bg-[#4ade80]"}>
              {percentageOfGoal}% OF GOAL
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1F2C',
                    border: '1px solid #403E43',
                    borderRadius: '4px'
                  }}
                  formatter={(value: number) => [`${formatTime(value)}`, '']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="distracting" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="neutral" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} />
                <Bar dataKey="productive" stackId="a" fill="#4ade80" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2">
            <p className="text-sm text-gray-400">
              Weekly Limit: <span className="font-bold text-white">{formatTime(weeklyUsage.weeklyGoalMinutes)}</span>
            </p>
            <p className="text-sm text-gray-400">
              Distracting Time: <span className={`font-bold ${isOverGoal ? "text-ironWill-red" : "text-white"}`}>
                {formatTime(totalDistractingMinutes)}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageStats;
