import { PrismaClient } from '@prisma/client';
import { USER_ROLES } from '@ecobazar/constants';

const prisma = new PrismaClient();

// Fictional development password hash placeholder (Argon2id format for "DevSecret123!")
const FICTIONAL_DEV_PASSWORD_HASH =
  '$argon2id$v=19$m=65536,t=3,p=4$6Fq4gCg04K8q1L0n2M3p4Q$fictionalDevelopmentHashDoNotUseInProduction';

async function main() {
  console.log('🌱 Starting ECOBAZAR Foundation Database Seeding (Development Data Only)...');

  // 1. Create ECOBAZAR Master Organization
  const org = await prisma.organization.upsert({
    where: { slug: 'ecobazar-ltd' },
    update: {},
    create: {
      name: 'ECOBAZAR Supermarket Ltd. (DEV)',
      slug: 'ecobazar-ltd',
      tradeLicense: 'TRAD/DSCC/012345/2026',
      taxNumber: 'TIN-9876543210',
      defaultCurrency: 'BDT',
      defaultTimezone: 'Asia/Dhaka',
      isActive: true,
    },
  });
  console.log(`✅ Organization created/verified: ${org.name} (${org.id})`);

  // 2. Create Sample Branches (Dhaka Metropolitan Area)
  const branchData = [
    {
      code: 'ECO-DHK-01',
      name: 'Dhanmondi Branch #01',
      addressLine1: 'House 42, Road 27, Dhanmondi',
      city: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1209',
      phone: '+8801711000001',
      email: 'dhanmondi@ecobazar.dev',
      isMainBranch: true,
      latitude: 23.7533,
      longitude: 90.3768,
    },
    {
      code: 'ECO-DHK-02',
      name: 'Gulshan Branch #02',
      addressLine1: 'Avenue 2, Plot 14, Gulshan-2',
      city: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1212',
      phone: '+8801711000002',
      email: 'gulshan@ecobazar.dev',
      isMainBranch: false,
      latitude: 23.7925,
      longitude: 90.4078,
    },
    {
      code: 'ECO-DHK-03',
      name: 'Uttara Branch #03',
      addressLine1: 'Sector 3, Jashimuddin Avenue, Uttara',
      city: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1230',
      phone: '+8801711000003',
      email: 'uttara@ecobazar.dev',
      isMainBranch: false,
      latitude: 23.8698,
      longitude: 90.3984,
    },
  ];

  const createdBranches: Record<string, string> = {};

  for (const b of branchData) {
    const branch = await prisma.branch.upsert({
      where: {
        organizationId_code: {
          organizationId: org.id,
          code: b.code,
        },
      },
      update: {},
      create: {
        organizationId: org.id,
        ...b,
      },
    });
    createdBranches[b.code] = branch.id;
    console.log(`✅ Branch created/verified: ${branch.name} (${branch.code})`);
  }

  // 3. Create Central Warehouse
  const warehouse = await prisma.warehouse.upsert({
    where: {
      organizationId_code: {
        organizationId: org.id,
        code: 'WH-TEJ-01',
      },
    },
    update: {},
    create: {
      organizationId: org.id,
      code: 'WH-TEJ-01',
      name: 'Tejgaon Central Distribution Center',
      address: '24/A Industrial Area, Tejgaon, Dhaka-1208',
      contactPerson: 'Md. Rafiqul Islam',
      contactPhone: '+8801712000000',
      capacitySqft: 18500.0,
      isActive: true,
    },
  });
  console.log(`✅ Warehouse created/verified: ${warehouse.name} (${warehouse.code})`);

  // 4. Create Standard Permissions
  const permissionsData = [
    { code: 'org:manage', name: 'Manage Organization Settings', category: 'Administration' },
    { code: 'branches:manage', name: 'Manage Store Branches', category: 'Administration' },
    { code: 'users:manage', name: 'Manage Staff and Roles', category: 'Administration' },
    { code: 'catalog:read', name: 'View Products and Categories', category: 'Catalog' },
    { code: 'catalog:write', name: 'Create and Edit Products', category: 'Catalog' },
    { code: 'inventory:read', name: 'View Stock and Batches', category: 'Inventory' },
    { code: 'inventory:adjust', name: 'Perform Stock Adjustments', category: 'Inventory' },
    { code: 'inventory:transfer', name: 'Initiate Stock Transfers', category: 'Inventory' },
    { code: 'batches:manage', name: 'Manage FEFO Batches', category: 'Inventory' },
    { code: 'purchasing:po:create', name: 'Create Purchase Orders', category: 'Purchasing' },
    { code: 'purchasing:po:approve', name: 'Approve Purchase Orders', category: 'Purchasing' },
    { code: 'purchasing:grn:receive', name: 'Receive Goods (GRN)', category: 'Purchasing' },
    { code: 'pos:session:open', name: 'Open Register Drawer', category: 'POS' },
    { code: 'pos:session:close', name: 'Close Register and Count Cash', category: 'POS' },
    { code: 'pos:checkout', name: 'Process POS Transactions', category: 'POS' },
    { code: 'pos:void', name: 'Void Items or Transactions', category: 'POS' },
    { code: 'reports:financial', name: 'View Financial and Sales Reports', category: 'Reports' },
    { code: 'audit:read', name: 'View Security Audit Logs', category: 'Security' },
  ];

  const permissionMap: Record<string, string> = {};

  for (const p of permissionsData) {
    const perm = await prisma.permission.upsert({
      where: { code: p.code },
      update: {},
      create: p,
    });
    permissionMap[p.code] = perm.id;
  }
  console.log(`✅ Created/verified ${permissionsData.length} granular permissions.`);

  // 5. Create System Roles
  const rolesData = [
    {
      name: USER_ROLES.SUPER_ADMIN,
      description: 'Full organization-wide administrative access',
      isSystem: true,
      permissions: Object.keys(permissionMap),
    },
    {
      name: USER_ROLES.OWNER,
      description: 'Organization executive owner with reporting & strategic access',
      isSystem: true,
      permissions: Object.keys(permissionMap),
    },
    {
      name: USER_ROLES.BRANCH_MANAGER,
      description: 'Operations manager scoped to a specific branch',
      isSystem: true,
      permissions: [
        'catalog:read',
        'inventory:read',
        'inventory:adjust',
        'inventory:transfer',
        'batches:manage',
        'purchasing:po:create',
        'purchasing:grn:receive',
        'pos:session:open',
        'pos:session:close',
        'pos:checkout',
        'pos:void',
        'reports:financial',
        'audit:read',
      ],
    },
    {
      name: USER_ROLES.CASHIER,
      description: 'Front-desk point of sale cashier for in-store checkout',
      isSystem: true,
      permissions: [
        'catalog:read',
        'inventory:read',
        'pos:session:open',
        'pos:session:close',
        'pos:checkout',
      ],
    },
    {
      name: USER_ROLES.WAREHOUSE_STAFF,
      description: 'Warehouse goods receipt, binning, and dispatch picker',
      isSystem: true,
      permissions: [
        'catalog:read',
        'inventory:read',
        'inventory:transfer',
        'batches:manage',
        'purchasing:grn:receive',
      ],
    },
  ];

  const roleMap: Record<string, string> = {};

  for (const r of rolesData) {
    const role = await prisma.role.upsert({
      where: {
        organizationId_name: {
          organizationId: org.id,
          name: r.name,
        },
      },
      update: {},
      create: {
        organizationId: org.id,
        name: r.name,
        description: r.description,
        isSystem: r.isSystem,
      },
    });
    roleMap[r.name] = role.id;

    // Map role permissions
    for (const permCode of r.permissions) {
      const permId = permissionMap[permCode];
      if (permId) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: permId,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: permId,
          },
        });
      }
    }
  }
  console.log(`✅ Roles and permission mappings configured.`);

  // 6. Create Development Users (Fictional Dev Data)
  const devUsers = [
    {
      email: 'admin@ecobazar.dev',
      phone: '+8801700000001',
      firstName: 'Super',
      lastName: 'Admin (Dev)',
      branchId: null, // Org-wide
      role: USER_ROLES.SUPER_ADMIN,
    },
    {
      email: 'owner@ecobazar.dev',
      phone: '+8801700000002',
      firstName: 'Tanvir',
      lastName: 'Ahmed (Owner Dev)',
      branchId: null, // Org-wide
      role: USER_ROLES.OWNER,
    },
    {
      email: 'manager.dhk01@ecobazar.dev',
      phone: '+8801700000003',
      firstName: 'Kabir',
      lastName: 'Hossain (Mgr Dhanmondi)',
      branchId: createdBranches['ECO-DHK-01'], // Scoped to Dhanmondi
      role: USER_ROLES.BRANCH_MANAGER,
    },
    {
      email: 'cashier.dhk01@ecobazar.dev',
      phone: '+8801700000004',
      firstName: 'Fatima',
      lastName: 'Akter (Cashier Dhanmondi)',
      branchId: createdBranches['ECO-DHK-01'], // Scoped to Dhanmondi
      role: USER_ROLES.CASHIER,
    },
    {
      email: 'picker.tejgaon@ecobazar.dev',
      phone: '+8801700000005',
      firstName: 'Shakil',
      lastName: 'Miah (Picker Dev)',
      branchId: null, // Warehouse staff
      role: USER_ROLES.WAREHOUSE_STAFF,
    },
  ];

  for (const u of devUsers) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        organizationId: org.id,
        branchId: u.branchId,
        email: u.email,
        phone: u.phone,
        passwordHash: FICTIONAL_DEV_PASSWORD_HASH,
        firstName: u.firstName,
        lastName: u.lastName,
        isActive: true,
      },
    });

    // Assign Role
    const roleId = roleMap[u.role];
    if (roleId) {
      await prisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: user.id,
            roleId: roleId,
          },
        },
        update: {},
        create: {
          userId: user.id,
          roleId: roleId,
        },
      });
    }

    console.log(
      `✅ Dev User created: ${user.firstName} ${user.lastName} (${user.email}) -> Role: ${u.role}`
    );
  }

  // 7. Initial Seed Audit Log
  await prisma.auditLog.create({
    data: {
      organizationId: org.id,
      action: 'SYSTEM_INITIAL_SEED',
      resourceType: 'Organization',
      resourceId: org.id,
      afterState: {
        seededAt: new Date().toISOString(),
        branchesSeeded: Object.keys(createdBranches).length,
        usersSeeded: devUsers.length,
      },
      userAgent: 'ECOBAZAR-Database-Seeder/1.0',
    },
  });

  console.log('🎉 ECOBAZAR Database Foundation seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('❌ Seeding failed with error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
