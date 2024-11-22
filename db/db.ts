import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Burger } from "@/types/Burger";
import path from "path";
import fs from "fs";

interface Database {
  burgers: Burger[];
}

// Determine storage path based on the environment
const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;
// const writableDir = isVercel ? "/tmp" : path.resolve(process.cwd(), "data"); // Use /tmp on Vercel, 'data' folder locally
const filePath = isVercel
  ? "/tmp/burgers.json"
  : path.resolve(process.cwd(), "data", "burgers.json");

// Ensure the writable directory exists (useful for local development)
if (isVercel && !fs.existsSync("/tmp")) {
  fs.mkdirSync("/tmp", { recursive: true });
}

const existData = JSON.parse(Buffer.from(
  fs.readFileSync(path.resolve(process.cwd(), "data", "burgers.json"))
).toString());

// Check if burgers.json exists (for local development)
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ burgers: existData.burgers }, null, 2)); // Initialize with empty data
}

const adapter = new JSONFile<Database>(filePath);
const db = new Low<Database>(adapter, { burgers: [] });

// Initialize data structure if it doesn't exist
async function initDB() {
  await db.read();
  db.data ||= { burgers: [] };
  await db.write();
}

initDB();

export default db;
