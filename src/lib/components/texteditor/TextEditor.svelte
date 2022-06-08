<script lang="ts">
	import './global.css';
	import { createEventDispatcher } from 'svelte';

	import { createEditor, type EditorState } from 'lexical';

	import {
		$convertFromMarkdownString as convertFromMarkdownString,
		$convertToMarkdownString as convertToMarkdownString
	} from '@lexical/markdown';

	import { CUSTOM_TRANSFORMERS } from './MarkdownTransformers';

	import RichTextPlugin from './plugins/RichTextPlugin.svelte';
	import CodePlugin from './plugins/CodePlugin.svelte';
	import HistoryPlugin from './plugins/HistoryPlugin.svelte';
	import ListPlugin from './plugins/ListPlugin.svelte';
	import ImagePlugin from './plugins/ImagePlugin.svelte';
	import HorizontalRulePlugin from './plugins/HorizontalRulePlugin.svelte';

	import { HeadingNode, QuoteNode } from '@lexical/rich-text';
	import { ListItemNode, ListNode } from '@lexical/list';
	import { CodeNode, CodeHighlightNode } from '@lexical/code';
	import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
	import { LinkNode } from '@lexical/link';
	import { ImageNode } from './plugins/ImageNode';
	import { HorizontalRuleNode } from './plugins/HorizontalRuleNode';
	import { registerTableCommands } from './tabelCommands';

	import { onMount, setContext } from 'svelte';
	import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
	import Toolbar from './Toolbar.svelte';

	export let initialMarkdown: string;
	export let isSaving = false;

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
			CodeHighlightNode,
			TableCellNode,
			TableNode,
			TableRowNode,
			HorizontalRuleNode
		],
		onError: (error: any) => {
			throw error;
		}
	};

	let contentEditableElement: HTMLElement;
	const editor = createEditor(config);
	const dispatch = createEventDispatcher();

	setContext('editor', editor);
	onMount(() => {
		editor.setRootElement(contentEditableElement);
		registerTableCommands(editor);
	});

	function initialEditorState() {
		convertFromMarkdownString(initialMarkdown, CUSTOM_TRANSFORMERS);

		//const markdown = convertToMarkdownString(TRANSFORMERS);
		//console.log(markdown);
	}

	function handleSaveClick() {
		editor.update(() => {
			const markdown = convertToMarkdownString(CUSTOM_TRANSFORMERS);
			dispatch('save', markdown);
		});
	}
</script>

<div class="editor-shell">
	<Toolbar />
	<div class="editor-container">
		<div contenteditable="true" bind:this={contentEditableElement} class="ContentEditable__root" />
		<!-- slot for plugins -->
		<RichTextPlugin {initialEditorState} />
		<CodePlugin />
		<HistoryPlugin />
		<ListPlugin />
		<ImagePlugin />
		<HorizontalRulePlugin />
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
