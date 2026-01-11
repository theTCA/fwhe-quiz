<script>
	import { page } from '$app/state';
	import { PUBLIC_APP_NAME } from '$env/static/public';
</script>

<svelte:head>
	<title>Error {page.status} - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div class="flex h-full w-full flex-col items-center justify-center gap-2">
	<div class="flex h-60 w-60 items-center justify-center rounded-full border-8 border-base-300">
		<h2 class="text-6xl font-bold text-primary">{page.status}</h2>
	</div>
	<div class="text-lg font-semibold">
		{page.error?.message}
	</div>
</div>
