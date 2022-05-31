import type { RequestEvent } from '@sveltejs/kit/types/';
import { saveFile } from '$lib/api/saveFile';
import { cookiesFromRequest } from '$lib/utils/cookiesFromRequest';
// import { filesBasePath, filesRoute } from '$lib/constants';

export async function post({ request }: RequestEvent) {
	const auth = cookiesFromRequest(request)?.accessToken;

	const { path, sha, message, content }: Omit<App.saveFileParams, 'auth'> = await request.json();

	const response = await saveFile({ path, sha, message, content, auth });

	if (response?.status === 200) {
		return {
			body: { status: true }
		};
	}

	return {
		status: 403
	};
}
