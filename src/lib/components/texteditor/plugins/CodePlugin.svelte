<script>
	import { onMount, getContext } from 'svelte';
	import { registerCodeHighlighting } from '@lexical/code';

	const editor = getContext('editor');

	// returns callback to unregister
	onMount(() => registerCodeHighlighting(editor));
</script>
