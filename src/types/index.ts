
export interface User {
  id: string;
  username: string;
  email: string;
  streak: number;
  joinedAt: Date;
  lastActive: Date;
}

export interface AppUsage {
  appName: string;
  timeSpentMinutes: number;
  category: 'productive' | 'neutral' | 'distracting';
  icon: string;
}

export interface DailyUsage {
  date: string;
  totalScreenTimeMinutes: number;
  productiveTimeMinutes: number;
  distractingTimeMinutes: number;
  neutralTimeMinutes: number;
  apps: AppUsage[];
}

export interface WeeklyUsage {
  startDate: string;
  endDate: string;
  days: DailyUsage[];
  weeklyGoalMinutes: number;
}

export interface MotivationalQuote {
  id: number;
  text: string;
  author?: string; 
  category: 'discipline' | 'focus' | 'strength' | 'stoicism' | 'mindset';
}

export interface NotificationSetting {
  id: string;
  type: 'excess' | 'reminder' | 'achievement';
  enabled: boolean;
  threshold?: number; // minutes
  message?: string;
}
