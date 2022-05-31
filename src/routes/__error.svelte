<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit/types/';
	export function load({ error, status }: LoadEvent) {
		return {
			props: {
				status: status,
				message: error?.message ?? null
			}
		};
	}
</script>

<script lang="ts">
	export let status: string;
	export let message: string;
</script>

<div class="error">
	<h1>Error {status}</h1>
	<p>
		{message}
	</p>
</div>

<style>
	.error {
		padding: 2rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow-wrap: break-word;
	}

	p {
		max-width: 100%;
	}
</style>
