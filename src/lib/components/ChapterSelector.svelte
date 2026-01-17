<script>
	import Icon from '@iconify/svelte';

	let { chapter, select, reset } = $props();
</script>

<div class="flex flex-row items-center gap-2 rounded-md bg-base-200 p-2">
	<div class="flex-none">
		{#if chapter.questions.length === chapter.length}
			<div class="p-2 text-success">
				<Icon class="size-6" icon="mdi:check" />
			</div>
		{:else}
			<button class="btn btn-square btn-soft btn-primary" onclick={() => select(chapter.name)}>
				<Icon icon="carbon:play-filled-alt" />
			</button>
		{/if}
	</div>
	<div class="flex-auto">
		<div class="tooltip" data-tip={chapter.name}>
			<h3 class="line-clamp-1 text-sm font-semibold wrap-anywhere text-ellipsis lg:text-base">
				{chapter.name}
			</h3>
		</div>
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
	<div class="flex-none">
		<button class="btn btn-square btn-soft" onclick={() => reset(chapter.name)}>
			<Icon icon="material-symbols:refresh" />
		</button>
	</div>
</div>
