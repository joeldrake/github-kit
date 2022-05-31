<script lang="ts">
	import { page } from '$app/stores';
	import { filesBasePath, filesRoute } from '$lib/constants';
	import File from '$lib/components/File.svelte';
	import Files from '$lib/components/Files.svelte';
	export let files: App.OctokitResponseItem[];
	export let file: App.OctokitResponseItem | null;
	let backUrl: string;
	$: {
		let stepBack = $page.url.pathname.split('/').slice(0, -1).join('/');
		backUrl = stepBack.length <= `${filesRoute}/${filesBasePath}`.length ? filesRoute : stepBack;
	}
</script>

<a href={backUrl}>Back</a>

{#if file}
	<File {file} />
{:else}
	<Files {files} />
{/if}

<style>
	a {
		display: inline-block;
		margin-bottom: 1rem;
	}
</style>
