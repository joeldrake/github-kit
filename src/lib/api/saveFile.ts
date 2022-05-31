import { Octokit } from 'octokit';
import { owner, repo } from '$lib/constants';

export async function saveFile({ path, message, content, sha, auth }: App.saveFileParams) {
	try {
		const octokit = new Octokit({ auth });

		const data = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
			owner,
			repo,
			path,
			message,
			content,
			sha
		});

		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}
