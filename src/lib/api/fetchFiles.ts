import { Octokit } from 'octokit';
import { owner, repo } from '$lib/constants';

export async function fetchFiles(path: string, auth: string) {
	try {
		const octokit = new Octokit({ auth });

		const data = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
			owner,
			repo,
			path
		});

		return data;
	} catch (error) {
		console.log(error);
	}
}
