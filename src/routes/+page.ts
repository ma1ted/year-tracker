import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
	const categories = await fetch("/api/categories").then((res) => res.json());

	return { categories };
}) satisfies PageLoad;
