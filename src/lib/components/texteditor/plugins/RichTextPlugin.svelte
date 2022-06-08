<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { registerRichText, type InitialEditorStateType } from '@lexical/rich-text';
	import type { LexicalEditor } from 'lexical';

	const editor: LexicalEditor = getContext('editor');
	export let initialEditorState: InitialEditorStateType;

	// returns callback to unregister
	onMount(() => registerRichText(editor, initialEditorState));

	// TODO: add Dragon support - registerDragonSupport(editor)
	// TODO: add support for placeholder text
	// TODO: take care of decorators - useDecorators(editor)
</script>
