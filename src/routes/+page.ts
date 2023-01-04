import type { PageLoad } from "./$types";

export const load = (async ({ fetch, parent }) => {
	const categories = await fetch("/api/categories").then((res) => res.json());

	const token = await parent();
	if (!token.session) return { days: [], categories };

	const days = fetch("/api/days", { headers: { Authorization: "GitHub " + token.session.access_token } }).then(
		(res) => res.json()
	);

	return { days, categories };
}) satisfies PageLoad;
