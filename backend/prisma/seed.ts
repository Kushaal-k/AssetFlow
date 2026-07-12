import prisma from '../src/lib/prisma.js';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // 0. Clean the database first (order matters due to foreign keys)
  console.log('Cleaning up existing data...');
  await prisma.auditRecord.deleteMany();
  await prisma.auditCycle.deleteMany();
  await prisma.maintenanceRequest.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.allocation.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.assetCategory.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();

  // 1. Create Departments
  console.log('Creating Departments...');
  const deptIT = await prisma.department.create({ data: { name: 'IT Operations' } });
  const deptHR = await prisma.department.create({ data: { name: 'Human Resources' } });
  const deptEng = await prisma.department.create({ data: { name: 'Engineering' } });
  const deptDesign = await prisma.department.create({ data: { name: 'Design' } });

  // 2. Create Users
  console.log('Creating Users...');
  const defaultPasswordHash = await bcrypt.hash('password123', 10);
  
  const adminUser = await prisma.user.create({
    data: { name: 'Admin User', email: 'admin@assetflow.com', passwordHash: defaultPasswordHash, departmentId: deptIT.id, role: 'ADMIN' }
  });
  const devUser = await prisma.user.create({
    data: { name: 'Jane Developer', email: 'jane@assetflow.com', passwordHash: defaultPasswordHash, departmentId: deptEng.id, role: 'EMPLOYEE' }
  });
  const designUser = await prisma.user.create({
    data: { name: 'Alex Designer', email: 'alex@assetflow.com', passwordHash: defaultPasswordHash, departmentId: deptDesign.id, role: 'ASSET_MANAGER' }
  });
  const hrUser = await prisma.user.create({
    data: { name: 'Sam Recruiter', email: 'sam@assetflow.com', passwordHash: defaultPasswordHash, departmentId: deptHR.id, role: 'DEPT_HEAD' }
  });

  // 3. Create Categories
  console.log('Creating Categories...');
  const catLaptops = await prisma.assetCategory.create({ data: { name: 'Laptops' } });
  const catMonitors = await prisma.assetCategory.create({ data: { name: 'Monitors' } });
  const catPeripherals = await prisma.assetCategory.create({ data: { name: 'Peripherals' } });
  const catFurniture = await prisma.assetCategory.create({ data: { name: 'Furniture' } });

  // 4. Create Assets
  console.log('Creating Assets...');
  
  // Available Assets
  const asset1 = await prisma.asset.create({
    data: { name: 'MacBook Pro 14" M3', tag: 'LAP-001', categoryId: catLaptops.id, departmentId: deptEng.id, status: 'AVAILABLE' }
  });
  const asset2 = await prisma.asset.create({
    data: { name: 'Dell UltraSharp 27"', tag: 'MON-001', categoryId: catMonitors.id, departmentId: deptEng.id, status: 'AVAILABLE' }
  });
  const asset3 = await prisma.asset.create({
    data: { name: 'Logitech MX Master 3', tag: 'PER-001', categoryId: catPeripherals.id, departmentId: deptIT.id, status: 'AVAILABLE' }
  });

  // Allocated Assets
  const asset4 = await prisma.asset.create({
    data: { name: 'MacBook Pro 16" M2', tag: 'LAP-002', categoryId: catLaptops.id, departmentId: deptEng.id, status: 'ALLOCATED' }
  });
  const asset5 = await prisma.asset.create({
    data: { name: 'Herman Miller Aeron', tag: 'FUR-001', categoryId: catFurniture.id, departmentId: deptDesign.id, status: 'ALLOCATED' }
  });
  const asset6 = await prisma.asset.create({
    data: { name: 'Wacom Cintiq Pro', tag: 'PER-002', categoryId: catPeripherals.id, departmentId: deptDesign.id, status: 'ALLOCATED' }
  });
  const asset7 = await prisma.asset.create({
    data: { name: 'ThinkPad T14', tag: 'LAP-003', categoryId: catLaptops.id, departmentId: deptHR.id, status: 'ALLOCATED' }
  }); // This will be overdue

  // Maintenance Asset
  const asset8 = await prisma.asset.create({
    data: { name: 'LG 34" Ultrawide', tag: 'MON-002', categoryId: catMonitors.id, departmentId: deptEng.id, status: 'MAINTENANCE' }
  });

  // Lost Asset
  const asset9 = await prisma.asset.create({
    data: { name: 'Apple Magic Keyboard', tag: 'PER-003', categoryId: catPeripherals.id, departmentId: deptIT.id, status: 'LOST' }
  });

  // 5. Create Allocations
  console.log('Creating Allocations...');
  const now = new Date();
  
  // Historical Allocation (Returned)
  await prisma.allocation.create({
    data: {
      assetId: asset1.id,
      assignedToId: hrUser.id,
      startDate: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
      expectedReturnDate: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
      actualReturnDate: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
      status: 'RETURNED'
    }
  });

  // Active Allocations
  await prisma.allocation.create({
    data: {
      assetId: asset4.id,
      assignedToId: devUser.id,
      startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      expectedReturnDate: new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000), // Future return
      status: 'ACTIVE'
    }
  });

  await prisma.allocation.create({
    data: {
      assetId: asset5.id,
      assignedToId: designUser.id,
      startDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
      status: 'ACTIVE' // No expected return date (permanent)
    }
  });

  await prisma.allocation.create({
    data: {
      assetId: asset6.id,
      assignedToId: designUser.id,
      startDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      expectedReturnDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // Future return
      status: 'ACTIVE'
    }
  });

  // Overdue Allocation
  await prisma.allocation.create({
    data: {
      assetId: asset7.id,
      assignedToId: hrUser.id,
      startDate: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
      expectedReturnDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days OVERDUE
      status: 'ACTIVE'
    }
  });

  // 6. Create Maintenance Records
  console.log('Creating Maintenance Records...');
  // Resolved
  await prisma.maintenanceRequest.create({
    data: {
      assetId: asset1.id,
      raisedById: devUser.id,
      issueDescription: 'Screen flickering',
      priority: 'MEDIUM',
      status: 'RESOLVED',
      createdAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000)
    }
  });

  // Active (In Progress)
  await prisma.maintenanceRequest.create({
    data: {
      assetId: asset8.id,
      raisedById: devUser.id,
      issueDescription: 'Dead pixels on screen',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
    }
  });

  // 7. Create Audit Cycles & Records
  console.log('Creating Audit Data...');
  
  // Past Audit Cycle (Closed)
  const pastAudit = await prisma.auditCycle.create({
    data: {
      name: 'Q3 2025 General Audit',
      status: 'CLOSED',
      startDate: new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() - 110 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.auditRecord.createMany({
    data: [
      { cycleId: pastAudit.id, assetId: asset1.id, auditorId: adminUser.id, status: 'VERIFIED' },
      { cycleId: pastAudit.id, assetId: asset2.id, auditorId: adminUser.id, status: 'VERIFIED' },
      { cycleId: pastAudit.id, assetId: asset3.id, auditorId: adminUser.id, status: 'VERIFIED' },
      { cycleId: pastAudit.id, assetId: asset4.id, auditorId: adminUser.id, status: 'VERIFIED' }
    ]
  });

  // Active Audit Cycle (Open)
  const currentAudit = await prisma.auditCycle.create({
    data: {
      name: 'Q1 2026 Laptop & Tech Audit',
      status: 'OPEN',
      startDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
    }
  });

  await prisma.auditRecord.createMany({
    data: [
      { cycleId: currentAudit.id, assetId: asset1.id, auditorId: adminUser.id, status: 'VERIFIED', notes: 'Looks good' },
      { cycleId: currentAudit.id, assetId: asset2.id, auditorId: adminUser.id, status: 'VERIFIED' },
      { cycleId: currentAudit.id, assetId: asset8.id, auditorId: adminUser.id, status: 'DAMAGED', notes: 'Found dead pixels' }
    ]
  });

  console.log('\n--- SUCCESS ---');
  console.log('Seeded database with:');
  console.log('- 4 Departments');
  console.log('- 4 Users');
  console.log('- 4 Categories');
  console.log('- 9 Assets');
  console.log('- 5 Allocations (1 Historical, 3 Active, 1 Overdue)');
  console.log('- 2 Maintenance Requests');
  console.log('- 2 Audit Cycles');
  
  console.log('\nTest Credentials:');
  console.log('Email: admin@assetflow.com (or any user email)');
  console.log('Password: (use dummy bypass for now if auth is not fully hooked up)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
