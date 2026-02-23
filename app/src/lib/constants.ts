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


export const QUESTION_FLOW = {
  geekLevel: {
    id: "geekLevel",
    question: "Select Your Depth",
    options: [
      { label: "Casual Curiosity", value: "light", next: "format" },
      { label: "Deep Dive", value: "deep", next: "format" },
      { label: "Intellectual Combat", value: "extreme", next: "format" }
    ]
  },

  format: {
    id: "format",
    question: "Where shall this unfold?",
    options: [
      { label: "Virtual", value: "virtual", next: "topic" },
      { label: "In Person", value: "physical", next: "location" },
      { label: "Walk & Talk", value: "walk", next: "location" }
    ]
  },

  location: {
    id: "location",
    question: "Are you in Lagos?",
    options: [
      { label: "Yes", value: "yes", next: "specific" },
      { label: "No", value: "no", next: "go_back" },
    ]
  },

  specific: {
    id: "specific",
    question: "If we’re meeting at a spot with a 'Minimum Spend,' consider the bill your Patronage of the Arts. You bring the obsession; you bring the wallet. Deal?",
    options: [
      { label: "Yes", value: "yes", next: "topic" },
      { label: "No", value: "no", next: "go_back" },
    ]
  },

  topic: {
    id: "topic",
    question: "What idea has been living in your head lately?",
    type: "textarea",
    next: "format"
  },

  name: {
    id: "name",
    question: "What should I call you? And please let me have your whatsapp line",
    type: "input",
    next: "complete"
  } 
};