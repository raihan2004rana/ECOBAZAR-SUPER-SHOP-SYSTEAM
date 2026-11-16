# ECOBAZAR — Monorepo Architecture Specification

## 1. Monorepo Strategy Overview

ECOBAZAR utilizes a **pnpm workspaces** and **Turborepo** monorepo architecture. This design delivers:
- **Strict Dependency Isolation**: Fast, disk-efficient symlinked dependencies via `pnpm`.
- **Deterministic Pipeline Execution**: Computational caching and parallel task execution managed by `turborepo`.
- **Single Source of Truth**: Shared domain models, validation schemas, API contracts, and design tokens across Web, Admin, Mobile, and Backend.
- **Atomic Changes**: Coordinated refactoring across backend API and frontend consumers in a single pull request.

---

## 2. Comprehensive Directory Structure

```
ECOBAZAR/
├── .github/                           # CI/CD Workflows & Issue Templates
│   └── workflows/
│       ├── ci.yml                     # Lint, Typecheck, Test on PR
│       ├── deploy-api.yml             # API build & deployment
│       └── deploy-frontends.yml       # Web & Admin deployments
├── apps/                              # Executable Applications
│   ├── web/                           # Customer-facing Next.js E-Commerce
│   ├── admin/                         # Enterprise SaaS & POS Next.js Dashboard
│   ├── mobile/                        # Cross-Platform React Native (Expo) App
│   └── api/                           # Core NestJS Modular Monolith API
├── packages/                          # Shared Internal Libraries
│   ├── ui/                            # Design System & Shared UI Components
│   ├── types/                         # Shared TypeScript Interfaces, Enums & DTOs
│   ├── validators/                    # Shared Zod Validation Schemas
│   ├── api-client/                    # Type-Safe REST & WebSocket API SDK
│   ├── config/                        # Shared Tooling Configurations
│   └── database/                      # Prisma ORM Schema, Migrations & Seeds
├── infrastructure/                    # Deployment & Container Configurations
│   ├── docker/
│   │   ├── Dockerfile.api             # Multi-stage production build for API
│   │   ├── Dockerfile.web             # Next.js standalone runner for Web
│   │   ├── Dockerfile.admin           # Next.js standalone runner for Admin
│   │   └── docker-compose.yml         # Local development environment (PG, Redis)
│   └── nginx/
│       └── nginx.conf                 # Local/Staging reverse proxy routing
├── docs/                              # Project Architecture & Engineering Specs
│   ├── architecture/                  # System, Monorepo, Backend, Security
│   ├── database/                      # Relational Schema & Entity Relationships
│   ├── api/                           # Endpoint Specifications & Standards
│   ├── design/                        # Design System & UI/UX Guidelines
│   └── development/                   # Phased Roadmap & Contribution Guidelines
├── tests/                             # Workspace-Wide End-to-End Test Suites
│   └── e2e/                           # Playwright cross-app end-to-end flows
├── .editorconfig                      # Consistent cross-IDE formatting rules
├── .gitignore                         # Git exclusion rules
├── .npmrc                             # pnpm strict peer dependencies config
├── package.json                       # Monorepo root manifest
├── pnpm-lock.yaml                     # Immutable dependency lockfile
├── pnpm-workspace.yaml                # Workspace package boundaries
├── PROJECT_MASTER_INSTRUCTIONS.md     # Permanent master project context
├── README.md                          # Repository onboarding overview
├── tsconfig.base.json                 # Base TypeScript compiler settings
└── turbo.json                         # Turborepo task pipeline definition
```

---

## 3. Directory Responsibilities & Boundary Rules

### 3.1. Applications (`apps/`)

#### `apps/web` (Port: 3000)
- **Role**: Customer-facing e-commerce storefront.
- **Tech Stack**: Next.js 14+ (App Router), React 18+, Tailwind CSS, `@ecobazar/ui`, `@ecobazar/api-client`, `@ecobazar/types`, `@ecobazar/validators`.
- **Boundaries**: Pure client application. Never imports `@ecobazar/database` directly. Consumes data solely through `@ecobazar/api-client`.

#### `apps/admin` (Port: 3001)
- **Role**: Central Back-Office SaaS and in-store Point of Sale (POS) system.
- **Tech Stack**: Next.js 14+ (Client-heavy dashboard), Tailwind CSS, `@ecobazar/ui`, `@ecobazar/api-client`, `@ecobazar/types`, `@ecobazar/validators`.
- **Boundaries**: Strictly role-gated. Operates with branch and organization context headers.

