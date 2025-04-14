
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Bell, BellOff, Clock, Award, AlertTriangle } from "lucide-react";
import { NotificationSetting } from "@/types";

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
  };

  const handleThresholdChange = (id: string, value: number[]) => {
    setNotificationSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === id ? { ...setting, threshold: value[0] } : setting
      )
    );
  };

  return (
    <Card className="bg-ironWill-dark border-ironWill-gray">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center">
          <Bell className="h-5 w-5 mr-2" /> Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {notificationSettings.map(setting => (
          <div key={setting.id} className="space-y-3">
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
              />
            </div>
            
            {setting.type === 'excess' && setting.enabled && setting.threshold !== undefined && (
              <div className="space-y-2">
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
              </div>
            )}
            
            <div className="bg-ironWill-gray p-3 rounded text-sm">
              <p>{setting.message}</p>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-ironWill-gray text-center">
          <p className="text-sm text-gray-400">
            Notifications will be delivered to your lock screen and home screen 
            when triggered.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
