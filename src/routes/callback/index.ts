import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$lib/constants';
import type { RequestEvent } from '@sveltejs/kit/types/';

export async function get({ url }: RequestEvent) {
	const code = url.searchParams.get('code');

	console.log(code);

	if (code) {
		const access_token = await fetchToken(code);

		console.log(access_token);
		const future = new Date(Date.now() + 1000000000);
		return {
			status: 303,
			headers: {
				'set-cookie': [`accessToken=${access_token}; Expires=${future}`],
				location: '/'
			}
		};
	}

	// fallback
	return {
		status: 303,
		headers: {
			location: '/'
		}
	};
}

async function fetchToken(code: string) {
	const url = `https://github.com/login/oauth/access_token`;

	const postBody = {
		client_id: GITHUB_CLIENT_ID,
		client_secret: GITHUB_CLIENT_SECRET,
		code
	};

	const customHeaders = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postBody)
	};

	const res = await fetch(url, customHeaders);
	const text = await res.text();
	const data = new URLSearchParams(text);

	return data.get('access_token');
}
