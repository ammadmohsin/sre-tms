import { PrismaClient, AccessLevel, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create demo users with different access levels
  const users = [
    {
      email: "admin@tms.com",
      password: await bcrypt.hash("admin123", 10),
      role: Role.HEAD_MANAGER,
      accessLevel: AccessLevel.ADMIN,
    },
    {
      email: "manager@tms.com",
      password: await bcrypt.hash("manager123", 10),
      role: Role.HEAD_MANAGER,
      accessLevel: AccessLevel.MANAGER,
    },
    {
      email: "dept.head@tms.com",
      password: await bcrypt.hash("dept123", 10),
      role: Role.DEPARTMENT_HEAD,
      accessLevel: AccessLevel.DEPARTMENT_HEAD,
    },
    {
      email: "qc@tms.com",
      password: await bcrypt.hash("qc123", 10),
      role: Role.QUALITY_CONTROL_OFFICER,
      accessLevel: AccessLevel.QUALITY_CONTROL,
    },
    {
      email: "commercial@tms.com",
      password: await bcrypt.hash("commercial123", 10),
      role: Role.COMMERCIAL_DEPT,
      accessLevel: AccessLevel.COMMERCIAL,
    },
    {
      email: "shipping@tms.com",
      password: await bcrypt.hash("shipping123", 10),
      role: Role.SHIPPING_AGENT,
      accessLevel: AccessLevel.SHIPPING,
    },
    {
      email: "staff@tms.com",
      password: await bcrypt.hash("staff123", 10),
      role: Role.EMPLOYEE,
      accessLevel: AccessLevel.DEPARTMENT_STAFF,
    },
    {
      email: "worker@tms.com",
      password: await bcrypt.hash("worker123", 10),
      role: Role.EMPLOYEE,
      accessLevel: AccessLevel.WORKER,
    },
  ];

  console.log("👥 Creating users...");
  for (const userData of users) {
    try {
      await prisma.user.create({
        data: userData,
      });
    } catch (e) {
      // User already exists, skip
      console.log(`User ${userData.email} already exists, skipping...`);
    }
  }

  // Create departments
  console.log("🏢 Creating departments...");
  const departments = [
    {
      name: "Production",
      code: "PROD",
      description: "Manufacturing and production",
    },
    {
      name: "Quality Control",
      code: "QC",
      description: "Quality assurance and testing",
    },
    {
      name: "Warehouse",
      code: "WH",
      description: "Storage and inventory management",
    },
    {
      name: "Commercial",
      code: "COMM",
      description: "Import/Export operations",
    },
    { name: "Shipping", code: "SHIP", description: "Logistics and delivery" },
  ];

  for (const dept of departments) {
    try {
      await prisma.department.create({
        data: dept,
      });
    } catch (e) {
      // Department already exists, skip
      console.log(`Department ${dept.code} already exists, skipping...`);
    }
  }

  // Create categories
  console.log("📦 Creating categories...");
  const categories = [
    {
      name: "Raw Materials",
      description: "Fabrics, threads, and base materials",
    },
    {
      name: "Accessories",
      description: "Buttons, zippers, and decorative items",
    },
    { name: "Finished Products", description: "Completed textile products" },
    { name: "Packaging", description: "Boxes, bags, and packaging materials" },
  ];

  for (const cat of categories) {
    try {
      await prisma.category.create({
        data: cat,
      });
    } catch (e) {
      // Category already exists, skip
      console.log(`Category ${cat.name} already exists, skipping...`);
    }
  }

  // Create shifts
  console.log("⏰ Creating shifts...");
  const shifts = [
    {
      name: "Morning Shift",
      type: "MORNING" as const,
      startTime: "08:00",
      endTime: "16:00",
    },
    {
      name: "Evening Shift",
      type: "EVENING" as const,
      startTime: "16:00",
      endTime: "00:00",
    },
    {
      name: "Night Shift",
      type: "NIGHT" as const,
      startTime: "00:00",
      endTime: "08:00",
    },
  ];

  for (const shift of shifts) {
    const existing = await prisma.shift.findFirst({
      where: { name: shift.name },
    });
    if (!existing) {
      try {
        await prisma.shift.create({ data: shift });
      } catch (e) {
        console.log(`Failed to create shift ${shift.name}, skipping...`);
      }
    }
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
