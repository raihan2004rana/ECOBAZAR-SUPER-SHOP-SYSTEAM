# ECOBAZAR — Phased Development Roadmap

## 1. Roadmap Overview & Phasing Principles

To ensure software stability, security, and architectural rigor, ECOBAZAR is built strictly in distinct phases. Each phase builds upon the verified, tested outputs of the previous phase. No phase is declared complete without passing unit tests, type checking, and architectural reviews.

---

## 2. Phase-by-Phase Execution Plan

### Phase 1: Planning, Architecture & Monorepo Foundation
- **Objectives**: Finalize architectural blueprints, establish the pnpm + Turborepo monorepo workspace, configure shared tooling (ESLint, Prettier, TypeScript base), and set up the local Dockerized infrastructure (PostgreSQL 16, Redis 7).
- **Modules / Targets**: Root tooling, `infrastructure/docker/docker-compose.yml`, `docs/*`.
- **Dependencies**: None.
- **Deliverables**:
  - Validated architectural documentation in `docs/`.
  - Configured `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`.
  - Running Docker Compose stack for local PostgreSQL and Redis.
- **Testing Requirements**: Smoke test Docker container health checks; verify Turborepo pipeline caching.
- **Completion Criteria**: Clean `pnpm install` and `pnpm turbo run build` across all workspace stubs.

---

### Phase 2: Database Layer & Data Modeling (`packages/database`)
- **Objectives**: Implement the master normalized PostgreSQL schema in Prisma, execute initial migrations, build database extension utilities (UUID helpers, decimal casting), and create realistic seed scripts for Bangladesh retail entities.
- **Modules / Targets**: `packages/database`, Prisma schema, migration scripts, seeders.
- **Dependencies**: Phase 1 (PostgreSQL Docker container).
- **Deliverables**:
  - Master `schema.prisma` covering all 21 domain entities.
  - Initial migration SQL generating tables, constraints, foreign keys, and indexes.
  - Seed script generating sample Super Admin, default Organization, Dhaka branches, sample categories, and initial product variants.
- **Testing Requirements**: Migration rollback test; seed execution test with query validation.
- **Completion Criteria**: `pnpm --filter @ecobazar/database db:migrate` and `db:seed` succeed without warnings.

---

### Phase 3: Shared Core Packages (`@ecobazar/types`, `@ecobazar/validators`, `@ecobazar/config`)
- **Objectives**: Extract common domain types, enums, DTOs, and Zod validation schemas into shared workspace packages to eliminate duplication between frontend and backend.
- **Modules / Targets**: `packages/types`, `packages/validators`, `packages/config`.
- **Dependencies**: Phase 2 (Prisma types export).
- **Deliverables**:
  - Full TypeScript interfaces for requests and responses.
  - Zod schemas for user registration, login, product creation, order checkout, and POS session operations.
  - Shared ESLint and Tailwind configuration presets.
- **Testing Requirements**: Unit tests for Zod schema validation edge cases (valid/invalid phone numbers, decimal prices).
- **Completion Criteria**: Zero type errors across packages; all Zod unit tests pass.

---

### Phase 4: Core Backend API Engine (`apps/api` - Auth, Tenancy, RBAC, Users)
- **Objectives**: Initialize the NestJS modular monolith; implement JWT authentication, Argon2id hashing, refresh token rotation, AsyncLocalStorage request context, RBAC guards, and immutable audit logging.
- **Modules / Targets**: `AuthModule`, `UsersModule`, `OrganizationsModule`, `BranchesModule`, `RolesPermissionsModule`, `AuditLogsModule`.
- **Dependencies**: Phase 2, Phase 3.
- **Deliverables**:
  - Working authentication and token rotation endpoints.
  - Multi-branch scoping interceptors preventing unauthorized branch access.
  - User and staff management endpoints with audit trail creation.
- **Testing Requirements**: Unit tests for AuthService and JwtAuthGuard; Supertest integration tests for `/api/v1/auth/*` endpoints.
- **Completion Criteria**: 100% passing tests for authentication and authorization guards; zero security bypasses.

---

