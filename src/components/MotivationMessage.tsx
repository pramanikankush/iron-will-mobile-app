
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getRandomMotivationalQuote } from "@/utils/mockData";

const MotivationMessage = () => {
  const [quote, setQuote] = useState(getRandomMotivationalQuote());
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setQuote(getRandomMotivationalQuote());
        setFade(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`bg-ironWill-gray border-none transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <CardContent className="p-6 text-center">
        <p className="font-bold text-lg mb-2 text-white iron-text-shadow">{quote.text}</p>
        {quote.author && (
          <p className="text-xs text-gray-400">- {quote.author}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MotivationMessage;
