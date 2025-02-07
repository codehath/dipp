import { json } from "@sveltejs/kit";
import { seed } from "./seed";

export async function GET() {
  try {
    await seed();
    return json({ message: "Tasks seeded successfully" });
  } catch (error) {
    console.error("Error seeding tasks:", error);
    return json({ error: "Failed to seed tasks" }, { status: 500 });
  }
}
