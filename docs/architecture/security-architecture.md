# ECOBAZAR — Security Architecture Specification

## 1. Threat Model & Security Principles

ECOBAZAR processes high-volume retail transactions, financial ledger movements, customer personal information, and sensitive multi-branch inventory metrics. The security posture adheres to **Defense in Depth**, the **Principle of Least Privilege**, and strict **Zero-Trust Multi-Tenancy**.

---

## 2. Authentication Architecture

### 2.1. Dual-Token Architecture
```
+--------------------+               +------------------+
|    Client App      |               |     Auth API     |
+--------------------+               +------------------+
          │                                   │
          │   1. POST /api/v1/auth/login      │
          │──────────────────────────────────>│
          │                                   │ (Validate Argon2id Hash)
          │                                   │ (Create Session in DB)
          │   2. Return Access Token (JSON)   │
          │      & Set Refresh Token (Cookie) │
          │<──────────────────────────────────│
          │                                   │
          │   3. Subsequent Requests          │
          │      Authorization: Bearer <JWT>  │
          │──────────────────────────────────>│ (Validate JWT signature & expiry)
          │                                   │
          │   4. When Access Token Expires    │
          │      POST /api/v1/auth/refresh    │
          │      (Cookie: refresh_token)      │
          │──────────────────────────────────>│ (Rotate Refresh Token)
          │   5. Issue New Access + Refresh   │ (Detect Family Reuse)
          │<──────────────────────────────────│
```

1. **Access Token (JWT)**:
   - **Lifespan**: 15 minutes.
   - **Signing Algorithm**: RS256 (Asymmetric key pair) or HS256 with 512-bit cryptographically secure secret.
   - **Payload**:
     ```json
     {
       "sub": "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
       "orgId": "org_5c4b8b6f-1234-4567-89ab-cdef01234567",
       "branchId": "br_7e9a1b2c-3d4e-5f6a-7b8c-9d0e1f2a3b4c",
       "roles": ["BRANCH_MANAGER"],
       "permissions": ["inventory:read", "inventory:write", "pos:session"],
       "sessionId": "ses_0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
       "iat": 1731758400,
       "exp": 1731759300
     }
     ```
   - **Storage**: Client memory (React state / Zustand). Never written to `localStorage`.

2. **Refresh Token**:
   - **Lifespan**: 7 days (Admin/POS staff) to 30 days (Mobile customer).
   - **Format**: Cryptographically random 256-bit token (UUID v4 + SHA-256 hash stored in DB).
   - **Transmission**: Sent exclusively via `HttpOnly`, `Secure`, `SameSite=Strict` cookie (`__Host-ecobazar-refresh`).
   - **Storage**: Stored hashed in the `sessions` table.

3. **Refresh Token Rotation & Reuse Detection**:
   - Every time a refresh token is used, it is invalidated and replaced with a new token within the same token family.
   - **Family Breach Detection**: If an already invalidated refresh token is presented, the system flags a token theft attempt, immediately revokes the entire token family, invalidates all sessions for that user, and emits a high-priority security alert.

### 2.2. Password Hashing
- **Algorithm**: `Argon2id` (Winner of the Password Hashing Competition).
- **Parameters**: Memory: 64 MB (`m=65536`), Iterations: 3 (`t=3`), Parallelism: 4 (`p=4`).
- **Pepper**: Secret environment pepper applied to passwords before hashing to protect against offline dictionary attacks even if the database is dumped.

---

## 3. Authorization & Multi-Branch Scoping

### 3.1. Role-Based Access Control (RBAC) Hierarchy

```
[ SUPER_ADMIN / OWNER ]
         │ (Global Org Visibility)
         ▼
[ REGIONAL_DIRECTOR ]
         │ (Multiple Branch Grouping)
         ▼
[ BRANCH_MANAGER ]
         │ (Single Branch Scoped)
    ┌────┴──────────────────────────┐
    ▼                               ▼
[ CASHIER / POS_STAFF ]    [ WAREHOUSE_STAFF / PICKER ]
    │                               │
    ▼                               ▼
(Drawer & Checkout)        (Bin & GRN Logistics)

[ CUSTOMER ]
(Self-scoped shopping, orders, and addresses)
```

### 3.2. Granular Permissions Matrix

