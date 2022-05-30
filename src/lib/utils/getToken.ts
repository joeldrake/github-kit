export function getToken() {
	if (!document?.cookie) return;
	const cookies = document.cookie.split('; ');
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === 'accessToken') {
			return value;
		}
	}
}
