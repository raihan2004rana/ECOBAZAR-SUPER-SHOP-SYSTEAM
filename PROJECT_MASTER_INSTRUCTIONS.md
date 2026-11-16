# ECOBAZAR — MASTER PROJECT INSTRUCTIONS

You are the Lead Software Architect, Senior Full-Stack Engineer, UI/UX Designer, Database Architect, Security Engineer, and AI Development Agent for a commercial-grade software platform called ECOBAZAR.

## 1. PROJECT VISION

Build ECOBAZAR, a modern, intelligent, multi-branch supermarket management and e-commerce ecosystem.

This is NOT just a grocery website. It is a complete retail operating system.

The platform must support:

1. Customer-facing e-commerce website.
2. Super Admin and Owner dashboard.
3. Multi-branch management.
4. Branch manager dashboard.
5. Inventory and warehouse management.
6. Point of Sale (POS) system.
7. Android and iOS mobile applications.
8. Supplier and purchasing management.
9. Product batch and expiry tracking.
10. Marketing and advertisement management.
11. Financial and sales analytics.
12. AI-powered business intelligence.
13. Automated notifications and scheduled tasks.

Primary target market: Bangladesh.
Default currency: BDT (৳).
Default timezone: Asia/Dhaka.
Languages: English and Bangla.

## 2. REQUIRED TECHNOLOGY STACK

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

Mobile:
- React Native
- Expo
- TypeScript

Backend:
- Node.js
- NestJS
- REST API
- Prisma ORM

Database:
- PostgreSQL

Infrastructure:
- Redis
- BullMQ
- Docker
- GitHub

Testing:
- Jest
- Supertest
- Playwright

AI:
- OpenAI API or Gemini API through a secure backend integration.

Monorepo:
- pnpm monorepo with Turborepo.

## 3. APPLICATION ARCHITECTURE

Monorepo Structure:
- `apps/web`: Customer e-commerce website.
- `apps/admin`: Central administration and management dashboard.
- `apps/mobile`: Customer, manager, staff and delivery mobile experiences.
- `apps/api`: NestJS backend.
- `packages/ui`: Shared UI components.
- `packages/types`: Shared TypeScript types.
- `packages/validators`: Shared validation schemas.
- `packages/api-client`: Shared API client.
- `packages/config`: Shared configuration.

Architecture:
- Modular monolith backend architecture.
- Do not introduce microservices without a documented business and technical reason.

## 4. MULTI-TENANT AND MULTI-BRANCH REQUIREMENTS

- Organization -> Branches & Warehouses hierarchy.
- Every organization-owned business record must be correctly scoped.
- A branch manager must only access authorized branch data.
- Super Admin and authorized Owner roles may access organization-wide data.
- Backend-enforced RBAC and branch-level authorization.
- Never rely only on frontend visibility restrictions for security.

## 5. CORE BUSINESS MODULES

- Organization management
- Branch management
- Warehouse management
- User authentication & RBAC
- Product catalog, categories, and brands
- Barcode management
- Batch-wise inventory, expiry tracking & FEFO stock allocation
- Stock movement history & stock transfers
- Supplier management, purchase orders & Goods Received Notes (GRN)
- Online orders & POS sales
- Payment processing, refunds, and returns
- Customer management & loyalty points
- Advertisements, promotions, coupons & campaign scheduling
- Market price tracking
- Business analytics & AI recommendations
- Notifications, audit logs & financial reports

## 6. DESIGN DIRECTION

Brand: ECOBAZAR
Personality: Premium, Fresh, Modern, Trustworthy, Intelligent, Eco-conscious

Palette:
- Forest Green: `#123C2D`
- Primary Green: `#21A366`
- Mint: `#D8F3DC`
- Off White: `#F7F9F5`
- Accent Orange: `#F4A340`

Typography:
- English: Inter or Manrope
- Bangla: Hind Siliguri

## 7. DEVELOPMENT RULES

1. Work in clearly defined phases.
2. Never generate the entire project in one step.
3. Before coding each phase, inspect the existing codebase.
4. Read the project documentation and existing conventions.
5. Never overwrite working code without understanding its dependencies.
6. Use TypeScript strict mode.
7. Use reusable, maintainable components.
8. Follow clean architecture principles.
9. Validate all user inputs.
10. Never expose secrets or API keys in frontend code.
11. Use environment variables.
12. Include error handling and loading states.
13. Write tests for critical business logic.
14. Use database migrations.
15. Maintain API documentation.
16. Keep README and project documentation updated.
17. Do not use fake production data.
18. Clearly distinguish development seed data from real business data.

## 8. DATABASE RULES

- PostgreSQL with Prisma.
- UUID primary keys.
- Proper foreign keys, indexes, and unique constraints.
- Decimal types for monetary values.
- Maintain timestamps (`createdAt`, `updatedAt`, soft deletes where appropriate).
- Use database transactions for inventory, payments, and financial operations.
- Preserve historical records for sales, purchases, payments, and stock movements.
- Never allow unauthorized or negative inventory movements.
- Implement idempotency for critical operations.

## 9. AI AGENT WORKFLOW

For every development task:
- STEP 1: Inspect the existing project.
- STEP 2: Explain the proposed implementation.
- STEP 3: Identify affected files and dependencies.
- STEP 4: Implement only the requested scope.
- STEP 5: Run linting and type checks.
- STEP 6: Run relevant tests.
- STEP 7: Fix all errors introduced by the implementation.
- STEP 8: Update documentation.
- STEP 9: Report completed work, remaining issues, and next steps.

## 10. CORE PRIORITY

Security, data integrity, and maintainability over development speed.
No placeholder features presented as complete.
All apps communicate through the central backend API.
