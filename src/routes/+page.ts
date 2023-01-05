import type { PageLoad } from "./$types";

export const load = (async ({ fetch, parent }) => {
	const categories = await fetch("/api/categories").then((res) => res.json());

	const token = await parent();
	if (!token.session) return { days: [], categories };

	const days = await fetch("/api/days", { headers: { Authorization: "GitHub " + token.session.access_token } }).then(
		(res) => res.json()
	);
	console.info(days)

	return { days, categories };
}) satisfies PageLoad;
