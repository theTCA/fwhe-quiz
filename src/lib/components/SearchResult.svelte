<script>
	import Icon from '@iconify/svelte';

	let { question, onclick } = $props();
</script>

<button
	id={'question-' + question.id}
	class="btn h-full w-full rounded-md shadow-md"
	type="button"
	{onclick}
>
	<div class="m-4 flex w-full flex-col gap-1 font-light">
		<div class="text-left font-semibold">{question.question}</div>
		<div class="flex flex-col items-start gap-0.5 text-xs">
			{#each question.choices as choice (choice.text)}
				<div class="flex items-center gap-1">
					{#if choice.answer}
						<Icon
							class="size-3 flex-none rounded-full border border-primary text-success"
							icon="carbon:checkmark-filled"
						/>
					{:else}
						<span class="size-3 flex-none rounded-full border border-primary"></span>
					{/if}
					<span class="text-left">{choice.text}</span>
				</div>
			{/each}
		</div>
		<div class="flex gap-2">
			{#each question.tags as tag (tag)}
				<span class="badge badge-soft badge-xs">{tag}</span>
			{/each}
		</div>
	</div>
</button>
