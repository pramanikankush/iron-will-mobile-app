
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Settings, BarChart3, ShieldAlert } from "lucide-react";
import UsageStats from "./UsageStats";
import MotivationMessage from "./MotivationMessage";
import NotificationSettings from "./NotificationSettings";
import { mockDailyUsage, mockWeeklyData, mockNotificationSettings } from "@/utils/mockData";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("stats");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="iron-will-container pb-16"
    >
      {/* Header */}
      <motion.header 
        variants={itemVariants} 
        className="p-4 pb-0"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            <span className="text-ironWill-red">IRON</span> WILL
          </h1>
          <Badge 
            variant="outline" 
            className="border-ironWill-red text-ironWill-red animate-pulse-red"
          >
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-ironWill-red rounded-full"></span>
              TRACKING ACTIVE
            </div>
          </Badge>
        </div>
      </motion.header>

      {/* Motivation Card */}
      <motion.div 
        variants={itemVariants}
        className="p-4"
      >
        <MotivationMessage />
      </motion.div>

      {/* Main Content */}
      <motion.main 
        variants={itemVariants}
        className="p-4"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-ironWill-dark border border-ironWill-gray rounded-md">
            <TabsTrigger 
              value="stats" 
              className="flex flex-col items-center gap-1 text-xs py-1 transition-all duration-300 data-[state=active]:bg-ironWill-gray data-[state=active]:text-ironWill-red"
            >
              <BarChart3 className="h-5 w-5" />
              STATS
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="flex flex-col items-center gap-1 text-xs py-1 transition-all duration-300 data-[state=active]:bg-ironWill-gray data-[state=active]:text-ironWill-red"
            >
              <Activity className="h-5 w-5" />
              ACTIVITY
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex flex-col items-center gap-1 text-xs py-1 transition-all duration-300 data-[state=active]:bg-ironWill-gray data-[state=active]:text-ironWill-red"
            >
              <Settings className="h-5 w-5" />
              SETTINGS
            </TabsTrigger>
          </TabsList>

          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="stats" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
              <UsageStats dailyUsage={mockDailyUsage} weeklyUsage={mockWeeklyData} />
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
              <Card className="bg-ironWill-dark border-ironWill-gray overflow-hidden">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-24 h-24 rounded-full bg-ironWill-gray flex items-center justify-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                    >
                      <span className="text-4xl font-bold text-ironWill-red">3</span>
                    </motion.div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg">DAY STREAK</h3>
                      <p className="text-sm text-gray-400">Stay under your limits for a longer streak</p>
                    </div>
                    <div className="w-full bg-ironWill-gray h-3 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-ironWill-red h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      ></motion.div>
                    </div>
                    <p className="text-sm font-medium">2 more days to beat your record</p>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
              <NotificationSettings settings={mockNotificationSettings} />
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.main>
    </motion.div>
  );
};

export default Dashboard;
