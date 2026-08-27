import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  articles,
  contactSubmissions,
  InsertUser,
  profileDetails,
  portfolioProfiles,
  projects,
  skills,
  users,
  User,
  PortfolioProfile,
  Project,
  Skill,
  Article,
  ProfileDetail,
  ContactSubmission,
} from "../../drizzle/schema";
import { ENV } from "../_core/env";

export interface IPortfolioRepository {
  getUserByOpenId(openId: string): Promise<User | undefined>;
  upsertUser(user: InsertUser): Promise<void>;
  getPortfolioContent(): Promise<{
    profile: PortfolioProfile | null;
    projects: Project[];
    skills: Skill[];
    articles: Article[];
    details: ProfileDetail[];
  }>;
  getAdminData(): Promise<{
    profile: PortfolioProfile | null;
    projects: Project[];
    skills: Skill[];
    articles: Article[];
    details: ProfileDetail[];
    submissions: ContactSubmission[];
  }>;
  createSubmission(data: {
    name: string;
    email: string;
    company?: string | null;
    message: string;
  }): Promise<ContactSubmission>;
  updateSubmissionStatus(id: number, status: "new" | "read" | "archived"): Promise<void>;
  updateProfile(profile: Partial<PortfolioProfile>): Promise<void>;
  saveProject(project: Partial<Project> & { slug: string; title: string; summary: string; category: string; techStack: string; featured: boolean; sortOrder: number }): Promise<void>;
  deleteProject(id: number): Promise<void>;
  saveSkill(skill: Partial<Skill> & { name: string; category: string; proficiency: number; sortOrder: number }): Promise<void>;
  deleteSkill(id: number): Promise<void>;
  saveArticle(article: Partial<Article> & { slug: string; title: string; excerpt: string; tags: string }): Promise<void>;
  deleteArticle(id: number): Promise<void>;
  saveDetail(detail: Partial<ProfileDetail> & { section: string; label: string; content: string; sortOrder: number }): Promise<void>;
  deleteDetail(id: number): Promise<void>;
}

const siteKey = "marcus-chen-portfolio";

const fallbackProfile: PortfolioProfile = {
  id: 1,
  siteKey,
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
  updatedAt: new Date(),
};

