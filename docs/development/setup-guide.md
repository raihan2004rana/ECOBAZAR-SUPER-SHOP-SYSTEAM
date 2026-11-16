# ECOBAZAR — Local Development Setup Guide

## 1. Prerequisites

Before running the ECOBAZAR monorepo, verify your local environment has:
- **Node.js**: v20.x LTS or v22.x LTS (verified with `node -v`)
- **pnpm**: v9.x+ (install via `npm install -g pnpm`)
- **Docker & Docker Compose**: For local PostgreSQL 16 and Redis 7 instances
- **Git**: For version control

---

## 2. Initial Setup

### 2.1. Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/raihan2004rana/ECOBAZAR-SUPER-SHOP-SYSTEAM.git
cd ECOBAZAR-SUPER-SHOP-SYSTEAM

# Install all workspace dependencies
pnpm install
```

### 2.2. Environment Configuration
Copy the template environment file to root and individual apps as needed:
```bash
cp .env.example .env.local
```

Key environment settings for development:
- `NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1`
- `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecobazar_dev?schema=public`
- `REDIS_HOST=localhost`
- `REDIS_PORT=6379`

---

## 3. Running Applications

The monorepo is managed by **Turborepo**. You can run all services concurrently or target individual applications:

### 3.1. Run Entire Ecosystem (All 4 Apps)
```bash
pnpm dev
```

### 3.2. Run Individual Applications

| Application | Command | Local URL | Description |
| :--- | :--- | :--- | :--- |
| **Customer Storefront** | `pnpm --filter @ecobazar/web dev` | `http://localhost:3000` | Next.js customer e-commerce marketplace |
| **Admin & POS Dashboard**| `pnpm --filter @ecobazar/admin dev`| `http://localhost:3001` | Multi-branch SaaS & high-speed POS |
| **Backend API** | `pnpm --filter @ecobazar/api dev` | `http://localhost:4000/api/v1` | NestJS Modular Monolith API |
| **API Documentation** | (Available when API runs) | `http://localhost:4000/api/v1/docs`| Swagger / OpenAPI Interactive Explorer |
| **Mobile App (Expo)** | `pnpm --filter @ecobazar/mobile dev`| `http://localhost:8081` | Expo Metro bundler for iOS/Android |

---

## 4. Code Quality & Verification Commands

```bash
# Run TypeScript compilation checks across all apps & packages
pnpm typecheck

# Run linting across the monorepo
pnpm lint

# Build all applications for production
pnpm build

# Format codebase with Prettier
pnpm format
```

---

## 5. Monorepo Structure Reference

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
├── docs/             # Complete technical architecture & plans
├── package.json      # Monorepo root manifest
├── pnpm-workspace.yaml # Workspace declaration
├── turbo.json        # Turborepo task pipeline
└── tsconfig.base.json # Shared TypeScript strict compiler settings
```
