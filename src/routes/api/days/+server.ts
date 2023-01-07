import type { RequestHandler, error } from "@sveltejs/kit";
import { getDayInfo, initialiseUser } from "$lib/db";
import { actions } from "$lib/actions";

export const GET = (async ({ request, locals }: any) => {
	const userId = locals.userId;

	// Idk why request.url.searchParams doesn't exist!
	const url = new URL(request.url);
	let month = Number(url.searchParams.get("month"));
	const day = Number(url.searchParams.get("day"));

	if (month === 0) return new Response("Days and months should be 1-indexed.", { status: 400 });

	if (!userId)
		return new Response("No token in the <provider>-<token> format was found in the locals", {
			status: 401
		});
	if (!month) return new Response("No month URL parameter found", { status: 400 });
	if (!day) return new Response("No day URL parameter found", { status: 400 });

	// Convert month to 0-indexed for JavaScript's Date class`.
	month -= 1;

	//#region Date validation

	// Validate day and month.
	const date = new Date(new Date().getFullYear(), month, day);
	if (date.getMonth() !== month || date.getDate() !== day) {
		return new Response("Invalid date provided", { status: 400 });
	}

	// Make sure the day is not in the future.
	// Allow 1 day of leeway for timezone differences.
	if (date > new Date(new Date().setDate(new Date().getDate() + 1))) {
		return new Response("You can not edit a day in the future", { status: 400 });
	}

	// Make sure the date is this year.
	if (date.getFullYear() !== new Date().getFullYear()) {
		return new Response("You can not edit a day from a previous year", { status: 400 });
	}

	// Make sure the date is not more than 7 days ago.
	if (date < new Date(new Date().setDate(new Date().getDate() - 7))) {
		return new Response("You can not edit a day more than 7 days ago", { status: 400 });
	}

	//#endregion

	const dayInfo = await getDayInfo(userId, month, day).then((res: any) => res[0]);
	if (!dayInfo) {
		// Initialise the user's day.
		await initialiseUser(userId, month, day);

		// Generate a zeroed day.
		return new Response(`{${actions.map((action) => `"${action.id}": 0`).join(",")}}}`);
	} else {
		return new Response(JSON.stringify(dayInfo));
	}
}) satisfies RequestHandler;

export const PATCH = (async ({ request, locals }: any) => {
	const body = await request.json();

	const token = request.headers.get("Authorization");

	if (!token) {
		return new Response("No token provided", { status: 401 });
	}

	const tokenSplit = token.split(" ");

	if (tokenSplit.length !== 2) {
		return new Response("Invalid token provided", { status: 401 });
	}

	switch (tokenSplit[0]) {
		case "GitHub":
			const res = await fetch("https://api.github.com/user", {
				headers: {
					Accepts: "application/vnd.github+json",
					Authorization: `Bearer ${tokenSplit[1]}`,
					"X-GitHub-Api-Version": "2022-11-28"
				}
			});

			const data = await res.json();
			// console.log(data);

			if (!data.id) {
				return new Response("Invalid token provided", { status: 401 });
			}

			// Test data.
			const dayInfo = {
				day: 1, // 1-indexed day number
				month: 1, // 1-indexed month number
				activities: [
					// activity IDs from /api/categories
					{ id: "outside", value: 1 },
					{ id: "shit", value: 1 },
					{ id: "piss", value: 2 }
				]
			};

			//#region Date validation

			// Validate day and month.
			const date = new Date(new Date().getFullYear(), dayInfo.month, dayInfo.day);
			if (date.getMonth() !== dayInfo.month || date.getDate() !== dayInfo.day) {
				return new Response("Invalid date provided", { status: 400 });
			}

			// Make sure the day is not in the future.
			// Allow 1 day of leeway for timezone differences.
			if (date > new Date(new Date().setDate(new Date().getDate() + 1))) {
				return new Response("You can not edit a day in the future", { status: 400 });
			}

			// Make sure the date is this year.
			if (date.getFullYear() !== new Date().getFullYear()) {
				return new Response("You can not edit a day from a previous year", { status: 400 });
			}

			// Make sure the date is not more than 7 days ago.
			if (date < new Date(new Date().setDate(new Date().getDate() - 7))) {
				return new Response("You can not edit a day more than 7 days ago", { status: 400 });
			}

			//#endregion

			//#region Activity validation

			// Make sure the activity IDs are valid.

			// Get the activity IDs from the database.

			//#endregion

			break;

		default:
			return new Response("Invalid token provided", { status: 401 });
	}

	// if (body.access_token) {
	//     return new Response(JSON.stringify({ success: true }));
	// }

	return new Response("hi");
}) satisfies RequestHandler;
