import { browser } from '$app/env';
export let GITHUB_CLIENT_ID: string | undefined;
export let GITHUB_CLIENT_SECRET: string | undefined;

if (!browser && process?.env?.VERCEL === '1') {
	GITHUB_CLIENT_ID = process?.env?.GITHUB_CLIENT_ID;
	GITHUB_CLIENT_SECRET = process?.env?.GITHUB_CLIENT_SECRET;
} else {
	GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
	GITHUB_CLIENT_SECRET = import.meta.env.VITE_GITHUB_CLIENT_SECRET;
}

export const siteUrl = 'http://localhost:3000';
export const scopes = 'repo user';
export const redirect_uri = siteUrl + '/callback';
export const authUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${GITHUB_CLIENT_ID}&scope=${encodeURIComponent(
	scopes
)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
