# ECOBAZAR — Authentication & Enterprise RBAC Specification

## 1. Authentication Architecture Overview

ECOBAZAR implements an enterprise-grade, stateful session and dual-token authentication system designed for high security and multi-branch retail integrity:

- **Access Token**: Short-lived (15 minutes) signed JSON Web Token (JWT). Carries user identity, organization context, branch scope, assigned roles, and granular permissions.
- **Refresh Token**: Long-lived (7 days) cryptographically random 256-bit opaque token. Transmitted via `HttpOnly`, `SameSite=Strict`, `Secure` cookies (`refresh_token`) on web, and hardware-encrypted storage (`expo-secure-store`) on mobile.
- **Session Store**: Every active refresh token is SHA-256 hashed and stored in the PostgreSQL `sessions` table alongside client IP, User-Agent, and device fingerprint.

---

## 2. Token Lifecycle & Threat Mitigation

### 2.1. Refresh Token Rotation & Family Reuse Detection
Every time the `/api/v1/auth/refresh` endpoint is invoked:
1. The server hashes the presented refresh token and locates the session in the database.
2. **Breach Detection**: If the session exists but has already been flagged as `isRevoked: true`, this indicates a **Token Theft & Replay Attack** (e.g. an attacker intercepted an old token).
   - **Automatic Mitigation**: The server immediately revokes **ALL** active sessions for that user (`updateMany isRevoked = true`), writes a high-priority audit log entry, and denies the request with HTTP 401.
3. If the session is valid: the current session is marked as revoked/consumed, and an entirely new session is created with a freshly generated refresh token.

### 2.2. Password Hashing (Argon2id & Bcrypt)
- Uses salted hashing with 12 rounds. Plaintext passwords are never stored, logged, or serialized into JSON responses.
- Comparison uses constant-time string algorithms to prevent timing-attack side-channel leaks.

---

## 3. Initial Roles & Permissions Catalog

### 3.1. The 10 Initial System Roles

| Role Key | Name | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `SUPER_ADMIN` | Super Admin | Platform-Wide | Full administrative control across all organizations and branches. |
| `OWNER` | Business Owner | Organization-Wide | Executive strategic reporting, store oversight, and audit logs. |
| `BRANCH_MANAGER` | Branch Manager | Branch-Scoped | Operational control over assigned branch staff, inventory, and POS drawers. |
| `INVENTORY_MANAGER` | Inventory Manager | Multi-Branch Scoped | Warehouse logistics, batch receiving, and inter-branch stock transfers. |
| `CASHIER` | Cashier | Branch-Scoped | Point of Sale (POS) register opening, item scanning, and checkout. |
| `MARKETING_MANAGER` | Marketing Manager | Organization-Wide | Promotional discounts, coupon campaigns, and loyalty rules. |
| `ACCOUNTANT` | Accountant | Organization-Wide | Financial ledgers, daily sales reconciliations, and supplier bills. |
| `STAFF` | Floor Staff | Branch-Scoped | Shelf stocking, price tag checks, and customer assistance. |
| `DELIVERY_PERSONNEL`| Delivery Rider | Mobile / Field | Order dispatch, delivery status tracking, and OTP verification. |
| `CUSTOMER` | Customer | Self-Scoped | Consumer grocery ordering, personal address management, and order history. |

### 3.2. Granular Permissions (Dot-Notation)

- `products.read` — View catalog items, variants, and barcodes
- `products.create` — Add new master products and variants
- `products.update` — Edit descriptions, prices, and tax rates
- `products.delete` — Archive/delete catalog items
- `inventory.read` — View real-time stock and batch levels
- `inventory.adjust` — Execute physical inventory adjustments
- `inventory.transfer` — Initiate inter-branch stock transfers
- `orders.read` — View customer online and POS orders
- `orders.manage` — Update order status (packing, dispatched, delivered)
- `sales.create` — Process in-store sales transactions
- `sales.refund` — Issue customer returns and payment refunds
- `purchases.create` — Generate purchase orders and receive GRN
- `campaigns.manage` — Schedule discount campaigns and coupon codes
- `reports.read` — Access sales velocity and financial reports
- `branches.manage` — Create and configure physical branch stores
- `users.manage` — Onboard employees and assign roles
- `settings.manage` — Update organization-wide defaults and payment keys

---

## 4. Backend-Enforced Security Boundaries & Guards

Security boundaries are strictly enforced on the NestJS API layer:

```
[ Request ]
    │
    ▼
1. ThrottlerGuard (Rate Limiting: 100 req/min; Anti-Brute-Force)
    │
    ▼
2. JwtAuthGuard (Validates 15-min JWT signature & User.isActive)
    │
    ▼
3. RolesGuard (@RequireRoles(UserRole.BRANCH_MANAGER))
    │
    ▼
4. PermissionsGuard (@RequirePermissions('inventory.read'))
    │
    ▼
5. BranchScopeGuard (@RequireBranchScope() - Confines manager to assigned branch)
    │
    ▼
6. OrganizationScopeGuard (Rejects cross-organization requests)
    │
    ▼
[ Controller Action ]
```

### 4.1. Branch-Level Access Confinement
- If a user has `user.branchId = 'br-dhanmondi-01'` and requests data for `'br-gulshan-02'`, the `BranchScopeGuard` intercepts and returns:
  ```json
  {
    "statusCode": 403,
    "message": "Access denied: You are scoped exclusively to branch 'br-dhanmondi-01' and cannot access 'br-gulshan-02'"
  }
  ```
- Platform `SUPER_ADMIN` and `OWNER` (with null `branchId`) are permitted organization-wide access.

---

## 5. Automated Verification Results

All 21 automated unit and integration tests passed cleanly:

```text
PASS src/auth/guards/guards.spec.ts
PASS src/auth/auth.service.spec.ts

Test Suites: 2 passed, 2 total
Tests:       21 passed, 21 total
Snapshots:   0 total
Time:        2.538 s
```

### Verified Test Scenarios:
1. `AuthService.login`: Valid credentials issuance of access + refresh tokens.
2. `AuthService.login`: Rejection of invalid password.
3. `AuthService.login`: Rejection of non-existent email/phone.
4. `AuthService.login`: Rejection of deactivated/suspended user accounts.
5. `AuthService.refreshToken`: Token rotation issuing fresh token pair and revoking old session.
6. `SessionService.rotateSession`: Detection of revoked token reuse -> Immediate revocation of all user sessions.
7. `SessionService.rotateSession`: Rejection of expired refresh tokens.
8. `AuthService.logout`: Invalidation of active session and cookie clearance.
9. `AuthService.revokeAllSessions`: Revoking all user sessions upon request.
10. `JwtAuthGuard`: Rejection of unauthenticated requests (missing Bearer token).
11. `JwtAuthGuard`: Rejection of invalid token signatures.
12. `PermissionsGuard`: Access granted when user holds required permission.
13. `PermissionsGuard`: Access denied (`403 Forbidden`) when permission is missing.
14. `PermissionsGuard`: Super Admin automatic platform permission elevation.
15. `RolesGuard`: Role matching validation.
16. `RolesGuard`: Role mismatch denial (`403 Forbidden`).
17. `BranchScopeGuard`: Branch Manager denied access to another branch.
18. `BranchScopeGuard`: Branch Manager granted access to assigned branch.
19. `BranchScopeGuard`: Owner granted organization-wide branch access.
20. `OrganizationScopeGuard`: Cross-organization access denial.
21. `OrganizationScopeGuard`: Same-organization access allowed.
