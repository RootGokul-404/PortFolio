import { IPortfolioRepository, portfolioRepository } from "../repositories/portfolioRepository";

export class PortfolioService {
  constructor(private repo: IPortfolioRepository = portfolioRepository) {}

  async getPublicContent() {
    return this.repo.getPortfolioContent();
  }

  async getAdminContent() {
    return this.repo.getAdminData();
  }

  async updateSubmissionStatus(id: number, status: "new" | "read" | "archived") {
    await this.repo.updateSubmissionStatus(id, status);
    return { success: true };
  }

  async updateProfile(data: any) {
    await this.repo.updateProfile(data);
    return { success: true };
  }

  async saveProject(data: any) {
    await this.repo.saveProject(data);
    return { success: true };
  }

  async deleteProject(id: number) {
    await this.repo.deleteProject(id);
    return { success: true };
  }

  async saveSkill(data: any) {
    await this.repo.saveSkill(data);
    return { success: true };
  }

  async deleteSkill(id: number) {
    await this.repo.deleteSkill(id);
    return { success: true };
  }

  async saveArticle(data: any) {
    await this.repo.saveArticle(data);
    return { success: true };
  }

  async deleteArticle(id: number) {
    await this.repo.deleteArticle(id);
    return { success: true };
  }

  async saveDetail(data: any) {
    await this.repo.saveDetail(data);
    return { success: true };
  }

  async deleteDetail(id: number) {
    await this.repo.deleteDetail(id);
    return { success: true };
  }
}

export const portfolioService = new PortfolioService();
