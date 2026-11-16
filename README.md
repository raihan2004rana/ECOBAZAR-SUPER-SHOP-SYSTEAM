# ECOBAZAR — Retail Operating System & Multi-Branch Supermarket Management Ecosystem

[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-blue)](https://turbo.build/)
[![NestJS](https://img.shields.io/badge/NestJS-10+-red.svg)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)
[![Expo](https://img.shields.io/badge/Expo-51+-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC.svg)](https://tailwindcss.com/)

ECOBAZAR is an enterprise-grade, omnichannel retail operating system and intelligent supermarket management platform built for the Bangladesh market. It connects physical multi-branch stores, warehouse logistics, batch-level inventory tracking with First-Expired, First-Out (FEFO) allocation, high-speed Point of Sale (POS) checkouts, and customer-facing e-commerce into a unified architecture.

---

## 🏛️ System Architecture & Planning Documentation

Complete technical specifications and architecture blueprints are documented in [`docs/`](./docs/):

- 📐 **[System Architecture](./docs/architecture/system-architecture.md)** — High-level topology, client communication, caching, queues, and AI integration.
- 📦 **[Monorepo Structure](./docs/architecture/monorepo-structure.md)** — pnpm + Turborepo layout, workspace packages, and dependency boundary rules.
- ⚙️ **[Backend Architecture](./docs/architecture/backend-architecture.md)** — 21 NestJS domain modules, request lifecycle, and FEFO stock allocation engine.
- 🛡️ **[Security Architecture](./docs/architecture/security-architecture.md)** — Dual-token auth, refresh token rotation, Argon2id hashing, and branch-level isolation.
- 🗄️ **[Database Architecture](./docs/database/database-design.md)** — Normalized PostgreSQL schema with Prisma ORM, UUID PKs, and monetary precision.
- 🌐 **[API Standards & Endpoints](./docs/api/api-standards.md)** — `/api/v1/` REST conventions, standard envelopes, and endpoint catalog.
- 🎨 **[Design System & UI/UX](./docs/design/design-system.md)** — Master color tokens, typography (Inter + Hind Siliguri), and POS/storefront layouts.
- 🗺️ **[Development Roadmap](./docs/development/development-roadmap.md)** — 15 structured implementation phases with verifiable completion criteria.
- 🚀 **[Development Setup Guide](./docs/development/setup-guide.md)** — Step-by-step developer onboarding and environment configuration.

---

## 💻 Monorepo Structure

```
ECOBAZAR/
├── apps/
│   ├── web/          # Next.js 14+ Customer Storefront (Port 3000)
│   ├── admin/        # Next.js 14+ Enterprise Admin & POS (Port 3001)
│   ├── mobile/       # React Native / Expo Mobile App (Port 8081)
│   └── api/          # NestJS 10+ Modular Monolith API (Port 4000)
├── packages/
│   ├── ui/           # Design system components (Radix + Tailwind)
│   ├── types/        # Shared TypeScript interfaces & API contracts
│   ├── validators/   # Shared Zod validation schemas
│   ├── constants/    # Business defaults, roles, and status enums
│   ├── config/       # Shared Tailwind preset, ESLint & Prettier
│   └── api-client/   # Typed isomorphic HTTP client SDK
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

### 3. Run Development Servers
```bash
# Run all applications concurrently via Turborepo
pnpm dev

# Or run specific applications:
pnpm --filter @ecobazar/web dev     # Customer Storefront -> http://localhost:3000
pnpm --filter @ecobazar/admin dev   # Admin & POS Dashboard -> http://localhost:3001
pnpm --filter @ecobazar/api dev     # NestJS Backend API -> http://localhost:4000/api/v1
pnpm --filter @ecobazar/mobile dev  # Expo Mobile App -> http://localhost:8081
```

### 4. Code Quality & Type Checks
```bash
pnpm typecheck   # Strict TypeScript checks across monorepo
pnpm lint        # Run ESLint across all projects
pnpm build       # Production build of all packages and applications
pnpm format      # Prettier formatting
```

---

## 📋 Master Instructions

The master project requirements and permanent working guidelines are preserved in [PROJECT_MASTER_INSTRUCTIONS.md](./PROJECT_MASTER_INSTRUCTIONS.md).
