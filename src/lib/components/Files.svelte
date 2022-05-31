<script lang="ts">
	import Folder from '$lib/components/icons/folder.svelte';
	import File from '$lib/components/icons/file.svelte';
	import { filesRoute } from '$lib/constants';
	export let files: App.OctokitResponseItem[];
</script>

{#if files.length}
	<div class="files">
		{#each files as _file}
			<div class="file_link_wrapper">
				<a href={`${filesRoute}/${_file.path}`} class="file_link">
					{#if _file.type === 'dir'}
						<Folder />
					{:else}
						<File />
					{/if}

					<div class="file_link_name">
						{_file.name}
					</div>
				</a>
			</div>
		{/each}
	</div>
{:else}
	<p>No files in this folder...</p>
{/if}

<style>
	.file_link_wrapper {
		border-bottom: 1px solid var(--color-border);
	}

	.file_link {
		padding: 0.5rem 0;
		display: inline-flex;
		gap: 1rem;
		align-items: center;
		max-width: 100%;
	}

	.file_link_name {
		max-width: calc(100% - 1rem);
		overflow-wrap: break-word;
	}
	.file_link :global(svg) {
		min-width: 16px;
	}
</style>
