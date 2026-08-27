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
} from "../drizzle/schema";
import { sendContactNotification } from "./contactEmail";
import { ENV } from "./_core/env";
import { portfolioRepository } from "./repositories/portfolioRepository";

export const siteKey = "marcus-chen-portfolio";

export async function getDb() {
  return (portfolioRepository as any).getDb?.() || null;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  return portfolioRepository.upsertUser(user);
}

export async function getUserByOpenId(openId: string) {
  return portfolioRepository.getUserByOpenId(openId);
}

export async function getPortfolioContent() {
  return portfolioRepository.getPortfolioContent();
}

export async function createContactSubmission(input: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  await portfolioRepository.createSubmission(input);
  const content = await portfolioRepository.getPortfolioContent();
  const recipient = content.profile?.email || "gokulakannan7972@gmail.com";
  try {
    await sendContactNotification({ ...input, recipient });
    return { success: true, emailSent: true };
  } catch (error) {
    return { success: true, emailSent: false };
  }
}

export async function getAdminPortfolioData() {
  return portfolioRepository.getAdminData();
}

export async function updateSubmissionStatus(id: number, status: "new" | "read" | "archived") {
  await portfolioRepository.updateSubmissionStatus(id, status);
  return { success: true };
}

export async function updatePortfolioProfile(input: any) {
  await portfolioRepository.updateProfile(input);
  return { success: true };
}

export async function saveProject(input: any) {
  await portfolioRepository.saveProject(input);
  return { success: true };
}

export async function deleteProject(id: number) {
  await portfolioRepository.deleteProject(id);
  return { success: true };
}

export async function saveSkill(input: any) {
  await portfolioRepository.saveSkill(input);
  return { success: true };
}

export async function deleteSkill(id: number) {
  await portfolioRepository.deleteSkill(id);
  return { success: true };
}

export async function saveArticle(input: any) {
  await portfolioRepository.saveArticle(input);
  return { success: true };
}

export async function deleteArticle(id: number) {
  await portfolioRepository.deleteArticle(id);
  return { success: true };
}

export async function saveProfileDetail(input: any) {
  await portfolioRepository.saveDetail(input);
  return { success: true };
}

export async function deleteProfileDetail(id: number) {
  await portfolioRepository.deleteDetail(id);
  return { success: true };
}
