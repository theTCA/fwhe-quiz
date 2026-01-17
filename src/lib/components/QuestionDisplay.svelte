<script>
	import Icon from '@iconify/svelte';
	import QuestionHeader from './QuestionHeader.svelte';

	let { question, answer = null, showCatalog = false } = $props();
</script>

<div>
	<QuestionHeader {question} {showCatalog} />
	<div class="flex flex-col gap-3">
		{#each question.choices as choice (choice.text)}
			<div class="flex items-center gap-2 rounded-md border-2 border-base-200 px-1.5 py-3">
				{#if choice.answer}
					<Icon
						class="h-6 w-6 rounded-full border border-primary text-success"
						icon="carbon:checkmark-filled"
					/>
				{:else if answer === choice.text}
					<Icon
						class="h-6 w-6 rounded-full border border-primary text-error"
						icon="carbon:close-filled"
					/>
				{:else}
					<span class="h-6 w-6 rounded-full border border-primary"></span>
				{/if}
				<div class="flex-1 text-sm lg:text-base">
					{choice.text}
				</div>
			</div>
		{/each}
	</div>
</div>
