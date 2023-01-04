import type { RequestHandler } from "@sveltejs/kit";
import { GITHUB_ID } from "$env/static/private";

export const load = (async ({ locals }: any) => {
	return { GITHUB_ID, session: locals.session, github: locals.github } as any;
}) satisfies RequestHandler;