### Phase 5: Product Catalog & Batch-Wise Inventory Engine (FEFO)
- **Objectives**: Build the product catalog, multi-variant indexing, barcode resolution, and the **First-Expired, First-Out (FEFO)** batch allocation algorithm.
- **Modules / Targets**: `ProductsModule`, `CategoriesModule`, `ProductBatchesModule`, `InventoryModule`.
- **Dependencies**: Phase 4.
- **Deliverables**:
  - Hierarchical category and brand endpoints.
  - Product creation and barcode lookup endpoints.
  - FEFO stock deduction engine ensuring oldest valid batches are depleted first.
  - Stock movement audit ledger recording every inventory transaction.
- **Testing Requirements**: Comprehensive unit tests for the FEFO allocation algorithm under various stock and expiry scenarios; concurrent stock deduction stress tests.
- **Completion Criteria**: Zero negative inventory states permitted; verified FEFO order allocation.

---

### Phase 6: Supplier Management & Procurement (PO & GRN)
- **Objectives**: Implement the purchasing workflow from Purchase Order generation to Goods Received Notes (GRN), landed cost calculations, and automated batch creation upon inventory receipt.
- **Modules / Targets**: `SuppliersModule`, `PurchasingModule`, `ProductBatchesModule`.
- **Dependencies**: Phase 5.
- **Deliverables**:
  - Supplier directory and ledger tracking.
  - Purchase order creation and approval lifecycle.
  - GRN processing that automatically creates new `ProductBatch` records with expiry dates and increments branch stock.
- **Testing Requirements**: End-to-end integration test from PO creation -> Approval -> GRN -> Batch stock verification.
- **Completion Criteria**: GRN receipt immediately reflects in FEFO available inventory.

---

### Phase 7: Point of Sale (POS) Engine & Cash Management
- **Objectives**: Build the high-throughput in-store POS backend: register sessions, cash drawer opening/closing, fast barcode checkout, split tender payments, and offline receipt sync.
- **Modules / Targets**: `PosModule`, `PaymentsModule`, `SalesModule`.
- **Dependencies**: Phase 5, Phase 6.
- **Deliverables**:
  - POS session endpoints tracking cash float, expected cash, and variance.
  - Sub-second checkout endpoint with FEFO batch allocation and receipt generation.
  - Offline sync endpoint handling batched transactions.
- **Testing Requirements**: Load testing checkout endpoint (100 req/sec); race condition testing on register cash balance.
- **Completion Criteria**: POS checkout completes in <100ms with verified transactional consistency.

---

### Phase 8: E-Commerce Orders & Bangladesh Payment Integrations
- **Objectives**: Build the online customer order pipeline, delivery zone mapping, and payment gateway adapters for bKash Tokenized checkout, Nagad, and SSLCommerz.
- **Modules / Targets**: `OrdersModule`, `PaymentsModule`, `NotificationsModule`.
- **Dependencies**: Phase 5, Phase 7.
- **Deliverables**:
  - Multi-step order placement with stock reservation.
  - bKash direct debit integration with HMAC webhook validation.
  - BullMQ notification queue dispatching transactional SMS upon order status updates.
- **Testing Requirements**: Mocked payment webhook tests with signature tampering checks; idempotency replay tests.
- **Completion Criteria**: Safe payment state transitions; zero duplicate order placements under network retries.

---

### Phase 9: Shared UI Library (`packages/ui`) & Design Tokens
- **Objectives**: Implement the ECOBAZAR design system: color palette, typography tokens, Radix UI wrappers, responsive grid, and bilingual text components.
- **Modules / Targets**: `packages/ui`, `packages/config/tailwind`.
- **Dependencies**: Phase 1, Phase 3.
- **Deliverables**:
  - Storybook or component showcase for Button, Dialog, Input, Table, ExpiryIndicator, PriceTag.
  - Tailwind CSS plugin exporting ECOBAZAR brand colors (`#123C2D`, `#21A366`, `#D8F3DC`, `#F4A340`).
- **Testing Requirements**: Visual regression tests; accessibility compliance tests (axe-core) ensuring WCAG 2.1 AA.
- **Completion Criteria**: All components render cleanly with zero accessibility violations.

---

