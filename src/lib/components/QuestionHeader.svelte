<script>
	import { asset } from '$app/paths';
	import { images } from '$lib/data.json';

	let { question, showCatalog } = $props();
</script>

<div class=" mb-2 flex flex-col text-center">
	<div class="text-base font-semibold lg:text-lg">
		{question.question}
	</div>
	{#if showCatalog}
		<span class="text-xs font-bold opacity-65 lg:text-sm">aus {question.catalog}</span>
	{/if}
	{#if question.image}
		<div class="mx-auto w-32 py-1">
			<img
				src={asset(`/img/${images.find((i) => i.id === question.image)?.file}`)}
				alt={images.find((i) => i.id === question.image)?.description}
			/>
		</div>
	{/if}
</div>
