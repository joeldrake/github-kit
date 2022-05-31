<script lang="ts">
	import { authUrl, filesRoute } from '$lib/constants';
</script>

<div class="start">
	<h1>Github API test</h1>
	<p>
		<a href={authUrl}>Auth</a>
	</p>
	<p>
		<a href={filesRoute}>files</a>
	</p>
</div>

<style>
	.start {
		padding: 2rem;
	}
</style>
