import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
	url: import.meta.env.VITE_DATABASE_URL,
// 	host: import.meta.env.VITE_DATABASE_HOST,
//	user: import.meta.env.VITE_DATABASE_USERNAME,
//	password: import.meta.env.VITE_DATABASE_PASSWORD,
//	database: import.meta.env.VITE_DATABASE_NAME,
});

await client.connect();
const db = drizzle(client);

export default db;
