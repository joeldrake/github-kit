<script lang="ts">
	import './global.css';
	import { createEventDispatcher } from 'svelte';
	import {
		$convertFromMarkdownString as convertFromMarkdownString,
		$convertToMarkdownString as convertToMarkdownString,
		TRANSFORMERS
	} from '@lexical/markdown';

	import RichTextPlugin from './plugins/RichTextPlugin.svelte';
	import CodePlugin from './plugins/CodePlugin.svelte';
	import HistoryPlugin from './plugins/HistoryPlugin.svelte';
	import ListPlugin from './plugins/ListPlugin.svelte';
	import ImagePlugin from './plugins/ImagePlugin.svelte';

	import { HeadingNode, QuoteNode } from '@lexical/rich-text';
	import { ListItemNode, ListNode } from '@lexical/list';
	import { CodeNode, CodeHighlightNode } from '@lexical/code';
	import { LinkNode } from '@lexical/link';
	import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
	import { ImageNode } from './plugins/ImageNode';

	import { createEditor } from 'lexical';
	import { onMount, setContext } from 'svelte';
	import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
	import Toolbar from './Toolbar.svelte';

	export let config = {
		theme: PlaygroundEditorTheme,
		nodes: [
			HeadingNode,
			LinkNode,
			ListNode,
			ListItemNode,
			QuoteNode,
			ImageNode,
			CodeNode,
			CodeHighlightNode
		],
		onError: (error: any) => {
			throw error;
		}
	};
	export let initialEditorState: string;
	export let isSaving = false;
	let contentEditableElement: HTMLElement;
	const editor = createEditor(config);
	const dispatch = createEventDispatcher();

	setContext('editor', editor);
	onMount(() => {
		editor.setRootElement(contentEditableElement);
		initEditor();
	});

	function initEditor() {
		//registerRichText(editor);

		editor.update(() => {
			convertFromMarkdownString(initialEditorState, TRANSFORMERS);
			const markdown = convertToMarkdownString(TRANSFORMERS);
			console.log(markdown);
		});
	}

	function handleSaveClick() {
		editor.update(() => {
			const markdown = convertToMarkdownString(TRANSFORMERS);
			dispatch('save', markdown);
		});
	}
</script>

<div class="editor-shell">
	<Toolbar />
	<div class="editor-container">
		<div contenteditable="true" bind:this={contentEditableElement} class="ContentEditable__root" />
		<!-- slot for plugins -->
		<RichTextPlugin />
		<CodePlugin />
		<HistoryPlugin />
		<ListPlugin />
		<ImagePlugin />
	</div>
	<button disabled={isSaving} on:click={handleSaveClick}>{isSaving ? 'Sparar...' : 'Spara'}</button>
</div>

<style>
	.ContentEditable__root {
		height: 50vh;
		cursor: text;
		padding: 1rem;
		position: relative;
		tab-size: 1;
		outline: 0;
		overflow: auto;
		resize: vertical;
	}
</style>
