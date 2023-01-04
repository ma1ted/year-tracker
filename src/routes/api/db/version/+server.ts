import type { RequestHandler, RequestEvent } from "@sveltejs/kit";
import { getPostgresVersion } from "$lib/db";

// :trol:
export const GET = (async ({ url }: RequestEvent) =>
	new Response(
		await getPostgresVersion().then(([{ version }]) => version)
	)) satisfies RequestHandler;
