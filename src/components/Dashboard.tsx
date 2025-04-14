
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Settings, BarChart3 } from "lucide-react";
import UsageStats from "./UsageStats";
import MotivationMessage from "./MotivationMessage";
import NotificationSettings from "./NotificationSettings";
import { mockDailyUsage, mockWeeklyData, mockNotificationSettings } from "@/utils/mockData";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("stats");

  return (
    <div className="iron-will-container pb-16">
      {/* Header */}
      <header className="p-4 pb-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold">IRON WILL</h1>
          <Badge 
            variant="outline" 
            className="border-ironWill-red text-ironWill-red animate-pulse-red"
          >
            TRACKING ACTIVE
          </Badge>
        </div>
      </header>

      {/* Motivation Card */}
      <div className="p-4">
        <MotivationMessage />
      </div>

      {/* Main Content */}
      <main className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-ironWill-dark border border-ironWill-gray rounded-md">
            <TabsTrigger 
              value="stats" 
              className="flex flex-col items-center gap-1 text-xs py-1 data-[state=active]:bg-ironWill-gray"
            >
              <BarChart3 className="h-5 w-5" />
              STATS
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="flex flex-col items-center gap-1 text-xs py-1 data-[state=active]:bg-ironWill-gray"
            >
              <Activity className="h-5 w-5" />
              ACTIVITY
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex flex-col items-center gap-1 text-xs py-1 data-[state=active]:bg-ironWill-gray"
            >
              <Settings className="h-5 w-5" />
              SETTINGS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
            <UsageStats dailyUsage={mockDailyUsage} weeklyUsage={mockWeeklyData} />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
            <Card className="bg-ironWill-dark border-ironWill-gray">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-ironWill-gray flex items-center justify-center">
                    <span className="text-4xl font-bold">3</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">DAY STREAK</h3>
                    <p className="text-sm text-gray-400">Stay under your limits for a longer streak</p>
                  </div>
                  <div className="w-full bg-ironWill-gray h-3 rounded-full">
                    <div className="bg-ironWill-red h-full rounded-full w-3/5"></div>
                  </div>
                  <p className="text-sm font-medium">2 more days to beat your record</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
            <NotificationSettings settings={mockNotificationSettings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
