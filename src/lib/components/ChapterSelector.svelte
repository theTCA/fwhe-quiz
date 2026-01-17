<script>
	import Icon from '@iconify/svelte';

	let { chapter, select, reset } = $props();
</script>

<div class="flex flex-row items-center gap-2 rounded-md bg-base-200 p-2">
	{#if chapter.questions.length === chapter.length}
		<div class="text-success">
			<Icon class="btn-square p-2.5" icon="mdi:check" />
		</div>
	{:else}
		<button class="btn btn-square btn-soft btn-primary" onclick={() => select(chapter.name)}>
			<Icon icon="carbon:play-filled-alt" />
		</button>
	{/if}
	<div class="flex-1">
		<h3 class="min-w-0 text-left font-semibold wrap-break-word">{chapter.name}</h3>
		{#if chapter.questions.length === chapter.length}
			<progress
				class="progress progress-success"
				value={chapter.questions.length}
				max={chapter.length}
			></progress>
		{:else}
			<progress
				class="progress progress-primary"
				value={chapter.questions.length}
				max={chapter.length}
			></progress>
		{/if}
	</div>
	<button class="btn btn-square btn-soft" onclick={() => reset(chapter.name)}>
		<Icon icon="material-symbols:refresh" />
	</button>
</div>
