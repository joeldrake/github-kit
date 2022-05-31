<script lang="ts">
	import { filesBasePath } from '$lib/constants';
	import File from '$lib/components/File.svelte';
	import Files from '$lib/components/Files.svelte';
	export let files: App.OctokitResponseItem[];
	export let file: App.OctokitResponseItem | null;
</script>

<a href="/">Start</a>

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
