<script>
	import BlockTypeDropDown from './toolbar/BlockTypeDropDown.svelte';
	import BoldButton from './toolbar/BoldButton.svelte';
	import RedoButton from './toolbar/RedoButton.svelte';
	import UndoButton from './toolbar/UndoButton.svelte';
	import ItalicButton from './toolbar/ItalicButton.svelte';
	import StrikethroughButton from './toolbar/StrikethroughButton.svelte';
	import FormatCodeButton from './toolbar/FormatCodeButton.svelte';
	import InsertDropDown from './toolbar/InsertDropDown.svelte';
	import StateStoreUpdater from './StateStoreUpdater.svelte';
</script>

<div class="toolbar">
	<UndoButton />
	<RedoButton />

	<div class="divider" />

	<BlockTypeDropDown />

	<div class="divider" />

	<BoldButton />
	<ItalicButton />
	<StrikethroughButton />
	<FormatCodeButton />

	<div class="divider" />

	<InsertDropDown />

	<div class="divider" />
</div>
<StateStoreUpdater />
