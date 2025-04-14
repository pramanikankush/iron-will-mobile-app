
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Bell, BellOff, Clock, Award, AlertTriangle, ShieldAlert } from "lucide-react";
import { NotificationSetting } from "@/types";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/sonner";

interface NotificationSettingsProps {
  settings: NotificationSetting[];
}

const NotificationSettings = ({ settings }: NotificationSettingsProps) => {
  const [notificationSettings, setNotificationSettings] = useState(settings);

  const handleToggle = (id: string) => {
    setNotificationSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
    
    // Show toast when toggling notifications
    toast.success("Notification setting updated", {
      description: "Changes saved successfully",
      duration: 2000,
    });
  };

  const handleThresholdChange = (id: string, value: number[]) => {
    setNotificationSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === id ? { ...setting, threshold: value[0] } : setting
      )
    );
  };

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        toast.success("Notifications enabled. Expect brutal accountability.", {
          duration: 3000,
        });
      } else {
        toast.error("You denied notifications. Stay weak if you want.", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
      toast.error("Failed to request permission. Your browser might not support notifications.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-ironWill-dark border-ironWill-gray overflow-hidden mb-4">
        <CardHeader className="px-6 py-4 bg-gradient-to-r from-ironWill-gray to-ironWill-dark border-b border-ironWill-gray">
          <CardTitle className="text-lg font-bold flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2 text-ironWill-red" /> Permission Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={requestPermission}
            className="w-full py-3 bg-ironWill-gray hover:bg-ironWill-gray/80 text-white font-medium rounded flex items-center justify-center gap-2 transition-colors duration-300"
          >
            <Bell className="h-5 w-5 text-ironWill-red" />
            Check/Request Notification Permission
          </motion.button>
        </CardContent>
      </Card>

      <Card className="bg-ironWill-dark border-ironWill-gray overflow-hidden">
        <CardHeader className="px-6 py-4 bg-gradient-to-r from-ironWill-gray to-ironWill-dark border-b border-ironWill-gray">
          <CardTitle className="text-lg font-bold flex items-center">
            <Bell className="h-5 w-5 mr-2 text-ironWill-red" /> Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {notificationSettings.map((setting, index) => (
            <motion.div 
              key={setting.id} 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {setting.type === 'excess' && <AlertTriangle className="h-5 w-5 mr-2 text-ironWill-red" />}
                  {setting.type === 'reminder' && <Clock className="h-5 w-5 mr-2 text-blue-400" />}
                  {setting.type === 'achievement' && <Award className="h-5 w-5 mr-2 text-yellow-400" />}
                  <span className="font-medium">
                    {setting.type === 'excess' && 'Excess Usage Alert'}
                    {setting.type === 'reminder' && 'Daily Reminder'}
                    {setting.type === 'achievement' && 'Achievement'}
                  </span>
                </div>
                <Switch 
                  checked={setting.enabled} 
                  onCheckedChange={() => handleToggle(setting.id)}
                  className="data-[state=checked]:bg-ironWill-red"
                />
              </div>
              
              {setting.type === 'excess' && setting.enabled && setting.threshold !== undefined && (
                <motion.div 
                  className="space-y-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center text-sm">
                    <span>Threshold: {setting.threshold} minutes</span>
                  </div>
                  <Slider
                    value={[setting.threshold]}
                    min={15}
                    max={120}
                    step={15}
                    onValueChange={(value) => handleThresholdChange(setting.id, value)}
                    className="w-full"
                  />
                </motion.div>
              )}
              
              <div className="bg-ironWill-gray p-4 rounded text-sm">
                <p className="text-gray-100">{setting.message}</p>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            className="pt-4 border-t border-ironWill-gray text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <p className="text-sm text-gray-400">
              Notifications will be delivered to your lock screen and home screen 
              when triggered.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NotificationSettings;
