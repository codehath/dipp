// export const actions = {
//   add: async ({ request }) => {
//     const formData = await request.formData();

//     const username = formData.get("username");
//     const password = formData.get("password");
//     const start = formData.get("startDate");
//     const meditation = formData.get("meditation");

//     if (!username || !password || !start || !meditation) {
//       return fail(400, { message: "Input required" });
//     }

//     await db.insert(users).values({
//       username: username,
//       password: password,
//       start: start,
//       meditation: meditation,
//       high_dosage: true,
//     });

//     return { message: "Participant added successfully" };
//   },
// };

import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { redirect, fail } from "@sveltejs/kit";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "$lib/firebase/firebase";

export const load = async ({ locals }) => {
  // redirect user if not logged in as admin
  if (locals.user[0].id !== 0) {
    throw redirect(302, "/login");
  }
  return {
    title: "Admin",
  };
};

export const actions = {
  add: async ({ request }) => {
    try {
      const data = await request.formData();
      const username = data.get("username");
      const pass = data.get("password");
      const startDate = data.get("startDate");
      const meditation = data.get("meditation")?.toString();

      // Validate required fields
      if (!username || !pass || !startDate) {
        return fail(400, { message: "All fields are required" });
      }

      console.log("Create FireBase user");
      const email = username + "@dipp.com";

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        console.log("Created FB user");
        console.log("Meditation = ", meditation);

        // Add new entry to the users table
        await db.insert(users).values({
          username: username.toUpperCase(),
          password: pass,
          start_date: startDate,
          meditation: !!meditation,
          high_dosage: true,
        });

        console.log("Created PG user");
        return { success: true, message: "User created successfully" };
      } catch (firebaseError) {
        console.error("Firebase error:", firebaseError);
        return fail(400, { message: "Error creating user: " + firebaseError.message });
      }
    } catch (error) {
      console.error("Server error:", error);
      return fail(500, { message: "An unexpected error occurred" });
    }
  },
};
