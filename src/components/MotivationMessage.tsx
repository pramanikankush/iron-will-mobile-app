
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getRandomBrutalMessage } from "@/utils/brutalMessages";
import { motion, AnimatePresence } from "framer-motion";

const MotivationMessage = () => {
  const [quote, setQuote] = useState(getRandomBrutalMessage());
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setQuote(getRandomBrutalMessage());
        setIsChanging(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-ironWill-gray border-none overflow-hidden">
      <CardContent className="p-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={quote.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="font-bold text-lg mb-2 text-white iron-text-shadow">
              {quote.text}
            </p>
            <motion.div
              className="w-16 h-1 bg-ironWill-red mx-auto mt-4"
              initial={{ width: "0%" }}
              animate={{ width: "2rem" }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default MotivationMessage;
