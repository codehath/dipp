import db from "$lib/server/db";
import { dailyTasks, mood } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { redirect, fail } from "@sveltejs/kit";
import { getTodaysDate, getDay, getDefaultRedirect } from "$lib/utils/helperFunctions";

console.log("Importing dependencies");

const today = getTodaysDate().toISOString();
console.log("Today's date:", today);

export const actions = {
  update: async ({ request, locals }) => {
    console.log("Starting mood update action");

    if (!locals?.user?.[0]?.id) {
      console.log("Unauthorized access attempt");
      return fail(401, { message: "Unauthorized" });
    }

    const userID = locals.user[0].id;
    const startDate = locals.user[0].start_date;
    const day = getDay(startDate);
    console.log("User ID:", userID);
    console.log("Start date:", startDate);
    console.log("Day number:", day);

    try {
      const formData = await request.formData();
      console.log("Form data received");
      const answersString = formData.get("answers[]");
      console.log("Answers string:", answersString);

      if (!answersString) {
        console.log("No answers provided");
        return fail(400, { message: "No answers provided" });
      }

      const answers = answersString.split(" ,");
      console.log("Parsed answers:", answers);
      if (answers.length !== 9) {
        console.log("Invalid number of answers:", answers.length);
        return fail(400, { message: "Invalid number of answers" });
      }

      console.log("Querying user tasks");
      const userTasks = await db
        .select()
        .from(dailyTasks)
        .where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.day_number, day)))
        .limit(1);
      console.log("User tasks query result:", userTasks);

      if (!userTasks.length) {
        console.log("Daily tasks not found");
        return fail(404, { message: "Daily tasks not found" });
      }

      const updateFields = {};
      for (let i = 0; i < 9; i++) {
        updateFields[`q${i + 1}`] = answers[i];
      }
      console.log("Update fields prepared:", updateFields);

      console.log("Inserting new mood entry");
      const [newMood] = await db.insert(mood).values(updateFields).returning();
      console.log("New mood entry created:", newMood);

      console.log("Updating daily tasks with mood ID");
      await db.update(dailyTasks).set({ mood_id: newMood.id }).where(eq(dailyTasks.id, userTasks[0].id));
      console.log("Daily tasks updated successfully");

      return { success: true };
    } catch (error) {
      console.error("Error updating mood:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      return fail(500, { message: "Internal server error" });
    }
  },
};

export const load = async ({ locals }) => {
  console.log("Starting load function");

  if (!locals?.user?.[0]) {
    console.log("No user found, redirecting");
    throw redirect(302, getDefaultRedirect());
  }

  const userID = locals.user[0].id;
  console.log("User ID:", userID);

  try {
    console.log("Querying user tasks");
    const userTasks = await db
      .select()
      .from(dailyTasks)
      .where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today)))
      .limit(1);
    console.log("User tasks query result:", userTasks);

    if (!userTasks.length || userTasks[0].meditation === false) {
      console.log("No tasks found or meditation not completed, redirecting");
      throw redirect(302, "/day");
    }

    let userMood = null;
    if (userTasks[0].mood_id) {
      console.log("Querying mood data");
      const moodResults = await db.select().from(mood).where(eq(mood.id, userTasks[0].mood_id)).limit(1);
      userMood = moodResults[0] || null;
      console.log("Mood query result:", userMood);
    }

    console.log("Returning data:", {
      title: "Mood Questionnaire",
      user: locals.user,
      userTasks: userTasks[0],
      mood: userMood,
    });

    return {
      title: "Mood Questionnaire",
      user: locals.user,
      userTasks: userTasks[0],
      mood: userMood,
    };
  } catch (error) {
    console.error("Error loading mood data:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    throw redirect(302, "/day");
  }
};