### Phase 10: Admin Dashboard & POS Web App (`apps/admin`)
- **Objectives**: Build the enterprise Next.js back-office dashboard and the in-store POS interface.
- **Modules / Targets**: `apps/admin` (Next.js 14+).
- **Dependencies**: Phase 4, Phase 5, Phase 6, Phase 7, Phase 9.
- **Deliverables**:
  - Super Admin analytics, global catalog management, and branch switcher.
  - Branch Manager dashboard for local inventory, GRN receiving, and staff oversight.
  - Dedicated full-screen POS mode with keyboard hotkeys, barcode scanner listener, and receipt preview.
- **Testing Requirements**: Playwright E2E test simulating a cashier logging in, scanning 3 items, tendering cash, and completing sale.
- **Completion Criteria**: POS interface operational via keyboard-only workflow.

---

### Phase 11: Customer E-Commerce Website (`apps/web`)
- **Objectives**: Build the consumer grocery shopping website with Next.js App Router (SSR/ISR for SEO), instant search, branch geolocation selector, cart drawer, and bKash checkout.
- **Modules / Targets**: `apps/web`.
- **Dependencies**: Phase 5, Phase 8, Phase 9.
- **Deliverables**:
  - High-performance bilingual homepage and category taxonomy pages.
  - Product detail pages with freshness and batch expiry transparency.
  - One-page mobile-friendly checkout flow.
- **Testing Requirements**: Lighthouse performance score >90; Core Web Vitals audit; end-to-end checkout flow test.
- **Completion Criteria**: Sub-second page loads; completed order placement flow with payment gateway redirect.

---

### Phase 12: Mobile Application (`apps/mobile`)
- **Objectives**: Build the React Native Expo app targeting Android and iOS with Customer, Picker, and Rider interfaces.
- **Modules / Targets**: `apps/mobile`.
- **Dependencies**: Phase 4, Phase 5, Phase 8, Phase 9.
- **Deliverables**:
  - Customer shopping experience with push notifications and loyalty barcode.
  - Staff barcode scanner mode for picking warehouse items.
  - Delivery rider task screen with status updates and OTP verification.
- **Testing Requirements**: Jest component tests; Expo EAS preview builds tested on physical Android and iOS devices.
- **Completion Criteria**: Functional APK build verified on real hardware.

---

### Phase 13: Marketing, Analytics & AI Business Intelligence
- **Objectives**: Implement coupon engines, loyalty points calculation, BI sales velocity rollups, and integrate Google Gemini / OpenAI via secure backend proxy.
- **Modules / Targets**: `MarketingModule`, `AnalyticsModule`, `AIService`.
- **Dependencies**: Phase 5, Phase 7, Phase 8, Phase 10.
- **Deliverables**:
  - Automated demand forecasting by branch based on 30-day sales velocity.
  - Near-expiry clearance markdown advisor.
  - Natural language grocery search assistant.
- **Testing Requirements**: Unit tests for coupon discount limits and loyalty point accrual; mock tests for AI prompt sanitization.
- **Completion Criteria**: Accurate BI reporting; safe LLM output parsing without hallucination crashes.

---

### Phase 14: Quality Assurance, Security Hardening & End-to-End Verification
- **Objectives**: Comprehensive cross-app validation, penetration testing, load testing, and security audits.
- **Modules / Targets**: `tests/e2e`, All apps and packages.
- **Dependencies**: Phases 1–13.
- **Deliverables**:
  - Full suite of Playwright end-to-end tests covering all user journeys.
  - Locust / k6 load test scripts demonstrating 1,000 concurrent active users.
  - OWASP Top 10 security audit verification report.
- **Testing Requirements**: Zero high or critical vulnerabilities; all E2E pipelines pass on CI.
- **Completion Criteria**: Formal sign-off on performance, security, and data integrity.

---

### Phase 15: Production Deployment & Operational Launch
- **Objectives**: Configure production Docker images, CI/CD pipelines, database backup strategies, monitoring (Prometheus/Grafana), and edge CDN caching.
- **Modules / Targets**: `infrastructure/*`, `.github/workflows/*`.
- **Dependencies**: Phase 14.
- **Deliverables**:
  - Hardened multi-stage Dockerfiles.
  - Automated deployment workflows.
  - Health check probes and automated PostgreSQL backup cron tasks.
- **Testing Requirements**: Disaster recovery rollback drill; live staging verification.
- **Completion Criteria**: System running in production with zero errors and real-time monitoring active.
