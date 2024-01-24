import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { mood } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";

const generatePassword = () => {
	return "pass";
};

function getRandomCoordinates() {
	const x = getRandomNumberInRange(-5, 5);
	const y = getRandomNumberInRange(-5, 5);
	return `${x},${y}`;
}

function getRandomNumberInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const seed = async ({}) => {
	const usersData = [
		{
			id: 0,
			username: "admin",
			password: "admin",
			meditation: false,
			high_dosage: false,
		},
		{
			username: "PI5AKN",
			password: generatePassword(),
			meditation: true,
			high_dosage: true,
		},
		{
			username: "P1BGSM",
			password: generatePassword(),
			meditation: false,
			high_dosage: true,
		},
		{
			username: "PBZ6BA",
			password: generatePassword(),
			meditation: true,
			high_dosage: false,
		},
		{
			username: "P8B45Q",
			password: generatePassword(),
			meditation: false,
			high_dosage: false,
		},
		{
			username: "user1",
			password: "pass",
			meditation: false,
			high_dosage: false,
		},
		{
			username: "user2",
			password: "pass",
			meditation: true,
			high_dosage: true,
		},
	];

	const journalPromptsData = [
		{
			title: "Day 1 Initial Impressions",
			prompt: "Reflect on how you feel about your upcoming psychedelic journey.",
		},
		{
			title: "Day 2 Emotional Preparedness",
			prompt: "What are your expectations about the emotional depth of your upcoming psychedelic experience?",
		},
		{
			title: "Day 3 Exploring Your Reasons",
			prompt: "Why are you drawn to having this psychedelic experience at this time? Explore your motivations.",
		},
		{
			title: "Day 4 Insights from Research",
			prompt: "Reflect on the information you've gathered about the effects of psychedelics. What were the most important learning points for you?",
		},
		{
			title: "Day 5 Past Experiences and Influence",
			prompt: "Consider how your previous life experiences might shape this psychedelic journey.",
		},
		{
			title: "Day 6 Embracing the Unknown",
			prompt: "How do you feel about the unpredictable aspects of psychedelic experiences?",
		},
		{
			title: "Day 7 Therapeutic Insights",
			prompt: "Have you had emotionally significant and supportive conversations about the upcoming experience? What insights did you gain from these conversations?",
		},
		{
			title: "Day 8 Openness to the Journey",
			prompt: "How have you opened yourself to accepting whatever happens during the psychedelic experience?",
		},
		{
			title: "Day 9 Navigating Challenges",
			prompt: "Think about how you might deal with difficult moments during your upcoming psychedelic experience.",
		},
		{
			title: "Day 10 Ready to Let Go",
			prompt: "Reflect on your readiness to surrender to the psychedelic experience.",
		},
		{
			title: "Day 11 Psychological Readiness",
			prompt: "Describe the steps you're taking to mentally prepare for your psychedelic experience.",
		},
		{
			title: "Day 12 Physical Preparedness",
			prompt: "Describe your thoughts and feelings about how psilocybin might physically affect you during the experience, focusing on sensations, comfort, and any expected bodily changes.",
		},
		{
			title: "Day 13 Trust and Connection",
			prompt: "How are you building trust and connection with those who will be with you during the experience?",
		},
		{
			title: "Day 14 Safety and Trust",
			prompt: "Reflect on your knowledge and confidence in the safety of the substance and the environment.",
		},
		{
			title: "Day 15 Trusting Yourself",
			prompt: "Describe the things about you that give you confidence in your ability to navigate this experience?",
		},
		{
			title: "Day 16 Anticipating Change",
			prompt: "What changes do you anticipate this experience might bring in you?",
		},
		{
			title: "Day 17 Preparatory Practices",
			prompt: "Describe your experiences with preparatory practices like meditation, yoga, or journaling.",
		},
		{
			title: "Day 18 Planning Post-Experience",
			prompt: "Reflect on your plans and support system for after the psychedelic experience.",
		},
		{
			title: "Day 19 Developing Coping Strategies",
			prompt: "Reflect on the strategies you might use to manage challenging moments during the experience.",
		},
		{
			title: "Day 20 Involving Loved Ones",
			prompt: "How have you engaged or informed your family and friends about this journey?",
		},
		{
			title: "Day 21 Final Intentions",
			prompt: "Reflect on your past 20 days of journaling to define your clear, final intention for the psychedelic experience.",
		},
	];

	const modulesData = [
		{
			name: "Knowledge and expectation",
			instructions: "Instructions 1",
			tasks: "Tasks 1",
			audio: "test-audio.m4a",
		},
		{
			name: "Psycho-physical readiness",
			instructions: "Instructions 2",
			tasks: "Tasks 2",
			audio: "meditation-2.m4a",
		},
		{
			name: "Safety planning",
			instructions: "Instructions 3",
			tasks: "Tasks 3",
			audio: "meditation-3.m4a",
		},
	];

	const moodData = [
		{
			id: 1,
			q1: 3,
			q2: 4,
			q3: 2,
			q4: 5,
			q5: 1,
			q6: 3,
			q7: 4,
			q8: getRandomCoordinates(),
			q9: 4,
		},
		{
			id: 11,
			q1: 2,
			q2: 3,
			q3: 1,
			q4: 4,
			q5: 5,
			q6: 2,
			q7: 3,
			q8: getRandomCoordinates(),
			q9: 2,
		},
		{
			id: 21,
			q1: 4,
			q2: 5,
			q3: 3,
			q4: 2,
			q5: 1,
			q6: 4,
			q7: 5,
			q8: getRandomCoordinates(),
			q9: 3,
		},
		{
			id: 31,
			q1: 1,
			q2: 4,
			q3: 5,
			q4: 3,
			q5: 2,
			q6: 1,
			q7: 2,
			q8: getRandomCoordinates(),
			q9: 5,
		},
		{
			id: 41,
			q1: 3,
			q2: 2,
			q3: 4,
			q4: 1,
			q5: 5,
			q6: 3,
			q7: 4,
			q8: getRandomCoordinates(),
			q9: 1,
		},
		{
			id: 51,
			q1: 5,
			q2: 1,
			q3: 3,
			q4: 4,
			q5: 2,
			q6: 5,
			q7: 1,
			q8: getRandomCoordinates(),
			q9: 4,
		},
		{
			id: 61,
			q1: 2,
			q2: 3,
			q3: 1,
			q4: 4,
			q5: 5,
			q6: 2,
			q7: 3,
			q8: getRandomCoordinates(),
			q9: 2,
		},
		{
			id: 71,
			q1: 4,
			q2: 5,
			q3: 3,
			q4: 2,
			q5: 1,
			q6: 4,
			q7: 5,
			q8: getRandomCoordinates(),
			q9: 3,
		},
		{
			id: 81,
			q1: 1,
			q2: 4,
			q3: 5,
			q4: 3,
			q5: 2,
			q6: 1,
			q7: 2,
			q8: getRandomCoordinates(),
			q9: 5,
		},
		{
			id: 91,
			q1: 3,
			q2: 2,
			q3: 4,
			q4: 1,
			q5: 5,
			q6: 3,
			q7: 4,
			q8: getRandomCoordinates(),
			q9: 1,
		},
	];

	const dailyData = [
		{
			day_number: 1,
			date: "2024-01-15",
			user_id: 1,
			journal:
				"Today was a great day! I spent time with friends and enjoyed a nice dinner.",
			meditation: true,
			mood_id: 1,
		},
		{
			day_number: 2,
			date: "2024-01-16",
			user_id: 1,
			journal:
				"Worked on a challenging project today. Feeling accomplished!",
			meditation: true,
			mood_id: 11,
		},
		{
			day_number: 3,
			date: "2024-01-17",
			user_id: 1,
			journal:
				"Had a relaxing day at home. Watched a movie and read a good book.",
			meditation: true,
			mood_id: 21,
		},
		{
			day_number: 4,
			date: "2024-01-18",
			user_id: 1,
			journal:
				"Met with a friend for coffee. It's always nice catching up.",
			meditation: true,
			mood_id: 31,
		},
		{
			day_number: 5,
			date: "2024-01-19",
			user_id: 1,
			journal:
				"Started a new hobby today – painting. It's so therapeutic!",
			meditation: true,
			mood_id: 41,
		},
		{
			day_number: 6,
			date: "2024-01-20",
			user_id: 1,
			journal:
				"Busy day at work. Feeling a bit stressed, but managed to stay focused.",
			meditation: true,
			mood_id: 51,
		},
		{
			day_number: 7,
			date: "2024-01-21",
			user_id: 1,
			journal: "Attended a yoga class in the morning. Feeling refreshed!",
			meditation: true,
			mood_id: 61,
		},
		{
			day_number: 8,
			date: "2024-01-22",
			user_id: 1,
			journal: "Spent the day outdoors hiking. Nature is so beautiful.",
			meditation: true,
			mood_id: 71,
		},
		{
			day_number: 9,
			date: "2024-01-23",
			user_id: 1,
			journal:
				"Celebrated a friend's birthday. Lots of laughter and good times.",
			meditation: true,
			mood_id: 81,
		},
		{
			day_number: 10,
			date: "2024-01-24",
			user_id: 1,
			journal:
				"Reflecting on the past 10 days. Grateful for the positive experiences.",
			meditation: true,
			mood_id: 91,
		},
	];

	// const dailyData = [
	// 	{
	// 		day_number: 3,
	// 		date: "2024-01-18",
	// 		user_id: 1,
	// 		journal: "Reflecting on the day's events.",
	// 		meditation: true,
	// 		mood_id: 5,
	// 	},
	// 	{
	// 		day_number: 2,
	// 		date: "2024-01-19",
	// 		user_id: 2,
	// 		journal: "Gratitude journaling.",
	// 		meditation: false,
	// 		mood_id: 8,
	// 	},
	// 	{
	// 		day_number: 4,
	// 		date: "2024-01-20",
	// 		user_id: 3,
	// 		journal: "Deep introspection today.",
	// 		meditation: true,
	// 		mood_id: 2,
	// 	},
	// 	{
	// 		day_number: 1,
	// 		date: "2024-01-21",
	// 		user_id: 4,
	// 		journal: "Enjoyed a peaceful meditation session.",
	// 		meditation: true,
	// 		mood_id: 6,
	// 	},
	// 	{
	// 		day_number: 5,
	// 		date: "2024-01-22",
	// 		user_id: 5,
	// 		journal: "Feeling energized and focused.",
	// 		meditation: false,
	// 		mood_id: 3,
	// 	},
	// 	// ... (add the rest of your data)
	// 	{
	// 		day_number: 3,
	// 		date: "2024-02-01",
	// 		user_id: 6,
	// 		journal: "Reflecting on personal growth.",
	// 		meditation: false,
	// 		mood_id: 9,
	// 	},
	// 	{
	// 		day_number: 2,
	// 		date: "2024-02-02",
	// 		user_id: 7,
	// 		journal: "Mindful moments throughout the day.",
	// 		meditation: true,
	// 		mood_id: 4,
	// 	},
	// 	{
	// 		day_number: 4,
	// 		date: "2024-02-03",
	// 		user_id: 8,
	// 		journal: "Challenging but productive day.",
	// 		meditation: true,
	// 		mood_id: 7,
	// 	},
	// 	{
	// 		day_number: 1,
	// 		date: "2024-02-04",
	// 		user_id: 9,
	// 		journal: "Grateful for positive interactions.",
	// 		meditation: false,
	// 		mood_id: 1,
	// 	},
	// 	{
	// 		day_number: 5,
	// 		date: "2024-02-05",
	// 		user_id: 10,
	// 		journal: "Finding joy in small moments.",
	// 		meditation: true,
	// 		mood_id: 10,
	// 	},
	// ];

	await db.insert(users).values(usersData);
	await db.insert(journalPrompts).values(journalPromptsData);
	await db.insert(modules).values(modulesData);
	await db.insert(mood).values(moodData);
	await db.insert(dailyTasks).values(dailyData);

	for (let i = 2; i < 7; i++) {
		const user2MoodData = Array.from({ length: 10 }, (_, index) => {
			const id = index * 10 + i; // Starting id from 2
			return {
				id,
				q1: getRandomNumberInRange(1, 5),
				q2: getRandomNumberInRange(1, 5),
				q3: getRandomNumberInRange(1, 5),
				q4: getRandomNumberInRange(1, 5),
				q5: getRandomNumberInRange(1, 5),
				q6: getRandomNumberInRange(1, 5),
				q7: getRandomNumberInRange(1, 5),
				q8: getRandomCoordinates(),
				q9: getRandomNumberInRange(1, 5),
			};
		});

		const user2DailyData = Array.from({ length: 10 }, (_, index) => {
			const dayNumber = index + 1;
			const date = new Date("2024-01-15");
			date.setDate(date.getDate() + dayNumber - 1); // Increment date for each entry
			const formattedDate = date.toISOString().split("T")[0];

			return {
				day_number: dayNumber,
				date: formattedDate,
				user_id: i,
				journal: `Journal entry for day ${dayNumber}.`,
				meditation: null,
				mood_id: index * 10 + i, // Starting mood_id from 2, 12, 22, ...
			};
		});

		await db.insert(mood).values(user2MoodData);
		await db.insert(dailyTasks).values(user2DailyData);
	}
};

export default seed;
