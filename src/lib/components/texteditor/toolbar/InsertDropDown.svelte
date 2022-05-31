<script>
	import { getContext } from 'svelte';
	import DropDown from './controls/DropDown.svelte';
	import { INSERT_IMAGE_COMMAND } from '../plugins/ImagePlugin.svelte';
	import InsertImageDialog, { open, close } from './InsertImageDialog.svelte';

	const editor = getContext('editor');
</script>

<DropDown
	buttonLabel="Insert"
	buttonIconClassName="icon plus"
	buttonClassName="toolbar-item spaced"
>
	<button
		on:click={() => {
			open();
		}}
		class="item"
	>
		<i class="icon image" />
		<span class="text">Image</span>
	</button>
</DropDown>

<InsertImageDialog
	on:confirm={(payload) => {
		close();
		editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
	}}
/>
