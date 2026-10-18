const { PrismaClient } = require('@prisma/client');

async function main() {
  // Connect to the default 'postgres' database to check/create 'sufigarden_db'
  const rootPrisma = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres:postgres@localhost:5432/postgres?schema=public',
      },
    },
  });

  try {
    await rootPrisma.$connect();
    console.log('Connected to PostgreSQL root server on port 5432.');
    
    // Check if sufigarden_db exists
    const checkDb = await rootPrisma.$queryRawUnsafe(
      "SELECT 1 FROM pg_database WHERE datname = 'sufigarden_db';"
    );

    if (!checkDb || checkDb.length === 0) {
      console.log("Database 'sufigarden_db' does not exist. Creating...");
      await rootPrisma.$executeRawUnsafe('CREATE DATABASE sufigarden_db;');
      console.log("Database 'sufigarden_db' created successfully!");
    } else {
      console.log("Database 'sufigarden_db' already exists.");
    }
  } catch (err) {
    console.error('Error initializing database:', err.message);
    process.exit(1);
  } finally {
    await rootPrisma.$disconnect();
  }
}

main();
