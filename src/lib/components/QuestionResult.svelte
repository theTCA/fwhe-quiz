<script>
	/* eslint-disable svelte/no-navigation-without-resolve */
	import { resolve } from '$app/paths';
	import Icon from '@iconify/svelte';

	/** @type {{question: import('$lib/types').Question, answer:string}}*/
	let { question, answer } = $props();
</script>

<a
	class="flex items-center gap-1 rounded-md bg-base-200 p-1"
	target="_blank"
	href={resolve('/search') + `#question-${question.id}`}
>
	{#if question.choices.find((c) => c.answer)?.text === answer}
		<Icon
			class="h-6 w-6 rounded-full border border-base-200 text-success"
			icon="carbon:checkmark-filled"
		/>
	{:else}
		<Icon
			class="h-6 w-6 rounded-full border border-base-200 text-error"
			icon="carbon:close-filled"
		/>
	{/if}
	<div class="flex flex-1 flex-col text-left">
		<h3 class="mb-1 font-semibold">
			{question.question}
		</h3>
		<div class="p-2 pt-0 pl-1 text-sm">
			<span class="mr-1 font-semibold">Antwort:</span>{answer.length > 0 ? answer : '-'}
		</div>
	</div>
</a>
