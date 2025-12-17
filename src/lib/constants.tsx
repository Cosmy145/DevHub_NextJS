export interface Event {
  title: string;
  image: string;
  slug: string;
  date: string; // e.g., "2025-11-07"
  time: string; // e.g., "09:00 AM"
  location: string;
  description: string;
}

export const EVENTS: Event[] = [
  {
    title: "GitHub Universe 2025",
    image: "/images/event1.png",
    slug: "github-universe-2025",
    date: "2025-10-15",
    time: "09:00 AM",
    location: "San Francisco, CA",
    description:
      "Join us for the biggest GitHub event of the year with keynotes, workshops, and networking opportunities.",
  },
  {
    title: "DevWorld 2025",
    image: "/images/event2.png",
    slug: "devworld-2025",
    date: "2025-11-20",
    time: "10:00 AM",
    location: "Austin, TX",
    description:
      "A premier conference for developers featuring the latest in web technologies, AI, and cloud computing.",
  },
  {
    title: "CloudNary User Summit",
    image: "/images/event3.png",
    slug: "cloudnary-user-summit",
    date: "2025-09-10",
    time: "08:30 AM",
    location: "Seattle, WA",
    description:
      "Connect with cloud experts and learn about the latest innovations in cloud infrastructure and DevOps.",
  },
  {
    title: "React Conference 2025",
    image: "/images/event4.png",
    slug: "react-conference-2025",
    date: "2025-12-05",
    time: "09:00 AM",
    location: "New York, NY",
    description:
      "The ultimate gathering for React developers to explore new features, best practices, and community projects.",
  },
  {
    title: "AI & ML Summit",
    image: "/images/event5.png",
    slug: "ai-ml-summit-2025",
    date: "2025-10-28",
    time: "09:30 AM",
    location: "Boston, MA",
    description:
      "Dive deep into artificial intelligence and machine learning with industry leaders and practitioners.",
  },
  {
    title: "Startup Hackathon 2025",
    image: "/images/event6.png",
    slug: "startup-hackathon-2025",
    date: "2025-11-12",
    time: "06:00 PM",
    location: "Los Angeles, CA",
    description:
      "48-hour hackathon bringing together developers, designers, and entrepreneurs to build innovative solutions.",
  },
];
