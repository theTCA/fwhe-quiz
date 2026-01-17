<script>
	import AdrHeader from './AdrHeader.svelte';

	let { question, answer = $bindable() } = $props();
</script>

<div class="flex flex-col gap-2">
	<AdrHeader {question} />
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
				/>
				<div class="text-sm lg:text-base">
					{choice.text}
				</div>
			</label>
		{/each}
	</div>
</div>
