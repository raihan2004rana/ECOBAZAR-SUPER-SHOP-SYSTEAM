# ECOBAZAR — Retail Operating System & Multi-Branch Supermarket Management Ecosystem

[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-blue)](https://turbo.build/)
[![NestJS](https://img.shields.io/badge/NestJS-10+-red.svg)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791.svg)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg)](https://www.prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-7+-DC382D.svg)](https://redis.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6.svg)](https://www.typescriptlang.org/)

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

---

## 💻 Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Storefront Web App**: Next.js 14+ (App Router), React, Tailwind CSS, shadcn/ui, Framer Motion
- **Admin & POS App**: Next.js 14+, Tailwind CSS, Radix UI, TanStack Table
- **Mobile App**: React Native, Expo, TypeScript
- **Backend API**: Node.js 20+ LTS, NestJS 10+ (Modular Monolith)
- **Database & ORM**: PostgreSQL 16+, Prisma ORM
- **Cache & Async Processing**: Redis 7+, BullMQ
- **Integrations**: bKash, Nagad, SSLCommerz, SMS Gateways, Google Gemini / OpenAI

---

## 📋 Master Instructions

The master project requirements and permanent working guidelines are preserved in [PROJECT_MASTER_INSTRUCTIONS.md](./PROJECT_MASTER_INSTRUCTIONS.md).
