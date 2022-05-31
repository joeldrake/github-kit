import type { RequestEvent } from '@sveltejs/kit/types/';
import { fetchFiles } from '$lib/api/fetchFiles';
import { cookiesFromRequest } from '$lib/utils/cookiesFromRequest';
import { octokitResponseFilter } from '$lib/utils/octokitResponseFilter';
import { filesBasePath } from '$lib/constants';

export async function get({ request }: RequestEvent) {
	const accessToken = cookiesFromRequest(request)?.accessToken;

	const response = await fetchFiles(filesBasePath, accessToken);

	if (response?.status === 200) {
		let files = [] as App.OctokitResponseItem[];
		let file = null as App.OctokitResponseItem | null;
		if (Array.isArray(response.data)) {
			//only filter out md files and folders
			files = (response.data as App.OctokitResponseItem[]).filter(octokitResponseFilter);
		} else {
			file = response.data as App.OctokitResponseItem;
		}
		return {
			body: { files, file }
		};
	}

	return {
		status: 403
	};
}
