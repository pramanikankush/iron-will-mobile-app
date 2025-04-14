
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Shield, User } from "lucide-react";

const AuthForm = ({ onAuthenticated }: { onAuthenticated: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // In a real app, this would be an actual authentication call
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // In a real app, this would be an actual registration call
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1500);
  };

  return (
    <div className="w-full px-4 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md bg-ironWill-dark border-ironWill-gray">
        <CardHeader className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="bg-ironWill-red p-3 rounded inline-flex">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-extrabold tracking-tight">IRON WILL</CardTitle>
            <CardDescription className="text-sm mt-2">
              Digital discipline for the modern man.
            </CardDescription>
          </div>
        </CardHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-ironWill-gray">
            <TabsTrigger value="login" className="text-sm font-medium">
              LOGIN
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-sm font-medium">
              SIGNUP
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-ironWill-gray border-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-ironWill-gray border-none"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-ironWill-red hover:bg-ironWill-red/90" 
                  disabled={isLoading}
                >
                  {isLoading ? "AUTHORIZING..." : "LOGIN"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-ironWill-gray border-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-ironWill-gray border-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-ironWill-gray border-none"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-ironWill-red hover:bg-ironWill-red/90" 
                  disabled={isLoading}
                >
                  {isLoading ? "CREATING ACCOUNT..." : "SIGN UP"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
