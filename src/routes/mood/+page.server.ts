import db from "$lib/server/db";
import { dailyTasks, mood } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { redirect, fail } from "@sveltejs/kit";

import { getTodaysDate, getDay } from "$lib/utils/helperFunctions";
import { getDefaultRedirect } from "$lib/utils/helperFunctions";

const today = getTodaysDate().toISOString();

export const actions = {
  update: async ({ request, locals }) => {
    const userID = locals.user[0].id;
    const startDate = locals.user[0].start_date;
    const day = getDay(startDate);

    // Get the form data from the request
    const formData = await request.formData();

    // Get the question answers from the form data
    let answers = formData.get("answers[]");
    try {
      answers = JSON.parse(answers);
    } catch (e) {
      return fail(400, { message: "Error parsing questionnaire answers" });
    }

    // Update message if array is empty/null or has less than 9 elements
    if (!answers || answers.length !== 9) {
      return fail(400, { message: "Error submitting questionnaire" });
    }

    let userTasksQuery = await db
      .select()
      .from(dailyTasks)
      .where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.day_number, day)));

    let updateFields = {};
    for (let i = 0; i < 9; i++) {
      updateFields["q" + (i + 1)] = answers[i];
    }

    try {
      // create new mood entry with answers from form
      let moodQuery = await db.insert(mood).values(updateFields).returning();
      // update dailyTasks entry for today with corresponding mood id
      await db.update(dailyTasks).set({ mood_id: moodQuery[0].id }).where(eq(dailyTasks.id, userTasksQuery[0].id));

      return { success: true };
    } catch (e) {
      return fail(500, { message: "Error saving questionnaire" });
    }
  },
};

export const load = async ({ locals }) => {
  const user = locals.user;
  const userID = user[0].id;

  // redirect user if not logged in
  if (!user) {
    throw redirect(302, getDefaultRedirect());
  }

  let userTasksQuery = await db
    .select()
    .from(dailyTasks)
    .where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today)));

  // redirects to day page if user goes straight to /mood without daily task entry in table
  // or if meditation task hasn't been completed (won't trigger for non-mediation group as they'll have NULL)
  if (userTasksQuery.length === 0 || userTasksQuery[0].meditation === false) {
    throw redirect(302, "/day");
  }

  // Check if userTasksQuery[0].mood_id is null or not
  let moodQuery = [];
  if (userTasksQuery.length !== 0) {
    if (userTasksQuery[0].mood_id !== null) {
      // find the mood entry for today
      moodQuery = await db.select().from(mood).where(eq(mood.id, userTasksQuery[0].mood_id));
    }
  }

  return {
    title: "Mood Questionnaire",
    user: user,
    userTasks: userTasksQuery,
    mood: moodQuery[0],
  };
};
