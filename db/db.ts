import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Burger } from "@/types/Burger";
import path from "path";

interface Database {
  burgers: Burger[];
}

const filePath = path.resolve(process.cwd(), "data", "burgers.json");
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
