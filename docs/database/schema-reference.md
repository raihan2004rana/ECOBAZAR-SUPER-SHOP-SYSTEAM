# ECOBAZAR — Database Schema Reference (Foundation Layer)

## 1. Foundation Architecture Overview

The ECOBAZAR foundation database layer is built on **PostgreSQL 16+** using **Prisma ORM**. It establishes the core multi-tenant hierarchy, identity access management, role-based authorization, session security, and immutable audit logging.

All subsequent retail domains (Product Catalog, FEFO Inventory, Suppliers & Purchasing, Point of Sale, and E-commerce Orders) hook directly into these core tables.

---

## 2. Multi-Tenancy Scoping Model

```
                     ┌──────────────────┐
                     │   Organization   │  (Tenant Root)
                     └────────┬─────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
    ┌──────────┐        ┌──────────┐        ┌──────────┐
    │  Branch  │        │Warehouse │        │   Role   │
    └────┬─────┘        └──────────┘        └────┬─────┘
         │                                       │
         ▼                                       ▼
    ┌──────────┐                            ┌──────────┐
    │   User   │ ◄───────────────────────── │ UserRole │
    └────┬─────┘                            └──────────┘
         │
    ┌────┴──────────────┐
    ▼                   ▼
┌─────────┐       ┌──────────┐
│ Session │       │ AuditLog │
└─────────┘       └──────────┘
```

1. **Organization Isolation**: Every business entity holds a foreign key to `organization_id`. Cross-organization access is blocked at the database level by foreign key constraints and application-level scoping.
2. **Branch Scoping**:
   - `User.branch_id` is nullable.
   - When `NULL`, the user operates with organization-wide privileges (e.g. `SUPER_ADMIN`, `OWNER`).
   - When populated with a specific `branch_id`, the user's data visibility and actions (e.g. `BRANCH_MANAGER`, `CASHIER`) are constrained to that branch.
3. **Immutability & Integrity**: Deletion of organizations and branches is set to `ON DELETE RESTRICT` to protect financial, inventory, and audit histories from accidental deletion.

---

## 3. Data Dictionary

### 3.1. `organizations`
Primary tenant root representing the supermarket operating company.

| Column | Type | Nullable | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `name` | VARCHAR(150) | No | | Registered enterprise name |
| `slug` | VARCHAR(100) | No | | Unique URL/tenant identifier |
| `logo_url` | TEXT | Yes | | S3/CDN hosted logo URL |
| `trade_license`| VARCHAR(100) | Yes | | Bangladesh trade license number |
| `tax_number` | VARCHAR(100) | Yes | | Tax Identification Number (TIN) |
| `default_currency`| VARCHAR(10) | No | `'BDT'` | Standard currency code |
| `default_timezone`| VARCHAR(50) | No | `'Asia/Dhaka'` | Operating timezone |
| `is_active` | BOOLEAN | No | `true` | Organization operational status |
| `created_at` | TIMESTAMPTZ | No | `now()` | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | auto | Last update timestamp |

**Indexes & Constraints:**
- `UNIQUE("slug")`

---

### 3.2. `branches`
Physical supermarket store locations hosting POS terminals and local stock.

| Column | Type | Nullable | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `organization_id`| UUID | No | | FK -> `organizations.id` (RESTRICT) |
| `name` | VARCHAR(150) | No | | Branch name (e.g. "Dhanmondi Branch #01") |
| `code` | VARCHAR(20) | No | | Short code (e.g. "ECO-DHK-01") |
| `address_line1` | VARCHAR(255) | No | | Primary street address |
| `address_line2` | VARCHAR(255) | Yes | | Secondary address details |
| `city` | VARCHAR(100) | No | | City name (e.g. "Dhaka") |
| `division` | VARCHAR(100) | No | | Division (e.g. "Dhaka", "Chittagong") |
| `postal_code` | VARCHAR(20) | Yes | | Postal zip code |
| `latitude` | DECIMAL(10, 8)| Yes | | GPS coordinate for delivery geo-fencing |
| `longitude` | DECIMAL(11, 8)| Yes | | GPS coordinate for delivery geo-fencing |
| `phone` | VARCHAR(30) | No | | Branch contact telephone |
| `email` | VARCHAR(150) | Yes | | Branch email address |
| `is_main_branch`| BOOLEAN | No | `false` | Flag for flagship/headquarters store |
| `is_active` | BOOLEAN | No | `true` | Branch operational status |
| `created_at` | TIMESTAMPTZ | No | `now()` | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | auto | Last update timestamp |

