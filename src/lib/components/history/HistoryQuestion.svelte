<script>
	/* eslint-disable svelte/no-navigation-without-resolve */
	import { resolve } from '$app/paths';
	import Icon from '@iconify/svelte';

	let { history } = $props();
</script>

<a
	class="flex items-center gap-1"
	target="_blank"
	rel="noopener noreferrer"
	href={resolve('/search') + `#question-${history.question.id}`}
>
	{#if history.question.choices.find((/** @type {{ answer: any; }} */ c) => c.answer)?.text === history.answer}
		<Icon
			class="h-5 w-5 flex-none rounded-full border border-base-200 text-success"
			icon="carbon:checkmark-filled"
		/>
	{:else}
		<Icon
			class="h-5 w-5 flex-none rounded-full border border-base-200 text-error"
			icon="carbon:close-filled"
		/>
	{/if}
	<span class="flex-auto truncate"> {history.question.question} </span>
	<span class="flex-none text-sm opacity-70"> aus {history.question.catalog} </span>
</a>
