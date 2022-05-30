import type { RequestEvent } from '@sveltejs/kit/types/';
import { fetchFiles } from '$lib/api/fetchFiles';
import { cookiesFromRequest } from '$lib/utils/cookiesFromRequest';
import { octokitResponseFilter } from '$lib/utils/octokitResponseFilter';

export async function get({ request }: RequestEvent) {
	const accessToken = cookiesFromRequest(request)?.accessToken;

	const source = {
		owner: 'joeldrake',
		repo: 'github-kit',
		path: 'src/lib/markdown'
	};

	const response = await fetchFiles(source, accessToken);

	if (response?.status === 200) {
		//only filter out md files and folders
		let files, file;
		if (Array.isArray(response.data)) {
			files = (response.data as App.OctokitResponseItem[]).filter(octokitResponseFilter);
		} else {
			file = response.data as App.OctokitResponseItem;
		}
		return {
			body: { files, file }
		};
	}

	return {
		status: 404
	};
}
