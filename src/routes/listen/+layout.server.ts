import db from "$lib/server/db";
import { dailyTasks, modules, dayData } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { getDefaultRedirect } from "$lib/utils/helperFunctions";
import { getDay, getModuleID, getTodaysDate } from "$lib/utils/helperFunctions";

const today = getTodaysDate().toISOString();
console.log("Today's date:", today);

export const load = async ({ locals }) => {
  console.log("Starting load function");

  const user = locals.user;
  console.log("User data:", user);

  const userID = user[0].id;
  const startDate = user[0].start_date;
  const moduleID = getModuleID(startDate);
  console.log("User ID:", userID);
  console.log("Start date:", startDate);
  console.log("Module ID:", moduleID);

  // redirect user if not logged in
  if (!user) {
    console.log("No user found, redirecting");
    throw redirect(302, getDefaultRedirect());
  }

  console.log("Querying day data");
  const dayDataQuery = await db
    .select()
    .from(dayData)
    .where(eq(dayData.id, getDay(startDate)));
  console.log("Day data query result:", dayDataQuery);

  console.log("Querying module data");
  const moduleQuery = await db.select().from(modules).where(eq(modules.id, moduleID));
  console.log("Module query result:", moduleQuery);

  console.log("Querying user tasks");
  let userTasksQuery = await db
    .select()
    .from(dailyTasks)
    .where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today)));
  console.log("User tasks query result:", userTasksQuery);

  // redirects to day page if user goes straight to /meditate without daily task entry in table
  if (userTasksQuery.length === 0) {
    console.log("No daily tasks found, redirecting to /day");
    throw redirect(302, "/day");
  }

  console.log("Audio file path:", dayDataQuery[0].audio);

  let title = "Meditation";
  let file = dayDataQuery[0].audio;

  if (!Boolean(user[0].meditation)) {
    console.log("User in control group, setting music file");
    title = "Music";
    file = dayDataQuery[0].control;
  }

  console.log("Returning data:", {
    title,
    user,
    file,
    meditated: userTasksQuery[0].meditation,
  });

  return {
    title: title,
    user: user,
    file: file,
    meditated: userTasksQuery[0].meditation,
  };
};
