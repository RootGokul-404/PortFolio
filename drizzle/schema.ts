import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const portfolioProfiles = mysqlTable("portfolioProfiles", {
  id: int("id").autoincrement().primaryKey(),
  siteKey: varchar("siteKey", { length: 64 }).notNull().unique(),
  displayName: varchar("displayName", { length: 128 }).notNull(),
  handle: varchar("handle", { length: 64 }),
  role: varchar("role", { length: 160 }).notNull(),
  intro: text("intro").notNull(),
  about: text("about").notNull(),
  location: varchar("location", { length: 160 }),
  email: varchar("email", { length: 320 }),
  githubUrl: varchar("githubUrl", { length: 512 }),
  linkedinUrl: varchar("linkedinUrl", { length: 512 }),
  instagramUrl: varchar("instagramUrl", { length: 512 }),
  resumeUrl: varchar("resumeUrl", { length: 512 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const projects = mysqlTable(
  "projects",
  {
    id: int("id").autoincrement().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    summary: text("summary").notNull(),
    category: varchar("category", { length: 96 }).notNull(),
    techStack: text("techStack").notNull(),
    liveUrl: varchar("liveUrl", { length: 512 }),
    repoUrl: varchar("repoUrl", { length: 512 }),
    featured: boolean("featured").default(false).notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [uniqueIndex("projects_slug_unique").on(table.slug)],
);

export const profileDetails = mysqlTable(
  "profileDetails",
  {
    id: int("id").autoincrement().primaryKey(),
    section: varchar("section", { length: 64 }).notNull(),
    label: varchar("label", { length: 160 }).notNull(),
    content: text("content").notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
  },
  (table) => [uniqueIndex("profileDetails_section_label_unique").on(table.section, table.label)],
);

export const skills = mysqlTable(
  "skills",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 96 }).notNull(),
    category: varchar("category", { length: 96 }).notNull(),
    proficiency: int("proficiency").notNull(),
    sortOrder: int("sortOrder").default(0).notNull(),
  },
  (table) => [uniqueIndex("skills_name_category_unique").on(table.name, table.category)],
);

export const articles = mysqlTable(
  "articles",
  {
    id: int("id").autoincrement().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    excerpt: text("excerpt").notNull(),
    tags: text("tags").notNull(),
    readTime: varchar("readTime", { length: 32 }),
    publishedAt: timestamp("publishedAt"),
    url: varchar("url", { length: 512 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("articles_slug_unique").on(table.slug)],
);

export const contactSubmissions = mysqlTable("contactSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 160 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "archived"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type PortfolioProfile = typeof portfolioProfiles.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProfileDetail = typeof profileDetails.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
