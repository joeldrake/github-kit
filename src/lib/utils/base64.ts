import { browser } from '$app/env';
export function decode(str?: string) {
	if (!str || !browser) return '';
	return decodeURIComponent(escape(atob(str)));
}

export function encode(str?: string) {
	if (!str || !browser) return '';
	return btoa(unescape(encodeURIComponent(str)));
}
