
// Brutal motivational messages for the Iron Will app

export interface BrutalMessage {
  text: string;
  category: 'discipline' | 'focus' | 'strength' | 'stoicism' | 'mindset';
}

export const brutalMessages: BrutalMessage[] = [
  {
    text: "Stop being weak. Your ancestors built civilizations while you scroll mindlessly.",
    category: 'discipline'
  },
  {
    text: "Your potential is dying every second you waste on that screen.",
    category: 'focus'
  },
  {
    text: "Pathetic. Another day another excuse. Get up and fight for yourself.",
    category: 'strength'
  },
  {
    text: "Comfort is a slow death. Embrace the pain of discipline or accept the pain of regret.",
    category: 'stoicism'
  },
  {
    text: "While you scroll, your competition is getting stronger. Your choice.",
    category: 'mindset'
  },
  {
    text: "This digital poison is making you soft, weak, and controllable.",
    category: 'discipline'
  },
  {
    text: "Men who built this world didn't have time for endless distractions. Neither do you.",
    category: 'focus'
  },
  {
    text: "Your phone is the weapon they use to keep you docile and weak.",
    category: 'strength'
  },
  {
    text: "Each notification is a leash yanking your attention away from greatness.",
    category: 'stoicism'
  },
  {
    text: "You're not tired. You're comfortable. Break free from the digital chains.",
    category: 'mindset'
  },
  {
    text: "Your phone doesn't make you happy. It makes you numb. Wake up.",
    category: 'discipline'
  },
  {
    text: "A hard truth: nobody cares about your social media. They care about your strength.",
    category: 'focus'
  },
];

export const getRandomBrutalMessage = (): BrutalMessage => {
  return brutalMessages[Math.floor(Math.random() * brutalMessages.length)];
};
