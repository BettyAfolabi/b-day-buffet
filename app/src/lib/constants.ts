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
    question: "Choose your Geek level",
    options: [
      { label: "Casual Passion - I just love this topic", value: "light", next: "format" },
      { label: "Deep Dive - I have arguments and examples.", value: "deep", next: "format" },
      { label: "Unhinged Expert Mode - I have sources.", value: "extreme", next: "format" }
    ]
  },

  format: {
    id: "format",
    question: "Where shall this unfold?",
    options: [
      { label: "Virtual (Global Digital Portal)", value: "virtual", next: "topic" },
      { label: "In Person", value: "physical", next: "location" },
      { label: "Walk & Talk", value: "walk", next: "location" }
    ]
  },

  location: {
    id: "location",
    question: "Are you on or near the Island? (Lekki / Ikoyi / Ajah)",
    options: [
      { label: "Yes, Island Zone", value: "island", next: "fine_print" },
      { label: "No, I'm elsewhere", value: "outside", next: "virtual_redirect" },
    ]
  },

  fine_print: {
    id: "fine_print",
    question: "", // handled by modal instead
  },

  virtual_redirect: {
    id: "virtual_redirect",
    question: "", // handled automatically
  },

  topic: {
    id: "topic",
    question: "What topic would you happily rant about for an hour with zero preparation?",
    type: "textarea",
    next: "name"
  },

  name: {
    id: "name",
    question: "Your name teach?",
    type: "input",
    next: "contact"
  },

  contact: {
    id: "contact",
    question: "Kindly enter your WhatsApp contact.",
    type: "input",
    next: "askMe"
  },

  askMe: {
    id: "askMe",
    question: "Anything you’d like to ask me before we meet?",
    type: "input",
    next: "complete"
  },

  complete: {
    id: "complete",
    question: "You're in. I'll be in touch shortly.",
  }
} as const;

export const SLOTS = {
  virtual: [
    { id: "v1", label: "Mon, March 30 @ 2:00 PM" },
    { id: "v4", label: "Thu, April 2 @ 8:00 PM"  },
    { id: "v5", label: "Mon, April 6 @ 2:00 PM"  },
  ],
  physical: [
    { id: "p1", label: "Sat, April 4 @ 1:00 PM" },
    { id: "p2", label: "Fri, April 10 @ 2:00 PM" },
    { id: "p3", label: "Sat, April 11 @ 1:00 PM" },
    { id: "p4", label: "Fri, April 17 @ 2:00 PM" },
  ]
};