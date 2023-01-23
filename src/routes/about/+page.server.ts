// This shows redirect.
// This API can be called inside load, form action, API routes, and handle hooks
// 303 (form action, suivant success submission)
// 307 (for temporary redirects)
// 308 (for permanent redirects)
import { redirect } from '@sveltejs/kit';

// This makes /about redirect to /expected
export function load() {
	throw redirect(307, '/expected');
}
