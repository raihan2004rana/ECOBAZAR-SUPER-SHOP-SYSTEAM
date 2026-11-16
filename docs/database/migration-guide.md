# ECOBAZAR — Database Migration Guide

## 1. Overview

Database schema changes in ECOBAZAR are managed strictly through **Prisma Migrate** to ensure deterministic, version-controlled database schema evolution.

All migrations reside in:
```
packages/database/prisma/migrations/
```

---

## 2. Initial Migration

The foundation schema migration is located at:
```
packages/database/prisma/migrations/20261116000000_init_foundation/migration.sql
```

This migration establishes the multi-tenant core tables:
- `organizations`, `branches`, `warehouses`
- `users`, `sessions`
- `roles`, `permissions`, `role_permissions`, `user_roles`
- `audit_logs`

---

## 3. Migration Commands

### 3.1. Local Development Migration
When you have a local PostgreSQL instance running (or connected via Docker/Cloud):

```bash
# Apply pending migrations and generate Prisma client
pnpm --filter @ecobazar/database db:migrate:dev

# Or directly using Prisma
pnpm --filter @ecobazar/database exec prisma migrate dev --name <migration_name>
```

### 3.2. Production Deployment Migration
In production or CI/CD pipelines, never use `migrate dev`. Use `migrate deploy` to execute verified SQL scripts without schema drift prompts:

```bash
pnpm --filter @ecobazar/database db:migrate:deploy
```

### 3.3. Offline Schema Verification & SQL Diff Generation
To generate pure SQL scripts from schema diffs without connecting to a live database:

```bash
pnpm --filter @ecobazar/database exec prisma migrate diff \
  --from-empty \
  --to-schema-datamodel packages/database/prisma/schema.prisma \
  --script
```

---

## 4. Prisma Client Generation

Whenever `schema.prisma` is updated, the type-safe client must be regenerated:

```bash
pnpm --filter @ecobazar/database db:generate
```

This updates `@prisma/client` across all apps and packages in the monorepo.

---

## 5. Migration Best Practices for Omnichannel Retail

1. **Zero Data Loss on Deletion**:
   - Foreign keys to `organizations` and `branches` must use `ON DELETE RESTRICT`. Never use cascading deletes on organizational units as this could erase historical sales and tax records.
2. **Monetary Safety**:
   - Always verify that price, cost, and discount columns are defined as `DECIMAL(12, 2)` or `DECIMAL(14, 4)`.
3. **Index Review**:
   - Any column frequently queried in POS lookups or multi-branch filters (e.g. `organization_id`, `branch_id`, `phone`, `barcode`) must have explicit B-tree indexes defined in the schema.
