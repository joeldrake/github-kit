<script lang="ts">
	export let files: App.OctokitResponseItem[] | App.OctokitResponseItem | undefined;
</script>

<a href="/files">Files</a>

{#if files}
	<pre>{JSON.stringify(files, null, 2)}</pre>
{:else}
	<p>Could not find files</p>
{/if}
