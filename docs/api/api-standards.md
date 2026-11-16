# ECOBAZAR — REST API Architecture & Standards

## 1. API Design Principles & Conventions

ECOBAZAR follows strict RESTful conventions:
1. **URI Versioning**: All public endpoints are versioned with the path prefix: `/api/v1/`.
2. **Resource Naming**: Plural nouns in `kebab-case` (e.g. `/api/v1/product-batches`, `/api/v1/purchase-orders`).
3. **HTTP Verb Mapping**:
   - `GET`: Read resources (Idempotent, Safe).
   - `POST`: Create new resources or trigger stateful domain actions (e.g. `/api/v1/pos/sessions/open`).
   - `PUT`: Complete resource replacement.
   - `PATCH`: Partial resource updates.
   - `DELETE`: Soft delete or deactivate a resource.
4. **Headers**:
   - `Content-Type: application/json`
   - `Authorization: Bearer <JWT>`
   - `X-Organization-Id: <UUID>` (Context scoping for multi-org requests)
   - `X-Branch-Id: <UUID>` (Context scoping for branch-specific requests)
   - `X-Idempotency-Key: <UUID>` (Required for all mutating financial operations)
   - `X-Trace-Id: <UUID>` (Distributed tracing identifier)

---

## 2. Standard Envelopes

