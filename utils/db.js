require("dotenv").config();
const postgres = require("postgres");
const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

const testConnection = async () => {
  try {
    await sql`SELECT 1`;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
    console.log(error.message);
    console.log(error);
    process.exit(1);
  }
};
testConnection();

module.exports = sql;
