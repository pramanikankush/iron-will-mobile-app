
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, ShieldAlert } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

interface NotificationPermissionProps {
  onComplete: () => void;
}

const NotificationPermission = ({ onComplete }: NotificationPermissionProps) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermission = async () => {
    setIsRequesting(true);
    
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        toast.success("Notifications enabled. Prepare for brutal accountability.", {
          duration: 3000,
        });
        onComplete();
      } else {
        toast.error("You denied notifications. Stay weak if you want.", {
          duration: 3000,
        });
        onComplete();
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
      toast.error("Failed to request permission. Your browser might not support notifications.");
      onComplete();
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <Card className="w-11/12 max-w-md border-ironWill-red mx-4">
        <CardContent className="p-6 space-y-6">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="w-20 h-20 rounded-full bg-ironWill-dark border-2 border-ironWill-red flex items-center justify-center mx-auto"
          >
            <ShieldAlert className="w-10 h-10 text-ironWill-red" />
          </motion.div>
          
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold">ENABLE BRUTAL ACCOUNTABILITY</h2>
            
            <p className="text-sm text-gray-400">
              Without notifications, you'll keep failing in silence. 
              Allow IRON WILL to call out your weakness when you need it most.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={requestPermission}
              disabled={isRequesting}
              className="w-full bg-ironWill-red hover:bg-red-700 transition-colors duration-300"
            >
              <Bell className="mr-2 h-5 w-5" />
              {isRequesting ? "REQUESTING..." : "ENABLE NOTIFICATIONS"}
            </Button>
            
            <Button
              variant="ghost"
              onClick={onComplete}
              className="w-full text-gray-400 hover:text-white transition-colors duration-300"
            >
              Stay Weak (Skip)
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NotificationPermission;