| Permission Key | Description | Super Admin | Branch Manager | Cashier | Warehouse Staff | Customer |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `org:manage` | Manage org settings & branches | Yes | No | No | No | No |
| `users:manage` | Create & assign staff | Yes | Branch Only | No | No | No |
| `catalog:write` | Create & update products | Yes | No | No | No | No |
| `inventory:read` | View stock & batches | All Branches | Assigned Branch | Assigned Branch | Assigned Branch | Stock Only |
| `inventory:write`| Adjust stock & FEFO | All Branches | Assigned Branch | No | Assigned Branch | No |
| `purchasing:po` | Create purchase orders | Yes | Assigned Branch | No | No | No |
| `purchasing:grn`| Receive stock & batches | Yes | Assigned Branch | No | Assigned Branch | No |
| `pos:operate` | Open/close registers & sell | Yes | Assigned Branch | Assigned Branch | No | No |
| `reports:finance`| View revenue & margins | All Branches | Assigned Branch | No | No | No |
| `orders:customer`| Place & view personal orders | No | No | No | No | Self Only |

### 3.3. Backend-Enforced Branch-Level Isolation
Security must never depend on frontend UI conditionals. Multi-branch isolation is enforced in NestJS via:

1. **`ExecutionContext` AsyncLocalStorage**:
   - The `JwtAuthGuard` extracts the user's `orgId`, `branchId`, and `roles`.
   - The user context is bound to the async request execution context.

2. **Prisma Query-Level Scoping Extension**:
   - A Prisma client extension automatically injects `organizationId` and `branchId` filters into all `findMany`, `findFirst`, `update`, and `delete` calls unless the user holds the `SUPER_ADMIN` role.
   - Example query enforcement:
     ```typescript
     // Even if an attacker requests /api/v1/inventory?branchId=OTHER_BRANCH
     // The BranchScopeGuard intercepts and rejects with 403 Forbidden.
     ```

---

## 4. API & Network Security

### 4.1. Rate Limiting Strategy (Redis Throttler)
- **Public Endpoints** (`/api/v1/auth/login`, `/api/v1/auth/otp/send`):
  - 5 requests per minute per IP.
  - Progressive backoff with 15-minute lockouts upon repeated failed authentication attempts.
- **POS Checkouts** (`/api/v1/pos/checkout`):
  - High burst allowance: 120 requests per minute per authorized register session.
- **Storefront Browsing** (`/api/v1/products`, `/api/v1/categories`):
  - 300 requests per minute per IP.

### 4.2. HTTP Security Headers (Helmet)
- `Content-Security-Policy`: Restricts script, frame, and connect sources.
- `Strict-Transport-Security` (HSTS): `max-age=63072000; includeSubDomains; preload`.
- `X-Content-Type-Options`: `nosniff`.
- `X-Frame-Options`: `DENY`.
- `Referrer-Policy`: `strict-origin-when-cross-origin`.

### 4.3. Cross-Origin Resource Sharing (CORS)
- Strict origin whitelist:
  - Production Web: `https://ecobazar.com.bd`
  - Production Admin: `https://admin.ecobazar.com.bd`
  - Mobile: Origin headers verified against internal API secret signatures.

---

## 5. Payment Security & Fraud Prevention

### 5.1. Webhook Signature Verification
- Inbound webhooks from bKash, Nagad, and SSLCommerz must pass cryptographic HMAC-SHA256 signature verification using the gateway's shared secret before processing.
- IP filtering: Reject webhooks originating outside verified payment provider gateway CIDR blocks.

### 5.2. Idempotency Keys
- All payment creation and checkout endpoints require a unique `X-Idempotency-Key` header (UUID v4).
- The key is cached in Redis with a 120-second lease:
  - If a duplicate request arrives while the original is in flight, the second request receives HTTP 409 Conflict.
  - If the original request finished, the cached response is replayed without re-executing transactions or re-deducting stock.

### 5.3. Zero Cardholder Data (PCI-DSS Compliance)
- ECOBAZAR never collects, stores, or processes Primary Account Numbers (PAN), CVVs, or card PINs.
- All digital payments use hosted checkout redirects or iframe tokenization provided directly by licensed payment aggregators.

---

## 6. Audit Logging & Non-Repudiation

Every state-mutating operation (Create, Update, Delete, Stock Adjustment, Cash Drawer Reconciliation) writes an immutable record to the `audit_logs` table:
- **Actor Metadata**: `user_id`, `role`, `impersonated_by` (if support action), `ip_address`, `user_agent`.
- **Tenant Context**: `organization_id`, `branch_id`.
- **Action Details**: `action` (e.g. `INVENTORY_MANUAL_ADJUSTMENT`), `resource_type` (e.g. `product_batches`), `resource_id`.
- **Change Snapshot**: `before_state` (JSONB) and `after_state` (JSONB) storing precise field diffs.
- **Tamper Protection**: Audit records have no `UPDATE` or `DELETE` API endpoints or Prisma hooks. They are append-only.
