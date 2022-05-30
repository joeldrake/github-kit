import { getToken } from '$lib/utils/getToken';
import { Octokit } from 'octokit';

export async function fetchFiles(
	inputs: {
		owner: string;
		repo: string;
		path: string;
	},
	token?: string
) {
	try {
		const octokit = new Octokit({
			auth: token || getToken()
		});

		const data = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', inputs as any);

		return data;
	} catch (error) {
		console.log(error);
	}
}
