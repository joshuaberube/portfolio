<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="preload"
		href="/fonts/proxima-nova/regular.otf"
		as="font"
		type="font/otf"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/proxima-nova/bold.otf"
		as="font"
		type="font/otf"
		crossorigin="anonymous"
	/>
</svelte:head>

{@render children()}
