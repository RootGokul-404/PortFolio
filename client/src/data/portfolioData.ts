export interface Profile {
  displayName: string;
  handle: string;
  role: string;
  intro: string;
  about: string;
  location: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  resumeUrl?: string;
  avatarUrl?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  sortOrder: number;
}

export interface Skill {
  id: number;
  name: string;
  category: "Languages" | "Web & APIs" | "Systems" | "Tools" | string;
  proficiency: number;
  sortOrder: number;
}

export interface ProfileDetail {
  id: number;
  section: "identity" | "journey" | "focus" | "future" | "quote" | string;
  label: string;
  content: string;
  sortOrder: number;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  url?: string;
  publishedAt?: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "archived";
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  articles: Article[];
  details: ProfileDetail[];
  submissions?: ContactSubmission[];
}

export const initialPortfolioData: PortfolioData = {
  profile: {
    displayName: "Gokulakannan",
    handle: "RootGokul-404",
    role: "Java Full Stack Developer · Systems Builder",
    intro: "Transforming ideas into scalable systems through backend engineering, clean code, and practical product thinking.",
    about: "Electrical and Electronics Engineering graduate transitioning into software engineering. I build scalable applications and modern backend architectures with Java, Spring Boot, REST APIs, MySQL, and a disciplined systems mindset.",
    location: "India",
    email: "gokulakannan7972@gmail.com",
    githubUrl: "https://github.com/RootGokul-404",
    linkedinUrl: "https://www.linkedin.com/in/gokula-kannan-dev",
    instagramUrl: "https://instagram.com/ivan_gokula_kannan",
    resumeUrl: "#contact",
    avatarUrl: "/profile-rootgokul.png",
  },
  projects: [
    {
      id: 1,
      slug: "iot-integrated-farming",
      title: "IoT Integrated Farming",
      summary: "A connected farming system designed to bring sensor-informed decisions into agricultural operations with automated irrigation and soil moisture monitoring.",
      category: "IoT Systems",
      techStack: ["ESP32", "Embedded C", "Sensors", "IoT"],
      liveUrl: "",
      repoUrl: "https://github.com/RootGokul-404",
      featured: true,
      sortOrder: 1,
    },
    {
      id: 2,
      slug: "automated-parking",
      title: "AI-Based Automated Parking",
      summary: "An automation-focused parking system concept exploring intelligent vehicle flow, sensor detection, and optimized space allocation.",
      category: "Automation",
      techStack: ["Java", "Automation", "System Design", "SQL"],
      liveUrl: "",
      repoUrl: "https://github.com/RootGokul-404",
      featured: true,
      sortOrder: 2,
    },
    {
      id: 3,
      slug: "taxi-booking-java",
      title: "Taxi Booking System",
      summary: "A Java-based booking application structured around core ride-request, driver assignment, and scheduling workflows.",
      category: "Application Development",
      techStack: ["Java", "OOP", "SQL", "Data Structures"],
      liveUrl: "",
      repoUrl: "https://github.com/RootGokul-404",
      featured: true,
      sortOrder: 3,
    },
    {
      id: 4,
      slug: "esp32-home-automation",
      title: "ESP32 Alarm Automation",
      summary: "An ESP32 and Blynk IoT mini project for lightweight alarm automation, motion sensing, buzzer triggers, and remote telemetry alerts.",
      category: "Embedded Systems",
      techStack: ["ESP32", "Blynk IoT", "Embedded C", "Hardware Interfacing"],
      liveUrl: "",
      repoUrl: "https://github.com/RootGokul-404",
      featured: false,
      sortOrder: 4,
    },
    {
      id: 5,
      slug: "java-atm-banking-system",
      title: "Java ATM & Banking Simulation",
      summary: "A modular Java banking simulation mini project featuring secure user authentication, PIN validation, deposit/withdrawal transactions, account balance auditing, and transaction logging.",
      category: "Application Development",
      techStack: ["Java", "OOP Principles", "Exception Handling", "File I/O"],
      liveUrl: "",
      repoUrl: "https://github.com/RootGokul-404",
      featured: false,
      sortOrder: 5,
    },
    {
      id: 6,
      slug: "iot-environmental-monitor",
      title: "IoT Environmental Monitoring Node",
      summary: "A hardware-software telemetry mini project monitoring temperature, humidity, and ambient metrics via sensors connected to microcontrollers with automated threshold logging.",
      category: "IoT Systems",
      techStack: ["ESP32", "Embedded C", "DHT11 Sensor", "IoT Protocols"],
      liveUrl: "",
      repoUrl: "https://github.com/RootGokul-404",
      featured: false,
      sortOrder: 6,
    },
  ],
  skills: [
    { id: 1, name: "Java", category: "Languages", proficiency: 90, sortOrder: 1 },
    { id: 2, name: "SQL", category: "Languages", proficiency: 80, sortOrder: 2 },
    { id: 3, name: "JavaScript", category: "Languages", proficiency: 75, sortOrder: 3 },
    { id: 4, name: "C", category: "Languages", proficiency: 72, sortOrder: 4 },
    { id: 5, name: "Python", category: "Languages", proficiency: 68, sortOrder: 5 },

    { id: 6, name: "Spring Boot", category: "Web & APIs", proficiency: 84, sortOrder: 1 },
    { id: 7, name: "REST APIs", category: "Web & APIs", proficiency: 82, sortOrder: 2 },
    { id: 8, name: "HTML & CSS", category: "Web & APIs", proficiency: 82, sortOrder: 3 },
    { id: 9, name: "MySQL", category: "Web & APIs", proficiency: 80, sortOrder: 4 },
    { id: 10, name: "Bootstrap", category: "Web & APIs", proficiency: 72, sortOrder: 5 },
    { id: 11, name: "Firebase", category: "Web & APIs", proficiency: 70, sortOrder: 6 },

    { id: 12, name: "ESP32", category: "Systems", proficiency: 88, sortOrder: 1 },
    { id: 13, name: "Embedded C", category: "Systems", proficiency: 84, sortOrder: 2 },
    { id: 14, name: "ARM Cortex", category: "Systems", proficiency: 74, sortOrder: 3 },
    { id: 15, name: "STM32", category: "Systems", proficiency: 72, sortOrder: 4 },

    { id: 16, name: "Git & GitHub", category: "Tools", proficiency: 80, sortOrder: 1 },
    { id: 17, name: "Postman", category: "Tools", proficiency: 76, sortOrder: 2 },
    { id: 18, name: "Linux", category: "Tools", proficiency: 72, sortOrder: 3 },
  ],
  details: [
    { id: 1, section: "identity", label: "Role", content: "Java Full Stack Developer", sortOrder: 1 },
    { id: 2, section: "identity", label: "Background", content: "Electrical & Electronics Engineering (EEE)", sortOrder: 2 },
    { id: 3, section: "identity", label: "Current Mission", content: "Building scalable applications and modern backend architectures", sortOrder: 3 },
    { id: 4, section: "identity", label: "Focus Stack", content: "Spring Boot · REST APIs · DSA · AI-Driven Development", sortOrder: 4 },
    { id: 5, section: "identity", label: "Philosophy", content: "Learn · Build · Evolve", sortOrder: 5 },

    { id: 6, section: "journey", label: "01 / Hardware", content: "Electrical circuits and systems", sortOrder: 1 },
    { id: 7, section: "journey", label: "02 / Logic", content: "Problem solving and data structures", sortOrder: 2 },
    { id: 8, section: "journey", label: "03 / Backend", content: "Java and Spring Boot", sortOrder: 3 },
    { id: 9, section: "journey", label: "04 / Full Stack", content: "Modern web applications", sortOrder: 4 },

    { id: 10, section: "focus", label: "Spring Boot", content: "Building reliable Java application services", sortOrder: 1 },
    { id: 11, section: "focus", label: "REST APIs", content: "Designing clean service boundaries", sortOrder: 2 },
    { id: 12, section: "focus", label: "Backend Architecture", content: "Growing production-ready system design skills", sortOrder: 3 },
    { id: 13, section: "focus", label: "Data Structures & Algorithms", content: "Strengthening problem solving fundamentals", sortOrder: 4 },
    { id: 14, section: "focus", label: "Firebase Integration", content: "Exploring practical cloud-connected features", sortOrder: 5 },
    { id: 15, section: "focus", label: "AI Assisted Development", content: "Using AI thoughtfully in the engineering workflow", sortOrder: 6 },

    { id: 16, section: "future", label: "Master Backend Engineering", content: "", sortOrder: 1 },
    { id: 17, section: "future", label: "Build Production-Level Systems", content: "", sortOrder: 2 },
    { id: 18, section: "future", label: "Explore AI Integrated Development", content: "", sortOrder: 3 },
    { id: 19, section: "future", label: "Improve System Design Skills", content: "", sortOrder: 4 },
    { id: 20, section: "future", label: "Create Scalable Architectures", content: "", sortOrder: 5 },

    { id: 21, section: "quote", label: "Mindset", content: "Technology evolves continuously. The best engineers adapt, learn fast, and build impactful solutions.", sortOrder: 1 },
    { id: 22, section: "quote", label: "System Message", content: "EEE gave the logic. Software engineering gave the platform. Now building the future through code.", sortOrder: 2 },
  ],
  articles: [
    {
      id: 1,
      slug: "designing-for-real-world-constraints",
      title: "Designing for real-world constraints",
      excerpt: "A practical approach to translating requirements, constraints, and system boundaries into smaller implementation decisions.",
      tags: ["System Design", "Engineering"],
      readTime: "4 min read",
      publishedAt: "2026-02-14",
    },
    {
      id: 2,
      slug: "building-the-api-boundary",
      title: "Building the API boundary before the interface",
      excerpt: "Why deliberate contracts, stable inputs, and useful failure states make full-stack projects easier to evolve.",
      tags: ["REST APIs", "Backend"],
      readTime: "5 min read",
      publishedAt: "2026-03-02",
    },
    {
      id: 3,
      slug: "embedded-systems-clarity",
      title: "What embedded systems teach you about clarity",
      excerpt: "Lessons from working close to hardware: limits force better defaults, sharper observability, and more intentional software.",
      tags: ["Embedded C", "Systems"],
      readTime: "3 min read",
      publishedAt: "2026-03-18",
    },
  ],
  submissions: [
    {
      id: 1,
      name: "Engineering Recruiter",
      email: "recruiter@techsystems.com",
      company: "Tech Systems",
      message: "Impressive portfolio and background transitioning from EEE to Java Full Stack!",
      createdAt: new Date().toISOString(),
      status: "new",
    },
  ],
};

const STORAGE_KEY = "portfolio_data_v2";

export function getLocalPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.profile) {
        parsed.profile.linkedinUrl = "https://www.linkedin.com/in/gokula-kannan-dev";
        parsed.profile.avatarUrl = "/profile-rootgokul.png";
      }
      return parsed;
    }
  } catch (err) {
    console.warn("Could not read local portfolio data:", err);
  }
  return initialPortfolioData;
}

export function saveLocalPortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("Could not save local portfolio data:", err);
  }
}

export function saveContactSubmission(submission: Omit<ContactSubmission, "id" | "createdAt" | "status">): ContactSubmission {
  const current = getLocalPortfolioData();
  const newSubmission: ContactSubmission = {
    ...submission,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  current.submissions = [newSubmission, ...(current.submissions || [])];
  saveLocalPortfolioData(current);
  return newSubmission;
}
