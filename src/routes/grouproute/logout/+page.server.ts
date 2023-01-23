import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies }) => {
		cookies.delete('logged_in', { path: '/grouproute' });
		throw redirect(307, '/');
	}
};

