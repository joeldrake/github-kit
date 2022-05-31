import { browser } from '$app/env';

export function getToken() {
	if (!browser || !document?.cookie) return;
	const cookies = document.cookie.split('; ');
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === 'accessToken') {
			return value;
		}
	}
}
