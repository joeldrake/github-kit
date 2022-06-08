<script lang="ts">
	import { decode, encode } from '$lib/utils/base64';
	import ExternalLink from '$lib/components/icons/external-link.svelte';
	import TextEditor from '$lib/components/texteditor/TextEditor.svelte';
	export let file: App.OctokitResponseItem;

	let textarea: HTMLTextAreaElement;
	let isSaving = false;

	let originalContent = decode(file.content);

	async function handleSave(e: CustomEvent) {
		textarea.value = e.detail;
		save(e.detail);
	}

	async function handleSaveClick() {
		save(textarea.value);
	}

	async function save(markdown: string) {
		isSaving = true;

		try {
			const content = encode(markdown);
			const data: Omit<App.saveFileParams, 'auth'> = {
				path: file.path,
				sha: file.sha,
				message: 'Saved file',
				content
			};

			const response = await fetch('/api/savefile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const result = await response.json();

			if (!result?.status) {
				textarea.value = originalContent;
				alert('Failed to save file');
			} else {
				alert('File successfully saved');
			}
		} catch (e) {
			console.error(e);
		}
		isSaving = false;
	}
</script>

<div class="file">
	<h1 class="file-name">
		{file.name} <a href={file.html_url} target="_blank"><ExternalLink /></a>
	</h1>

	<TextEditor initialMarkdown={originalContent} on:save={handleSave} />

	<textarea bind:this={textarea}>{originalContent}</textarea>

	<button disabled={isSaving} on:click={handleSaveClick}>{isSaving ? 'Sparar...' : 'Spara'}</button>
</div>

<style>
	.file-name {
		display: flex;
		font-size: 2rem;
	}
	.file-name a {
		display: flex;
		align-items: flex-start;
		margin-left: 0.5rem;
	}

	textarea {
		width: 100%;
		height: 70vh;
		resize: vertical;
		border: 1px solid var(--color-border);
		padding: 1rem;
	}
</style>