**Indexes & Constraints:**
- `UNIQUE("organization_id", "code")`
- `INDEX("organization_id", "is_active")`
- `INDEX("city", "division")`

---

### 3.3. `warehouses`
Central and regional distribution centers for bulk inventory storage.

| Column | Type | Nullable | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `organization_id`| UUID | No | | FK -> `organizations.id` (RESTRICT) |
| `name` | VARCHAR(150) | No | | Warehouse name |
| `code` | VARCHAR(20) | No | | Warehouse code (e.g. "WH-TEJ-01") |
| `address` | TEXT | No | | Physical location |
| `contact_person` | VARCHAR(100) | Yes | | Warehouse in-charge supervisor |
| `contact_phone` | VARCHAR(30) | Yes | | Supervisor contact phone |
| `capacity_sqft` | DECIMAL(10, 2)| Yes | | Floor area capacity |
| `is_active` | BOOLEAN | No | `true` | Operational status |
| `created_at` | TIMESTAMPTZ | No | `now()` | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | auto | Last update timestamp |

**Indexes & Constraints:**
- `UNIQUE("organization_id", "code")`
- `INDEX("organization_id", "is_active")`

---

### 3.4. `users`
System accounts for administrators, managers, cashiers, and warehouse pickers.

| Column | Type | Nullable | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `organization_id`| UUID | No | | FK -> `organizations.id` (RESTRICT) |
| `branch_id` | UUID | Yes | `NULL` | FK -> `branches.id` (SET NULL) |
| `email` | VARCHAR(255) | No | | Unique login email |
| `phone` | VARCHAR(30) | No | | Unique Bangladesh phone number |
| `password_hash` | VARCHAR(255) | No | | Argon2id password hash |
| `first_name` | VARCHAR(100) | No | | User given name |
| `last_name` | VARCHAR(100) | No | | User surname |
| `avatar_url` | TEXT | Yes | | Profile picture URL |
| `is_active` | BOOLEAN | No | `true` | Account active flag |
| `last_login_at` | TIMESTAMPTZ | Yes | | Last successful login |
| `created_at` | TIMESTAMPTZ | No | `now()` | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | auto | Last update timestamp |

**Indexes & Constraints:**
- `UNIQUE("email")`
- `UNIQUE("phone")`
- `INDEX("organization_id", "branch_id")`
- `INDEX("phone")`
- `INDEX("is_active")`

---

### 3.5. `roles` & `permissions`
Granular Role-Based Access Control (RBAC).

#### `roles`
| Column | Type | Nullable | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `organization_id`| UUID | No | | FK -> `organizations.id` (RESTRICT) |
| `name` | VARCHAR(50) | No | | Role identifier (`SUPER_ADMIN`, `CASHIER`) |
| `description` | TEXT | Yes | | Purpose of this role |
| `is_system` | BOOLEAN | No | `false` | System protected role flag |
| `created_at` | TIMESTAMPTZ | No | `now()` | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | No | auto | Last update timestamp |

**Constraints:** `UNIQUE("organization_id", "name")`

#### `permissions`
| Column | Type | Nullable | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `code` | VARCHAR(100) | No | | Unique action code (e.g. `pos:checkout`) |
| `name` | VARCHAR(150) | No | | Human readable permission label |
| `category` | VARCHAR(50) | No | | Grouping (`POS`, `Inventory`, etc.) |
| `description` | TEXT | Yes | | Permission scope description |
| `created_at` | TIMESTAMPTZ | No | `now()` | Creation timestamp |

