export type GeekLevel = {
  id: string;
  title: string;
  description: string;
  duration: number; 
  price: number;    
};

export const EVENT_CONFIG = {
  projectCode: "The Archive of Things You Care About Too Much.",
  city: "Lagos",
  physicalPolicy:
    "If we’re meeting at a spot with a 'Minimum Spend,' consider the bill your Patronage of the Arts. You bring the obsession; you bring the wallet. Deal?",
  calendlyUrlVirtual: process.env.NEXT_PUBLIC_CALENDLY_VIRTUAL!,
  calendlyUrlPhysical: process.env.NEXT_PUBLIC_CALENDLY_PHYSICAL!,
};

export const GEEK_LEVELS: GeekLevel[] = [
  {
    id: "casual",
    title: "CASUAL PASSION",
    description: "Light obsession. Mild chaos.",
    duration: 45,
    price: 0,
  },
  {
    id: "deep_dive",
    title: "STRUCTURED DEEP DIVE",
    description: "Structured fixation analysis.",
    duration: 60,
    price: 0,
  },
  {
    id: "existential",
    title: "UNHINGED EXPERT MODE",
    description: "Full thesis defense on your obsession.",
    duration: 90,
    price: 0,
  },
];
