<script context="module">
	import pkg from 'lexical';

	const { createCommand } = pkg;
	/**
	 * @type {LexicalCommand<{altText:string, src:string}>}
	 */
	export const INSERT_IMAGE_COMMAND = createCommand();
</script>

<script>
	import {
		$getSelection as getSelection,
		$isRangeSelection as isRangeSelection,
		$isRootNode as isRootNode,
		COMMAND_PRIORITY_EDITOR
	} from 'lexical';

	import { onMount, getContext } from 'svelte';
	import { $createImageNode as createImageNode, ImageNode } from './ImageNode';

	const editor = getContext('editor');

	onMount(() => {
		if (!editor.hasNodes([ImageNode])) {
			throw new Error('ImagesPlugin: ImageNode not registered on editor');
		}

		return editor.registerCommand(
			INSERT_IMAGE_COMMAND,
			(payload) => {
				const selection = getSelection();
				if (isRangeSelection(selection)) {
					if (isRootNode(selection.anchor.getNode())) {
						selection.insertParagraph();
					}
					const imageNode = createImageNode({
						src: payload.detail.src,
						altText: payload.detail.altText,
						maxWidth: 500
					});
					selection.insertNodes([imageNode]);
				}
				return true;
			},
			COMMAND_PRIORITY_EDITOR
		);
	});
</script>