### 2.1. Success Response Envelope
Every successful response is wrapped in a consistent payload:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product variants retrieved successfully",
  "data": [
    {
      "id": "e4b5a2f1-6789-4abc-9def-0123456789ab",
      "sku": "ECO-RICE-NAZ-5KG",
      "nameEn": "Nazirshail Rice 5kg",
      "nameBn": "নাজিরশাইল চাল ৫ কেজি",
      "mrp": 450.00,
      "sellingPrice": 420.00
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### 2.2. Error Response Envelope
Every error produces a predictable structure:

```json
{
  "success": false,
  "statusCode": 422,
  "error": {
    "code": "INSUFFICIENT_BATCH_STOCK",
    "message": "Requested quantity exceeds available FEFO batch stock in this branch",
    "details": [
      {
        "field": "quantity",
        "issue": "Requested 25.000 kg, but only 14.500 kg available across active batches."
      }
    ],
    "timestamp": "2026-11-16T12:35:00.000Z",
    "path": "/api/v1/pos/checkout",
    "traceId": "c8a4df56-e91b-43d9-a78b-3d02a9b47e21"
  }
}
```

---

## 3. Query Parameter Standards

| Parameter | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| `page` | Integer | `?page=1` | Current page number (Default: 1) |
| `limit` | Integer | `?limit=25` | Page size (Default: 20, Max: 100) |
| `sortBy` | String | `?sortBy=createdAt` | Field name for sorting |
| `sortOrder` | Enum | `?sortOrder=desc` | `asc` or `desc` |
| `search` | String | `?search=miniket` | Case-insensitive full-text search across titles/SKUs |
| `filter[key]`| String | `?filter[status]=ACTIVE` | Exact or scoped field filtering |
| `include` | String | `?include=batches,images` | Relationship eager-loading expansion |

---

## 4. Comprehensive Endpoint Catalog by Module

### 4.1. Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/login` — Email/Phone + password login.
- `POST /api/v1/auth/refresh` — Rotate refresh token, issue new access token.
- `POST /api/v1/auth/logout` — Revoke active session token.
- `POST /api/v1/auth/otp/send` — Dispatch SMS OTP to Bangladesh mobile number.
- `POST /api/v1/auth/otp/verify` — Verify OTP and issue customer session.
- `POST /api/v1/auth/password/forgot` — Request password reset email/SMS.
- `POST /api/v1/auth/password/reset` — Execute password change with token.

### 4.2. Users & RBAC (`/api/v1/users`, `/api/v1/roles`)
- `GET /api/v1/users` — List staff with filtering by branch and role.
- `POST /api/v1/users` — Onboard new staff member.
- `GET /api/v1/users/:id` — User profile details.
- `PATCH /api/v1/users/:id` — Update profile or role assignment.
- `DELETE /api/v1/users/:id` — Deactivate user account.
- `GET /api/v1/roles` — List roles and permission sets.
- `POST /api/v1/roles` — Define custom permission role.

### 4.3. Tenancy & Infrastructure (`/api/v1/branches`, `/api/v1/warehouses`)
- `GET /api/v1/branches` — List organization branches with coordinates.
- `POST /api/v1/branches` — Provision new branch.
- `GET /api/v1/branches/:id` — Branch details and operational metrics.
- `PATCH /api/v1/branches/:id` — Update address, operational hours, delivery radius.
- `GET /api/v1/warehouses` — List central and regional fulfillment warehouses.
- `POST /api/v1/warehouses` — Register warehouse storage facility.

### 4.4. Catalog & Taxonomy (`/api/v1/products`, `/api/v1/categories`)
- `GET /api/v1/categories` — Hierarchical category tree (EN/BN).
- `POST /api/v1/categories` — Create category or subcategory.
- `GET /api/v1/products` — Filtered catalog search with pagination.
- `POST /api/v1/products` — Create master product with base SKU and variants.
- `GET /api/v1/products/:id` — Comprehensive product detail with active variants.
- `PATCH /api/v1/products/:id` — Update pricing, descriptions, or taxonomy.
- `GET /api/v1/products/barcode/:code` — High-speed barcode lookup (EAN13/Code128).

### 4.5. Batches & FEFO Inventory (`/api/v1/batches`, `/api/v1/inventory`)
- `GET /api/v1/batches` — List product batches with expiry dates and status.
- `POST /api/v1/batches` — Register incoming manufactured batch.
- `GET /api/v1/batches/near-expiry` — Batches expiring within 30/60/90 days.
- `GET /api/v1/inventory/stock-levels` — Query current stock by branch/warehouse.
- `POST /api/v1/inventory/adjustments` — Stock audit manual reconciliation.
- `POST /api/v1/inventory/transfers` — Initiate inter-branch stock transfer.
- `PATCH /api/v1/inventory/transfers/:id/receive` — Accept inbound transfer.

### 4.6. Procurement & Purchasing (`/api/v1/suppliers`, `/api/v1/purchasing`)
- `GET /api/v1/suppliers` — Supplier directory and performance ratings.
- `POST /api/v1/suppliers` — Register vendor profile and payment terms.
- `GET /api/v1/purchasing/orders` — List purchase orders.
- `POST /api/v1/purchasing/orders` — Create PO with line items and costings.
- `PATCH /api/v1/purchasing/orders/:id/approve` — Approve PO for supplier dispatch.
- `POST /api/v1/purchasing/grn` — Receive goods, create batches, and increment stock.

### 4.7. Point of Sale (POS) (`/api/v1/pos`)
- `POST /api/v1/pos/sessions/open` — Open cash drawer with initial float.
- `POST /api/v1/pos/sessions/close` — Close session, record counted cash & variance.
- `GET /api/v1/pos/sessions/current` — Status of active register session.
- `POST /api/v1/pos/checkout` — Execute immediate in-store transaction with FEFO batch deduction.
- `POST /api/v1/pos/sync-offline` — Reconcile queued offline sales transactions.
- `GET /api/v1/pos/receipt/:orderId` — ESC/POS formatted receipt payload.

### 4.8. Orders & E-Commerce Fulfillment (`/api/v1/orders`)
- `GET /api/v1/orders` — Filter orders by status, channel, and branch.
- `POST /api/v1/orders` — Customer places online grocery order.
- `GET /api/v1/orders/:id` — Complete order timeline, allocated batches, and items.
- `PATCH /api/v1/orders/:id/status` — Advance status (PACKED -> DISPATCHED -> DELIVERED).
- `POST /api/v1/orders/:id/cancel` — Cancel order and release reserved stock.

### 4.9. Payments & Gateways (`/api/v1/payments`)
- `POST /api/v1/payments/bkash/create` — Initialize bKash tokenized payment URL.
- `POST /api/v1/payments/bkash/callback` — bKash verification and capture.
- `POST /api/v1/payments/nagad/initialize` — Initiate Nagad payment gateway flow.
- `POST /api/v1/payments/webhooks/:gateway` — Inbound signed webhook handler.
- `POST /api/v1/payments/refund` — Issue full or partial refund.

### 4.10. AI Services (`/api/v1/ai`)
- `POST /api/v1/ai/natural-search` — Translate colloquial Bangla voice/text to structured query.
- `GET /api/v1/ai/demand-forecast` — Predicted demand by branch for upcoming 14 days.
- `GET /api/v1/ai/fefo-clearance-advisor` — Suggested clearance discounts for near-expiry stock.

### 4.11. Audit Logs (`/api/v1/audit-logs`)
- `GET /api/v1/audit-logs` — Filterable historical audit trail with state diffs.
- `GET /api/v1/audit-logs/:id` — Single event detail with actor metadata.
