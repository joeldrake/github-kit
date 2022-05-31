<script lang="ts">
	import { authUrl, filesRoute } from '$lib/constants';
	import { getAuthenticated } from '$lib/utils/octokit';
	import { onMount } from 'svelte';

	let isLoggedIn = false;

	onMount(async () => {
		isLoggedIn = await getAuthenticated();
		console.log(isLoggedIn);
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
</div>

<style>
	.start {
		padding: 2rem;
	}
</style>
