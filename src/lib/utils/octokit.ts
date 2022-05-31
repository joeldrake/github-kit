/* eslint-disable no-empty */
import { Octokit } from 'octokit';
import { getToken } from '$lib/utils/getToken';

const octokit = new Octokit({ auth: getToken() });

export async function getAuthenticated() {
	let login = false;
	try {
		login = !!(await (await octokit.rest.users.getAuthenticated()).data.login);
	} catch {}

	return login;
}
