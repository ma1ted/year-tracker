import type { Handle } from "@sveltejs/kit";
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private";
import { getDayInfo, initialiseUser } from "$lib/db";

export const handle = (async ({ event, resolve }: any) => {
	//#region Transform a GitHub code into an access token.

	const code = event.url.searchParams.get("code");
	if (code) {
		const res = await fetch("https://github.com/login/oauth/access_token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				client_id: GITHUB_ID,
				client_secret: GITHUB_SECRET,
				code
			})
		});
		const data = await res.json();

		if (data.error) return await resolve(event);

		event.locals.session = data;
	}

	//#endregion

	//#region Transform a GitHub access token into a user object.

	if (!event.locals.github && event.locals.session) {
		const res = await fetch("https://api.github.com/user", {
			headers: {
				Accepts: "application/vnd.github+json",
				Authorization: `Bearer ${event.locals.session.access_token}`,
				"X-GitHub-Api-Version": "2022-11-28"
			}
		});

		event.locals.github = await res.json();
	}

	//#endregion

	//#region Create a user on the database if they do not already exist.
	if (event.url.pathname.startsWith("/api/days")) {
		const token = event.request.headers.get("Authorization")

		if (!token) return new Response("No token provided", { status: 400 });

		const tokenSplit = token.split(" ");
		if (tokenSplit.length !== 2) return new Response("Invalid token provided", { status: 401 });

		let id: string;
		switch (tokenSplit[0]) {
			case "GitHub":
				const github = await fetch("https://api.github.com/user", {
					headers: {
						Accepts: "application/vnd.github+json",
						Authorization: `Bearer ${tokenSplit[1]}`,
						"X-GitHub-Api-Version": "2022-11-28"
					}
				}).then((res) => res.json());

				if (!github.id) return new Response("Invalid token provided", { status: 401 });

				id = "gh-" + github.id;

				break;

			default:
				return new Response("Invalid token provider prepended to authorization token", { status: 400 });
		}

		const dayInfo = await getDayInfo(id).then((res) => res);
		if (dayInfo.length === 0) initialiseUser(id);
		event.locals.userId = id;
	}

	//#endregion

	return await resolve(event);
}) satisfies Handle;
