<script>
	import QuestionResult from './QuestionResult.svelte';

	let { questions } = $props();

	let correctQuestions = $derived(
		questions.reduce(
			(
				/** @type {number} */ acc,
				/** @type {{ question: { choices: any[]; }; answer: any; }} */ q
			) => (q.question.choices.find((c) => c.answer)?.text === q.answer ? acc + 1 : acc),
			0
		)
	);
	let correctQuestionsProgress = $derived(Math.round((correctQuestions / questions.length) * 100));
	let onlyWrong = $state(true);
	let showedQuestions = $derived(
		questions.filter((/** @type {{ question: { choices: any[]; }; answer: any; }} */ e) =>
			onlyWrong ? e.question.choices.find((c) => c.answer)?.text !== e.answer : true
		)
	);
</script>

<div>
	<div class="mb-4 grid grid-cols-1 items-end gap-4 lg:grid-cols-3">
		<div>
			<div class="text-center text-lg font-bold">
				{questions.length}
			</div>
			<h3 class="text-center text-sm font-semibold opacity-70">Fragen</h3>
		</div>
		<div class="inline-flex flex-col gap-2">
			<div
				class="radial-progress self-center font-bold text-primary"
				style={`--value:${correctQuestionsProgress};`}
				role="progressbar"
			>
				{`${correctQuestionsProgress}%`}
			</div>
			<h3 class="text-center text-sm font-semibold opacity-70">richtige Antworten</h3>
		</div>
		<div>
			<div class="text-center text-lg font-bold">
				{questions.length - correctQuestions}
			</div>
			<h3 class="text-center text-sm font-semibold opacity-70">falsche Antworten</h3>
		</div>
	</div>
	<div class="divider"></div>
	<div class="relative mb-2 flex items-center justify-center">
		<h2 class="text-center text-xl font-semibold text-primary">Fragen</h2>
		<label class="absolute right-0 flex items-center gap-2 text-sm">
			nur Falsche
			<input class="toggle toggle-primary toggle-sm" type="checkbox" bind:checked={onlyWrong} />
		</label>
	</div>
	<div class="mb-2 flex flex-col gap-2">
		{#if showedQuestions.length > 0}
			{#each showedQuestions as entry (entry.question.id)}
				<QuestionResult question={entry.question} answer={entry.answer} />
			{/each}
		{:else}
			<div class="text-center">&vellip;</div>
		{/if}
	</div>
</div>
