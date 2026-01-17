<script>
	import QuestionHeader from './QuestionHeader.svelte';

	let { question, showCatalog = true, answer = $bindable(''), disabled = false } = $props();
</script>

<div>
	<QuestionHeader {question} {showCatalog} />
	<div class="flex flex-col gap-3">
		{#each question.choices as choice (choice.text)}
			<label
				class="flex cursor-pointer items-center gap-2 rounded-md border-2 border-base-200 px-1.5 py-3"
			>
				<input
					class="radio radio-primary"
					type="radio"
					value={choice.text}
					bind:group={answer}
					checked={false}
					{disabled}
				/>
				<div class="text-sm select-none lg:text-base">
					{choice.text}
				</div>
			</label>
		{/each}
	</div>
</div>
