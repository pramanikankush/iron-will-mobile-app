
import { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";
import NotificationPermission from "@/components/NotificationPermission";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    setShowPermissionModal(true);
  };

  return (
    <motion.div 
      className="min-h-screen bg-ironWill-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AuthForm onAuthenticated={handleAuthentication} />
          </motion.div>
        )}

        {showPermissionModal && (
          <NotificationPermission onComplete={() => setShowPermissionModal(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Index;
