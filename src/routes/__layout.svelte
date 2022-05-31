<script lang="ts">
	import '$lib/styles/app.css';
</script>

<div class="site-wrapper">
	<main>
		<slot />
	</main>
</div>

<style>
	main {
		min-height: 100vh;
	}
</style>
