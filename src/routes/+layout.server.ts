import { error } from '@sveltejs/kit';

export const load = (async ({ locals }: any) => {
	if (locals.session) {
		const res = await fetch("https://api.github.com/user", {
			headers: {
				"Accepts": "application/vnd.github+json",
				"Authorization": `Bearer ${locals.session.access_token}`,
				"X-GitHub-Api-Version": "2022-11-28"
			}
		});
		const data = await res.json();
		return data;
	}
});
