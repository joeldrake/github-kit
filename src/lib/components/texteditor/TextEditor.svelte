<script lang="ts">
	import { browser } from '$app/env';
	import {
		createEditor,
		$getRoot as getRoot,
		$getSelection as getSelection,
		$createParagraphNode as createParagraphNode,
		$createTextNode as createTextNode
	} from 'lexical';
	import { onMount, setContext } from 'svelte';
	import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
	import Toolbar from './ToolbarBasic.svelte';
	export let config = {
		theme: PlaygroundEditorTheme,
		nodes: [],
		onError: (error: any) => {
			throw error;
		}
	};
	let contentEditableElement: HTMLElement;
	const editor = createEditor(config);
	setContext('editor', editor);
	onMount(() => {
		editor.setRootElement(contentEditableElement);
		if (browser) initEditor();

		return () => {
			if (removeUpdateListener) removeUpdateListener();
		};
	});

	let removeUpdateListener: () => void;

	function initEditor() {
		editor.update(() => {
			// Get the RootNode from the EditorState
			const root = getRoot();
			console.log(root);

			// Get the selection from the EditorState
			const selection = getSelection();

			// Create a new ParagraphNode
			const paragraphNode = createParagraphNode();

			// Create a new TextNode
			const textNode = createTextNode('Hello world');

			// Append the text node to the paragraph
			paragraphNode.append(textNode);

			// Finally, append the paragraph to the root
			root.append(paragraphNode);
		});

		removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
			console.log(editorState);

			editorState.read(() => {
				// Just like editor.update(), .read() expects a closure where you can use
				// the $ prefixed helper functions.
			});
		});
	}

	// if (!browser) {
	// 	editor.update(() => {
	// 		console.log('test');
	// 		// Get the RootNode from the EditorState
	// 		const root = getRoot();

	// 		// Get the selection from the EditorState
	// 		const selection = getSelection();

	// 		// Create a new ParagraphNode
	// 		const paragraphNode = createParagraphNode();

	// 		// Create a new TextNode
	// 		const textNode = createTextNode('Hello world');

	// 		// Append the text node to the paragraph
	// 		paragraphNode.append(textNode);

	// 		// Finally, append the paragraph to the root
	// 		root.append(paragraphNode);
	// 	});
	// }
</script>

<div class="editor-shell">
	<Toolbar />
	<div class="editor-container">
		<div contenteditable="true" bind:this={contentEditableElement} class="ContentEditable__root" />
		<!-- slot for plugins -->
		<slot />
	</div>
</div>

<style>
	.ContentEditable__root {
		min-height: 150px;
		border: 0;
		resize: none;
		cursor: text;
		font-size: 15px;
		caret-color: rgb(5, 5, 5);
		display: block;
		position: relative;
		tab-size: 1;
		outline: 0;
		padding: 10px;
		overflow: auto;
		resize: vertical;
	}
</style>