#### `apps/mobile` (Port: 8081 / Expo)
- **Role**: Cross-platform application for customers, pickers, and delivery drivers.
- **Tech Stack**: React Native 0.74+, Expo SDK 51+, NativeWind, `@ecobazar/api-client`, `@ecobazar/types`, `@ecobazar/validators`.
- **Boundaries**: Uses React Native compatible libraries. Shares business models and validators from the monorepo packages.

#### `apps/api` (Port: 4000)
- **Role**: Core backend API powering all client experiences.
- **Tech Stack**: NestJS 10+, Prisma ORM (`@ecobazar/database`), Redis, BullMQ, TypeScript.
- **Boundaries**: Single source of truth for business logic, database transactions, and external services.

---

### 3.2. Shared Packages (`packages/`)

#### `packages/types`
- **Responsibility**: Houses all pure TypeScript interfaces, type definitions, domain enums, and API transfer objects.
- **Dependencies**: Zero runtime dependencies. Transpiles to zero JS overhead.
- **Exports**: User roles, order statuses, batch statuses, payment methods, API response envelopes.

#### `packages/validators`
- **Responsibility**: Pure Zod validation schemas matching domain requirements.
- **Usage**: Used in `apps/api` via NestJS Zod validation pipes, and in `apps/web`, `apps/admin`, and `apps/mobile` for client-side form validation (React Hook Form + Zod resolver).
- **Exports**: `CreateProductSchema`, `PosCheckoutSchema`, `CreatePurchaseOrderSchema`, `RegisterBranchSchema`, etc.

#### `packages/ui`
- **Responsibility**: The ECOBAZAR Design System. Reusable primitives, compound UI components, typography wrappers, and custom icons.
- **Tech Stack**: Radix UI primitives, Tailwind CSS, Lucide Icons, class-variance-authority (CVA).
- **Exports**: Button, Input, Dialog, Table, Badge, Card, Select, Toast, Drawer, PriceTag, ExpiryBadge.

#### `packages/api-client`
- **Responsibility**: Isomorphic, fully typed HTTP and WebSocket client SDK.
- **Tech Stack**: Axios or Fetch with typed wrappers, automatic JWT refresh interceptors, and error envelope unwrapping.
- **Exports**: `createEcobazarClient({ baseUrl, getAccessToken, onTokenExpired })`.

#### `packages/database`
- **Responsibility**: The single source of truth for database definition.
- **Contents**:
  - `prisma/schema.prisma`: The master database schema.
  - `prisma/migrations/`: Checked-in, version-controlled SQL migrations.
  - `prisma/seeds/`: Reproducible test and initial business seed scripts.
- **Exports**: Pre-configured `PrismaClient` singleton and generated model types.

#### `packages/config`
- **Responsibility**: Centralized developer tooling configuration files.
- **Contents**:
  - `eslint/`: Shared ESLint rules for Node, Next.js, and React Native.
  - `tailwind/`: Shared Tailwind CSS preset containing ECOBAZAR color tokens and fonts.
  - `typescript/`: Shared `tsconfig.json` bases (base, react, node).

---

## 4. Turborepo Pipeline Configuration (`turbo.json`)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [
    "**/.env.*local",
    "tsconfig.base.json"
  ],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "test:e2e": {
      "dependsOn": ["build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "db:generate": {
      "cache": false
    },
    "db:push": {
      "cache": false
    }
  }
}
```

---

## 5. Dependency Management & Workspace Rules

1. **pnpm Strict Isolation**: Hoisting is restricted (`hoist=false` by default in pnpm) to prevent ghost dependencies.
2. **Package Naming Convention**: All internal workspace packages are scoped under `@ecobazar/*`:
   - `@ecobazar/types`
   - `@ecobazar/validators`
   - `@ecobazar/ui`
   - `@ecobazar/api-client`
   - `@ecobazar/config`
   - `@ecobazar/database`
3. **Workspace Protocol**: Inter-package dependencies declare `"workspace:*"` in `package.json` to always resolve local source packages during development.
4. **No Cyclic Dependencies**: The dependency tree is strictly acyclic:
   - `apps/*` depend on `packages/*`
   - `packages/ui` depends on `packages/config`
   - `packages/validators` depends on `packages/types`
   - `packages/api-client` depends on `packages/types` and `packages/validators`
   - `packages/database` has no dependency on other workspace packages.
