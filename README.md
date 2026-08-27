# Gokulakannan (RootGokul-404) · Portfolio & Systems Showcase

<div align="center">

![License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646cff.svg?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg?logo=tailwindcss)
![tRPC](https://img.shields.io/badge/tRPC-v11-25c2a0.svg?logo=trpc)
![Express](https://img.shields.io/badge/Express-4.21-black.svg?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-Drizzle%20ORM-4479a1.svg?logo=mysql)

**Java Full Stack Developer · Systems Builder**

*Transforming ideas into scalable systems through backend engineering, clean code, and practical product thinking.*

[Live Portfolio](http://localhost:3000) · [LinkedIn Profile](https://www.linkedin.com/in/gokula-kannan-dev) · [GitHub Profile](https://github.com/RootGokul-404)

</div>

---

## ⚡ About the Engineer

**Gokulakannan** (`RootGokul-404`) is an **Electrical & Electronics Engineering (EEE)** graduate who transitioned into **Software Engineering** and **Java Full Stack Development**. Bringing hardware-level precision and deep logical rigor into modern software architecture, he specializes in scalable distributed systems, Spring Boot microservices, high-throughput REST APIs, and database engineering.

### Core Philosophy
> **"Learn · Build · Evolve"**
> *EEE gave the logic. Software engineering gave the platform. Now building the future through code.*

---

## 🚀 Key Features

- **Cyber-Industrial UI/UX**: Custom neon-signal aesthetic built with Tailwind CSS v4, smooth animations, circuit topology visuals, and glassmorphic telemetry cards.
- **SOLID Architectural Design**: Decomposed into isolated, single-responsibility components and layered service boundaries.
- **Transition Pipeline (01_JOURNEY)**: Visual roadmap detailing the technical progression from electrical circuits & embedded registers to modern Java full-stack applications.
- **Interactive Project Showcase (02_WORK)**: Categorized and filterable project grid featuring IoT systems, automation platforms, and full-stack software.
- **Capability Matrix (03_SKILLS)**: Data-driven proficiency meters across Languages, Web & APIs, Systems, and Developer Tools.
- **Engineering Notes (04_WRITING)**: Technical insights on API boundaries, embedded constraints, and software architecture.
- **Transmission Terminal (05_CONNECT)**: Spam-protected (honeypot + client validation) contact form with asynchronous email dispatch.
- **Live Résumé Specification**: In-browser preview, instant clipboard copying, and Markdown file generation (`Gokulakannan-RootGokul-404-Resume.md`).
- **Owner Admin Console**: Protected dashboard to review contact submissions and dynamically manage portfolio entries.

---

## 🏗️ Architecture & SOLID Principles

This project is built following strict software design principles:

| Principle | Implementation in Codebase |
| :--- | :--- |
| **Single Responsibility (SRP)** | The monolithic entrypoint is decomposed into focused modular components (`HeroSection`, `JourneySection`, `ProjectsSection`, `SkillsSection`, `ArticlesSection`, `ContactSection`, `ResumeModal`, `HeaderNav`, `FooterSection`). The backend separates route definitions, business logic (`contactService`, `portfolioService`), and persistence (`portfolioRepository`). |
| **Open/Closed (OCP)** | Adding new skill categories, projects, or narrative timeline items requires zero modifications to the core layout rendering engine; data drives the UI dynamically. |
| **Liskov Substitution (LSP)** | `IPortfolioRepository` abstracts storage interactions with seamless in-memory fallback, allowing the entire application to function smoothly across development, testing, and production environments. |
| **Interface Segregation (ISP)** | Granular TypeScript interfaces define precise contracts (`Profile`, `Project`, `Skill`, `Article`, `ProfileDetail`, `ContactSubmission`) without bloated dependencies. |
| **Dependency Inversion (DIP)** | Backend controllers and services depend on abstractions (`IPortfolioRepository`, `IEmailService`) rather than concrete database or email vendor implementations. |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Vite 7** for ultra-fast HMR and bundling
- **Tailwind CSS v4** + **Tw-Animate-CSS**
- **Radix UI Primitives** for accessible modal and dialog behaviors
- **Lucide Icons**
- **Sonner** for toasts and feedback notifications

### Backend
- **Node.js** + **Express**
- **tRPC v11** for end-to-end type safety
- **Drizzle ORM** with **MySQL2**
- **Resend API** for reliable transactional emails
- **Jose** for JWT signing and session management
- **Zod** for strict input validation

---

## 📁 Directory Structure

```text
├── client/
│   ├── public/                      # Static assets (profile image, favicon)
│   ├── src/
│   │   ├── _core/                   # Authentication hooks and client core
│   │   ├── assets/                  # Graphics, icons, and vector topology
│   │   ├── components/
│   │   │   ├── portfolio/           # Modular SOLID portfolio components
│   │   │   │   ├── HeaderNav.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── JourneySection.tsx
│   │   │   │   ├── ProjectsSection.tsx
│   │   │   │   ├── SkillsSection.tsx
│   │   │   │   ├── ArticlesSection.tsx
│   │   │   │   ├── ContactSection.tsx
│   │   │   │   ├── ResumeModal.tsx
│   │   │   │   └── FooterSection.tsx
│   │   │   └── ui/                  # Active UI design system primitives
│   │   ├── data/                    # Portfolio dataset and localStorage sync
│   │   ├── pages/                   # Route views (Home, AdminSubmissions, AdminContent)
│   │   ├── App.tsx                  # Application routing shell
│   │   ├── index.css                # Global design system tokens and styling
│   │   └── main.tsx                 # Client entrypoint and tRPC provider
├── server/
│   ├── _core/                       # Express server, Vite middleware, tRPC setup
│   ├── repositories/                # Data persistence layer (IPortfolioRepository)
│   ├── services/                    # Business services (ContactService, EmailService, PortfolioService)
│   ├── db.ts                        # Drizzle database connectivity & seed orchestration
│   └── routers.ts                   # tRPC API routes
├── shared/                          # Universal type definitions and shared constants
├── drizzle/                         # Database schema definitions and migrations
└── package.json                     # Project manifest and scripts
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js** `>= 20.x`
- **pnpm** `>= 10.x` (or `npm` / `yarn`)
- **MySQL** (optional; built-in seed storage fallback operates automatically)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RootGokul-404/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables (create `.env`):
   ```env
   PORT=3000
   DATABASE_URL="mysql://user:password@localhost:3306/portfolio"
   RESEND_API_KEY="re_your_api_key"
   CONTACT_FROM_EMAIL="contact@yourdomain.com"
   ```

4. Start the development server:
   ```bash
   pnpm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🧪 Testing & Validation

Run the test suite:
```bash
pnpm test
```

Perform TypeScript type check:
```bash
pnpm run check
```

Build for production:
```bash
pnpm run build
```

---

## 📬 Contact & Socials

- **Developer:** Gokulakannan (`RootGokul-404`)
- **Email:** [gokulakannan7972@gmail.com](mailto:gokulakannan7972@gmail.com)
- **LinkedIn:** [https://www.linkedin.com/in/gokula-kannan-dev](https://www.linkedin.com/in/gokula-kannan-dev)
- **GitHub:** [https://github.com/RootGokul-404](https://github.com/RootGokul-404)
- **Instagram:** [https://instagram.com/ivan_gokula_kannan](https://instagram.com/ivan_gokula_kannan)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
