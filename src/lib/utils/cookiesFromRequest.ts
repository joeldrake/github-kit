import cookie from 'cookie';
export function cookiesFromRequest(request: Request) {
	const cookies_raw = request.headers.get('cookie');
	if (cookies_raw) return cookie.parse(cookies_raw);
	return;
}
