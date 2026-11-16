# ECOBAZAR — Seed Data Guide & Developer Credentials

## 1. Safety & Data Classification Notice

> [!CAUTION]
> All seed data in this project is strictly **fictional development data** intended for local testing, integration checks, and UI prototyping.
> 
> - **Never** deploy seed scripts to production databases.
> - **Never** reuse development placeholder hashes or test email addresses for real business users.
> - Real business data and employee onboarding must occur through authenticated administrative workflows.

---

## 2. Running Seed Scripts

Execute the seed script using `tsx` via pnpm:

```bash
# Run database seed
pnpm --filter @ecobazar/database db:seed
```

---

## 3. Seeded Entities Summary

### 3.1. Master Organization
- **Name**: `ECOBAZAR Supermarket Ltd. (DEV)`
- **Slug**: `ecobazar-ltd`
- **Currency**: `BDT` (৳)
- **Timezone**: `Asia/Dhaka`
- **Trade License**: `TRAD/DSCC/012345/2026`

### 3.2. Branches (Dhaka Metropolitan Area)

| Branch Name | Code | City / Division | Address | Primary Contact | Flagship |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Dhanmondi Branch #01** | `ECO-DHK-01` | Dhaka | House 42, Road 27, Dhanmondi | `+8801711000001` | Yes |
| **Gulshan Branch #02** | `ECO-DHK-02` | Dhaka | Avenue 2, Plot 14, Gulshan-2 | `+8801711000002` | No |
| **Uttara Branch #03** | `ECO-DHK-03` | Dhaka | Sector 3, Jashimuddin Ave, Uttara| `+8801711000003` | No |

### 3.3. Central Fulfillment Center
- **Name**: `Tejgaon Central Distribution Center`
- **Code**: `WH-TEJ-01`
- **Capacity**: `18,500 sqft`
- **Location**: `24/A Industrial Area, Tejgaon, Dhaka-1208`
- **Supervisor**: `Md. Rafiqul Islam` (`+8801712000000`)

---

## 4. Development User Accounts

All seed users are provisioned with an identical fictional password placeholder for local testing (`DevSecret123!` hashed via Argon2id format):

| User Email | Phone Number | First Name | Assigned Role | Branch Scope |
| :--- | :--- | :--- | :--- | :--- |
| `admin@ecobazar.dev` | `+8801700000001` | Super Admin | `SUPER_ADMIN` | Organization-Wide (`NULL`) |
| `owner@ecobazar.dev` | `+8801700000002` | Tanvir Ahmed | `OWNER` | Organization-Wide (`NULL`) |
| `manager.dhk01@ecobazar.dev`| `+8801700000003` | Kabir Hossain | `BRANCH_MANAGER` | Dhanmondi (`ECO-DHK-01`) |
| `cashier.dhk01@ecobazar.dev`| `+8801700000004` | Fatima Akter | `CASHIER` | Dhanmondi (`ECO-DHK-01`) |
| `picker.tejgaon@ecobazar.dev`| `+8801700000005` | Shakil Miah | `WAREHOUSE_STAFF`| Tejgaon Warehouse (`WH-TEJ-01`) |

---

## 5. Seeded Roles & Permissions Matrix

### Roles:
1. **`SUPER_ADMIN`**: Full administrative access across all domains and branches.
2. **`OWNER`**: Organization-level financial reports, audit logs, and strategic overview.
3. **`BRANCH_MANAGER`**: Branch-level stock view, stock adjustments, purchase order requests, and cashier oversight.
4. **`CASHIER`**: POS session opening/closing, barcode checkout, and receipt issuance.
5. **`WAREHOUSE_STAFF`**: Goods received notes (GRN), inter-branch stock transfers, and batch verification.

### Granular Permissions Seeded:
- **Administration**: `org:manage`, `branches:manage`, `users:manage`
- **Catalog**: `catalog:read`, `catalog:write`
- **Inventory**: `inventory:read`, `inventory:adjust`, `inventory:transfer`, `batches:manage`
- **Purchasing**: `purchasing:po:create`, `purchasing:po:approve`, `purchasing:grn:receive`
- **Point of Sale**: `pos:session:open`, `pos:session:close`, `pos:checkout`, `pos:void`
- **Reporting & Security**: `reports:financial`, `audit:read`