const fallbackProjects: Project[] = [
  { id: 1, slug: "iot-integrated-farming", title: "IoT Integrated Farming", summary: "A connected farming concept designed to bring sensor-informed decisions into day-to-day agricultural operations.", category: "IoT Systems", techStack: JSON.stringify(["ESP32", "Embedded C", "Sensors", "IoT"]), liveUrl: null, repoUrl: "https://github.com/RootGokul-404", featured: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, slug: "automated-parking", title: "AI-Based Automated Parking", summary: "An automation-focused parking system concept exploring more efficient vehicle flow and space utilization.", category: "Automation", techStack: JSON.stringify(["Java", "Automation", "System Design"]), liveUrl: null, repoUrl: "https://github.com/RootGokul-404", featured: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, slug: "taxi-booking-java", title: "Taxi Booking System", summary: "A Java-based booking application structured around core ride-request and scheduling workflows.", category: "Application Development", techStack: JSON.stringify(["Java", "OOP", "SQL"]), liveUrl: null, repoUrl: "https://github.com/RootGokul-404", featured: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, slug: "esp32-home-automation", title: "ESP32 Alarm Automation", summary: "An ESP32 and Blynk mini project for lightweight alarm automation and remote control experimentation.", category: "Embedded Systems", techStack: JSON.stringify(["ESP32", "Blynk", "Embedded C"]), liveUrl: null, repoUrl: "https://github.com/RootGokul-404", featured: false, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
];

const fallbackSkills: Skill[] = [
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
];

const fallbackDetails: ProfileDetail[] = [
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
];

const fallbackArticles: Article[] = [
  { id: 1, slug: "designing-for-real-world-constraints", title: "Designing for real-world constraints", excerpt: "A practical approach to translating requirements, constraints, and system boundaries into smaller implementation decisions.", tags: JSON.stringify(["System Design", "Engineering"]), readTime: "4 min read", publishedAt: new Date("2026-02-14"), url: null, createdAt: new Date() },
  { id: 2, slug: "building-the-api-boundary", title: "Building the API boundary before the interface", excerpt: "Why deliberate contracts, stable inputs, and useful failure states make full-stack projects easier to evolve.", tags: JSON.stringify(["REST APIs", "Backend"]), readTime: "5 min read", publishedAt: new Date("2026-03-02"), url: null, createdAt: new Date() },
  { id: 3, slug: "embedded-systems-clarity", title: "What embedded systems teach you about clarity", excerpt: "Lessons from working close to hardware: limits force better defaults, sharper observability, and more intentional software.", tags: JSON.stringify(["Embedded C", "Systems"]), readTime: "3 min read", publishedAt: new Date("2026-03-18"), url: null, createdAt: new Date() },
];

let memoryProfile: PortfolioProfile = { ...fallbackProfile };
let memoryProjects: Project[] = [...fallbackProjects];
let memorySkills: Skill[] = [...fallbackSkills];
let memoryArticles: Article[] = [...fallbackArticles];
let memoryDetails: ProfileDetail[] = [...fallbackDetails];
let memorySubmissions: ContactSubmission[] = [];
let memoryUsers = new Map<string, User>();

export class DrizzlePortfolioRepository implements IPortfolioRepository {
  private _db: ReturnType<typeof drizzle> | null = null;

  private async getDb() {
    if (!this._db && process.env.DATABASE_URL) {
      try {
        this._db = drizzle(process.env.DATABASE_URL);
      } catch (error) {
        this._db = null;
      }
    }
    return this._db;
  }

  async getUserByOpenId(openId: string): Promise<User | undefined> {
    const db = await this.getDb();
    if (!db) {
      return memoryUsers.get(openId);
    }
    const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
    return result[0];
  }

  async upsertUser(user: InsertUser): Promise<void> {
    if (!user.openId) throw new Error("User openId is required for upsert");
    const db = await this.getDb();
    const role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");
    if (!db) {
      const existing = memoryUsers.get(user.openId);
      const now = new Date();
      memoryUsers.set(user.openId, {
        id: existing?.id ?? Date.now(),
        openId: user.openId,
        name: user.name ?? existing?.name ?? null,
        email: user.email ?? existing?.email ?? null,
        loginMethod: user.loginMethod ?? existing?.loginMethod ?? null,
        role,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
        lastSignedIn: now,
      });
      return;
    }
    const values: InsertUser = { openId: user.openId, lastSignedIn: new Date() };
    const updateSet: Record<string, unknown> = { lastSignedIn: new Date() };
    (["name", "email", "loginMethod"] as const).forEach((field) => {
      if (user[field] !== undefined) {
        values[field] = user[field] ?? null;
        updateSet[field] = user[field] ?? null;
      }
    });
    values.role = role;
    updateSet.role = role;
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  }

  async getPortfolioContent() {
    const db = await this.getDb();
    if (!db) {
      return {
        profile: memoryProfile,
        projects: memoryProjects,
        skills: memorySkills,
        articles: memoryArticles,
        details: memoryDetails,
      };
    }
    const [profile] = await db.select().from(portfolioProfiles).where(eq(portfolioProfiles.siteKey, siteKey)).limit(1);
    const [projectRows, skillRows, articleRows, detailRows] = await Promise.all([
      db.select().from(projects).orderBy(asc(projects.sortOrder)),
      db.select().from(skills).orderBy(asc(skills.category), asc(skills.sortOrder)),
      db.select().from(articles).orderBy(asc(articles.publishedAt)),
      db.select().from(profileDetails).orderBy(asc(profileDetails.section), asc(profileDetails.sortOrder)),
    ]);
    return {
      profile: profile || memoryProfile,
      projects: projectRows.length > 0 ? projectRows : memoryProjects,
      skills: skillRows.length > 0 ? skillRows : memorySkills,
      articles: articleRows.length > 0 ? articleRows : memoryArticles,
      details: detailRows.length > 0 ? detailRows : memoryDetails,
    };
  }

  async getAdminData() {
    const db = await this.getDb();
    if (!db) {
      return {
        profile: memoryProfile,
        projects: memoryProjects,
        skills: memorySkills,
        articles: memoryArticles,
        details: memoryDetails,
        submissions: memorySubmissions,
      };
    }
    const [profile] = await db.select().from(portfolioProfiles).where(eq(portfolioProfiles.siteKey, siteKey)).limit(1);
    const [projectRows, skillRows, articleRows, detailRows, submissionRows] = await Promise.all([
      db.select().from(projects).orderBy(asc(projects.sortOrder)),
      db.select().from(skills).orderBy(asc(skills.category), asc(skills.sortOrder)),
      db.select().from(articles).orderBy(desc(articles.createdAt)),
      db.select().from(profileDetails).orderBy(asc(profileDetails.section), asc(profileDetails.sortOrder)),
      db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)),
    ]);
    return {
      profile: profile || memoryProfile,
      projects: projectRows.length > 0 ? projectRows : memoryProjects,
      skills: skillRows.length > 0 ? skillRows : memorySkills,
      articles: articleRows.length > 0 ? articleRows : memoryArticles,
      details: detailRows.length > 0 ? detailRows : memoryDetails,
      submissions: submissionRows,
    };
  }

  async createSubmission(data: { name: string; email: string; company?: string | null; message: string }): Promise<ContactSubmission> {
    const db = await this.getDb();
    const submission: ContactSubmission = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      message: data.message,
      status: "new",
      createdAt: new Date(),
    };
    if (!db) {
      memorySubmissions.unshift(submission);
      return submission;
    }
    await db.insert(contactSubmissions).values({
      name: data.name,
      email: data.email,
      company: data.company || null,
      message: data.message,
    });
    return submission;
  }

  async updateSubmissionStatus(id: number, status: "new" | "read" | "archived"): Promise<void> {
    const db = await this.getDb();
    if (!db) {
      const item = memorySubmissions.find((s) => s.id === id);
      if (item) item.status = status;
      return;
    }
    await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id));
  }

  async updateProfile(input: Partial<PortfolioProfile>): Promise<void> {
    const db = await this.getDb();
    memoryProfile = { ...memoryProfile, ...input, updatedAt: new Date() };
    if (!db) return;
    await db
      .update(portfolioProfiles)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(eq(portfolioProfiles.siteKey, siteKey));
  }

  async saveProject(input: any): Promise<void> {
    const db = await this.getDb();
    if (!db) {
      if (input.id) {
        memoryProjects = memoryProjects.map((p) => (p.id === input.id ? { ...p, ...input } : p));
      } else {
        memoryProjects.push({ ...input, id: Date.now(), createdAt: new Date(), updatedAt: new Date() });
      }
      return;
    }
    const values = { ...input, liveUrl: input.liveUrl || null, repoUrl: input.repoUrl || null };
    if (input.id) {
      await db.update(projects).set(values).where(eq(projects.id, input.id));
    } else {
      await db.insert(projects).values(values);
    }
  }

  async deleteProject(id: number): Promise<void> {
    const db = await this.getDb();
    memoryProjects = memoryProjects.filter((p) => p.id !== id);
    if (!db) return;
    await db.delete(projects).where(eq(projects.id, id));
  }

  async saveSkill(input: any): Promise<void> {
    const db = await this.getDb();
    if (!db) {
      if (input.id) {
        memorySkills = memorySkills.map((s) => (s.id === input.id ? { ...s, ...input } : s));
      } else {
        memorySkills.push({ ...input, id: Date.now() });
      }
      return;
    }
    if (input.id) {
      await db.update(skills).set(input).where(eq(skills.id, input.id));
    } else {
      await db.insert(skills).values(input);
    }
  }

  async deleteSkill(id: number): Promise<void> {
    const db = await this.getDb();
    memorySkills = memorySkills.filter((s) => s.id !== id);
    if (!db) return;
    await db.delete(skills).where(eq(skills.id, id));
  }

  async saveArticle(input: any): Promise<void> {
    const db = await this.getDb();
    if (!db) {
      if (input.id) {
        memoryArticles = memoryArticles.map((a) => (a.id === input.id ? { ...a, ...input } : a));
      } else {
        memoryArticles.push({ ...input, id: Date.now(), createdAt: new Date() });
      }
      return;
    }
    const values = {
      ...input,
      readTime: input.readTime || null,
      url: input.url || null,
      publishedAt: input.publishedAt || null,
    };
    if (input.id) {
      await db.update(articles).set(values).where(eq(articles.id, input.id));
    } else {
      await db.insert(articles).values(values);
    }
  }

  async deleteArticle(id: number): Promise<void> {
    const db = await this.getDb();
    memoryArticles = memoryArticles.filter((a) => a.id !== id);
    if (!db) return;
    await db.delete(articles).where(eq(articles.id, id));
  }

  async saveDetail(input: any): Promise<void> {
    const db = await this.getDb();
    if (!db) {
      if (input.id) {
        memoryDetails = memoryDetails.map((d) => (d.id === input.id ? { ...d, ...input } : d));
      } else {
        memoryDetails.push({ ...input, id: Date.now() });
      }
      return;
    }
    if (input.id) {
      await db.update(profileDetails).set(input).where(eq(profileDetails.id, input.id));
    } else {
      await db.insert(profileDetails).values(input);
    }
  }

  async deleteDetail(id: number): Promise<void> {
    const db = await this.getDb();
    memoryDetails = memoryDetails.filter((d) => d.id !== id);
    if (!db) return;
    await db.delete(profileDetails).where(eq(profileDetails.id, id));
  }
}

export const portfolioRepository: IPortfolioRepository = new DrizzlePortfolioRepository();
