
import { User, AppUsage, DailyUsage, WeeklyUsage, MotivationalQuote, NotificationSetting } from "@/types";

export const mockUser: User = {
  id: "u1",
  username: "iron_user",
  email: "user@example.com",
  streak: 3,
  joinedAt: new Date(2023, 3, 15),
  lastActive: new Date(),
};

export const mockAppUsage: AppUsage[] = [
  { 
    appName: "Instagram", 
    timeSpentMinutes: 78, 
    category: "distracting",
    icon: "instagram" 
  },
  { 
    appName: "TikTok", 
    timeSpentMinutes: 103, 
    category: "distracting",
    icon: "video" 
  },
  { 
    appName: "YouTube", 
    timeSpentMinutes: 45, 
    category: "distracting",
    icon: "youtube" 
  },
  { 
    appName: "Fitness App", 
    timeSpentMinutes: 15, 
    category: "productive",
    icon: "dumbbell" 
  },
  { 
    appName: "Reading App", 
    timeSpentMinutes: 22, 
    category: "productive",
    icon: "book-open" 
  },
  { 
    appName: "Other", 
    timeSpentMinutes: 35, 
    category: "neutral",
    icon: "more-horizontal" 
  },
];

export const mockDailyUsage: DailyUsage = {
  date: "2023-04-13",
  totalScreenTimeMinutes: 298,
  productiveTimeMinutes: 37,
  distractingTimeMinutes: 226,
  neutralTimeMinutes: 35,
  apps: mockAppUsage,
};

export const mockWeeklyData: WeeklyUsage = {
  startDate: "2023-04-07",
  endDate: "2023-04-13",
  weeklyGoalMinutes: 120, // max distracting minutes per week
  days: [
    {
      date: "2023-04-07",
      totalScreenTimeMinutes: 275,
      productiveTimeMinutes: 45,
      distractingTimeMinutes: 198,
      neutralTimeMinutes: 32,
      apps: mockAppUsage.map(app => ({...app, timeSpentMinutes: app.timeSpentMinutes * 0.9})),
    },
    {
      date: "2023-04-08",
      totalScreenTimeMinutes: 310,
      productiveTimeMinutes: 30,
      distractingTimeMinutes: 240,
      neutralTimeMinutes: 40,
      apps: mockAppUsage.map(app => ({...app, timeSpentMinutes: app.timeSpentMinutes * 1.1})),
    },
    {
      date: "2023-04-09",
      totalScreenTimeMinutes: 290,
      productiveTimeMinutes: 50,
      distractingTimeMinutes: 210,
      neutralTimeMinutes: 30,
      apps: mockAppUsage.map(app => ({...app, timeSpentMinutes: app.timeSpentMinutes * 1.0})),
    },
    {
      date: "2023-04-10",
      totalScreenTimeMinutes: 260,
      productiveTimeMinutes: 60,
      distractingTimeMinutes: 170,
      neutralTimeMinutes: 30,
      apps: mockAppUsage.map(app => ({...app, timeSpentMinutes: app.timeSpentMinutes * 0.85})),
    },
    {
      date: "2023-04-11",
      totalScreenTimeMinutes: 280,
      productiveTimeMinutes: 35,
      distractingTimeMinutes: 215,
      neutralTimeMinutes: 30,
      apps: mockAppUsage.map(app => ({...app, timeSpentMinutes: app.timeSpentMinutes * 0.95})),
    },
    {
      date: "2023-04-12",
      totalScreenTimeMinutes: 305,
      productiveTimeMinutes: 25,
      distractingTimeMinutes: 245,
      neutralTimeMinutes: 35,
      apps: mockAppUsage.map(app => ({...app, timeSpentMinutes: app.timeSpentMinutes * 1.05})),
    },
    mockDailyUsage,
  ],
};

export const mockMotivationalQuotes: MotivationalQuote[] = [
  {
    id: 1,
    text: "Your phone is your prison. Break free or stay weak.",
    category: "discipline"
  },
  {
    id: 2,
    text: "Every time you check social media, someone else is getting stronger than you.",
    category: "focus"
  },
  {
    id: 3,
    text: "Your ancestors fought wars. You can't even fight the urge to scroll.",
    category: "strength"
  },
  {
    id: 4,
    text: "Pain is temporary. The regret of wasted potential is forever.",
    category: "mindset"
  },
  {
    id: 5,
    text: "Are you building your legacy or just killing time?",
    category: "stoicism"
  },
  {
    id: 6,
    text: "Comfort is the poison that kills greatness.",
    category: "discipline"
  },
  {
    id: 7,
    text: "Those who don't discipline themselves get disciplined by life.",
    category: "discipline"
  },
  {
    id: 8,
    text: "Men are forged through adversity, not through endless scrolling.",
    category: "strength"
  },
  {
    id: 9,
    text: "Is this what you want to be remembered for? Another hour wasted online?",
    category: "mindset"
  },
  {
    id: 10,
    text: "The obstacle is the way. Your addiction is the battle you need to win.",
    category: "stoicism"
  },
];

export const mockNotificationSettings: NotificationSetting[] = [
  {
    id: "n1",
    type: "excess",
    enabled: true,
    threshold: 60, // minutes
    message: "1 hour wasted on useless content. Is this the man you want to be?"
  },
  {
    id: "n2",
    type: "reminder",
    enabled: true,
    message: "Stop scrolling. Start building."
  },
  {
    id: "n3",
    type: "achievement",
    enabled: true,
    message: "One day clean from distractions. Keep going."
  }
];

export const getRandomMotivationalQuote = (category?: string): MotivationalQuote => {
  const quotes = category 
    ? mockMotivationalQuotes.filter(q => q.category === category)
    : mockMotivationalQuotes;
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
