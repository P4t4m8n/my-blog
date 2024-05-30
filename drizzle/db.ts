import { Client } from "pg";
import drizzle from "drizzle-orm-pg";

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});
client.connect();

export const db = drizzle(client);
