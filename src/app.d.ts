/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}

	export interface saveFileParams {
		path: string;
		message: string;
		content: string;
		sha?: string;
		auth: string;
	}
	export type OctokitResponseItem = {
		type: string;
		size: number;
		name: string;
		path: string;
		content?: string;
		sha: string;
		url: string;
		git_url: string | null;
		html_url: string | null;
		download_url: string | null;
		_links: {
			self: string;
			git: string;
			html: string;
		};
	};
}
