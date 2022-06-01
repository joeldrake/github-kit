<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit/types/';
	export async function load({ fetch }: LoadEvent) {
		const data = await fetch('/api/load-markdown');
		const { html, frontmatter } = await data.json();

		return {
			props: {
				html,
				frontmatter
			}
		};
	}
</script>

<script lang="ts">
	import '$lib/styles/github-dark.css';
	import { authUrl, filesRoute } from '$lib/constants';
	import { getAuthenticated } from '$lib/utils/octokit';
	import { onMount } from 'svelte';

	export let html: string;
	export let frontmatter: any;

	let isLoggedIn = false;

	onMount(async () => {
		isLoggedIn = await getAuthenticated();
	});
</script>

<div class="start">
	<h1>Github API test</h1>

	{#if isLoggedIn}
		<p>
			<a href={filesRoute}>files</a>
		</p>
	{:else}
		<p>
			<a href={authUrl}>Auth</a>
		</p>
	{/if}

	<div>{@html html}</div>
</div>

<style>
	.start {
		padding: 2rem;
	}

	.start :global(table) {
		border-collapse: collapse;
	}
	.start :global(th) {
		padding: 0 1rem;
	}
	.start :global(td) {
		border: 1px solid var(--color-border);
		padding: 0.5rem 1rem;
	}
</style>
