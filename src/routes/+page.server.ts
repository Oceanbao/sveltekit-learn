import { redirect, fail } from '@sveltejs/kit';
import { PASSPHRASE } from '$env/static/private';
// import { env } from '$env/dynamic/private';
import * as db from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	// cookies.delete('allowed');
	if (cookies.get('allowed')) {
		throw redirect(307, '/welcome');
	}

	const id = cookies.get('userid');

	if (!id) {
		cookies.set('userid', crypto.randomUUID(), { path: '/' });
	}

	const todos = db.getTodos(id) ?? [];

	return {
		todos
	};
}) satisfies PageServerLoad;

// default OR named action
export const actions = {
	// default: async ({ cookies, request }) => {
	// 	const data = await request.formData();
	// 	db.createTodo(cookies.get('userid'), data.get('description'));
	// }
	create: async ({ cookies, request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();

		// return non-fail() action will be available in `form` prop
		try {
			db.createTodo(cookies.get('userid'), data.get('description'));
		} catch (error) {
			return fail(422, {
				description: data.get('description'),
				error: error.message
			});
		}
	},
	delete: async ({ cookies, request }) => {
		await new Promise((fulfil) => setTimeout(fulfil, 1000));

		const data = await request.formData();
		db.deleteTodo(cookies.get('userid'), data.get('id'));
	},
	env: async ({ request, cookies }) => {
		const data = await request.formData();

		// if (data.get('passphrase') === env.PASSPHRASE) {
		if (data.get('passphrase') === PASSPHRASE) {
			cookies.set('allowed', 'true', {
				path: '/'
			});

			throw redirect(303, '/welcome');
		}

		return fail(403, {
			incorrect: true
		});
	}
};

// page options: +page.ts +page.server.ts +layout.ts +layout.server.ts
// ssr, csr, prerender, trailingSlash
//
// This turns the entire app into SPA
// /+layout.server.ts
// export const ssr = false;
//
// This turns off client side javascript
// /+page.server.ts
// export const csr = false;
