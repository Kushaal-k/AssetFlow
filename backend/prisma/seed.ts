import prisma from '../src/lib/prisma.js';

async function main() {
  console.log('Seeding database...');

  // 1. Create a Department
  const itDept = await prisma.department.create({
    data: {
      name: 'IT Operations',
    },
  });
  console.log(`Created Department: ${itDept.id}`);

  // 2. Create a User (Employee)
  const user = await prisma.user.create({
    data: {
      name: 'Kushaal Kankane',
      email: 'kushaal@example.com',
      passwordHash: 'hashed_password_placeholder', // Normally you'd use bcrypt here
      departmentId: itDept.id,
    },
  });
  console.log(`Created User: ${user.id}`);

  // 3. Create an Asset Category
  const category = await prisma.assetCategory.create({
    data: {
      name: 'Laptops',
    },
  });
  console.log(`Created Category: ${category.id}`);

  // 4. Create an Asset
  const asset = await prisma.asset.create({
    data: {
      name: 'MacBook Pro M3',
      tag: 'AF-0001',
      categoryId: category.id,
      departmentId: itDept.id,
      status: 'AVAILABLE', 
    },
  });
  console.log(`Created Asset: ${asset.id}`);

  console.log('\n--- SUCCESS ---');
  console.log('Use these IDs to test your Allocation API:');
  console.log(`assetId: "${asset.id}"`);
  console.log(`assignedToId: "${user.id}"`);
  console.log(`assignedDeptId: "${itDept.id}"`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