**Constraints:** `UNIQUE("code")`, `INDEX("category")`

#### Join Tables:
- **`role_permissions`**: `PRIMARY KEY (role_id, permission_id)`, cascading deletes on role/permission removal.
- **`user_roles`**: `PRIMARY KEY (user_id, role_id)`, cascading deletes on user/role removal.

---

### 3.6. `sessions`
Secure refresh token storage with device fingerprinting and family revocation tracking.

| Column | Type | Nullable | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `user_id` | UUID | No | | FK -> `users.id` (CASCADE) |
| `refresh_token_hash`| VARCHAR(255)| No | | SHA-256 hashed refresh token |
| `ip_address` | VARCHAR(45) | Yes | | Client IPv4 / IPv6 address |
| `user_agent` | TEXT | Yes | | Browser / Device user agent |
| `device_fingerprint`| VARCHAR(255)| Yes | | Hardware/Client fingerprint |
| `is_revoked` | BOOLEAN | No | `false` | Explicit revocation flag |
| `expires_at` | TIMESTAMPTZ | No | | Expiration timestamp |
| `created_at` | TIMESTAMPTZ | No | `now()` | Session creation |
| `updated_at` | TIMESTAMPTZ | No | auto | Session update |

**Indexes:** `INDEX("user_id", "is_revoked")`, `INDEX("expires_at")`

---

### 3.7. `audit_logs`
Append-only immutable operational audit trail.

| Column | Type | Nullable | Default | Description |
| :--- | :--- | :---: | :--- | :--- |
| `id` | UUID | No | `gen_random_uuid()` | Primary Key |
| `organization_id`| UUID | No | | FK -> `organizations.id` (RESTRICT) |
| `branch_id` | UUID | Yes | `NULL` | FK -> `branches.id` (SET NULL) |
| `user_id` | UUID | Yes | `NULL` | FK -> `users.id` (SET NULL) |
| `action` | VARCHAR(100) | No | | Action performed (`STOCK_ADJUSTMENT`, etc.) |
| `resource_type` | VARCHAR(100) | No | | Target entity (`Branch`, `ProductBatch`) |
| `resource_id` | VARCHAR(100) | No | | ID of target entity |
| `before_state` | JSONB | Yes | | State snapshot prior to mutation |
| `after_state` | JSONB | Yes | | State snapshot after mutation |
| `ip_address` | VARCHAR(45) | Yes | | Origin IP address |
| `user_agent` | TEXT | Yes | | Origin client agent |
| `created_at` | TIMESTAMPTZ | No | `now()` | Immutable event timestamp |

**Indexes:**
- `INDEX("organization_id", "created_at" DESC)`
- `INDEX("resource_type", "resource_id")`
- `INDEX("user_id")`

---

## 4. Future Domain Integration Map

The foundation schema is architected to receive subsequent business domains without breaking foreign keys or tenant isolation:

1. **Product Catalog & Taxonomy**:
   - `categories` and `products` will reference `organization_id` (`ON DELETE RESTRICT`).
2. **FEFO Inventory & Batches**:
   - `inventory_levels` will reference `organization_id`, `branch_id`, and `warehouse_id`.
   - `product_batches` will hold `cost_price` and `selling_price` as `DECIMAL(12, 2)`.
   - `stock_movements` will log all inbound/outbound changes referencing `audit_logs` and `users`.
3. **Procurement & Suppliers**:
   - `suppliers` and `purchase_orders` will reference `organization_id` and receiving `branches`/`warehouses`.
4. **Point of Sale (POS) & Orders**:
   - `pos_sessions` will attach to `branches` and `users` (cashier).
   - `orders` will attach to `branches` and `pos_sessions`.
