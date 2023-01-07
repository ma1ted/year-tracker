import type { RequestHandler, RequestEvent } from "@sveltejs/kit";
import { actions } from "$lib/actions";

// :trol:
export const GET = (async ({ url }: RequestEvent) =>
	new Response(
		JSON.stringify(
			actions.map((v: any) => {
				return { label: v.label, id: v.id };
			})
		)
	)) satisfies RequestHandler;
