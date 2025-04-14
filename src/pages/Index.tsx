
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-ironWill-dark">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <AuthForm onAuthenticated={handleAuthentication} />
      )}
    </div>
  );
};

export default Index;
