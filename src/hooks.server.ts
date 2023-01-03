import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private";
import { error } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }: any) => {
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

	    if (data.error) {
            console.error(data.error_description ?? data.error);
            return Response.redirect(event.url.origin);
        }

        event.locals.session = data;
    }

    return await resolve(event);
});
