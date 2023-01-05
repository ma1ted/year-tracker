import type { RequestHandler, RequestEvent } from "@sveltejs/kit";
import { createTable } from "$lib/db"

// :trol:
export const GET = (async ({ url }: RequestEvent) => {
    return new Response(await createTable());
}) satisfies RequestHandler;
