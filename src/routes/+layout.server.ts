import { error } from "@sveltejs/kit";
import { GITHUB_ID } from "$env/static/private";

export const load = async ({ locals }: any) => {
	const data: any = { GITHUB_ID };

	if (locals.session) {
		const res = await fetch("https://api.github.com/user", {
			headers: {
				Accepts: "application/vnd.github+json",
				Authorization: `Bearer ${locals.session.access_token}`,
				"X-GitHub-Api-Version": "2022-11-28"
			}
		});

		data.github = await res.json();
	}

	return data;
};
