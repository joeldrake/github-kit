<script lang="ts">
	export let files: App.OctokitResponseItem[] | App.OctokitResponseItem | undefined;
	export let file: App.OctokitResponseItem | undefined;
</script>

<a href="/">Start</a>

{#if files}
	{#each files as _file}
		<div>
			<a href={`/files/${_file.path}`}>{_file.name}</a>
		</div>
	{/each}
	<pre>{JSON.stringify(files, null, 2)}</pre>
{:else}
	<p>Could not find files</p>
{/if}
