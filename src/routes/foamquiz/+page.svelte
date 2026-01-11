<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import FoamHelp from '$lib/components/foamquiz/FoamHelp.svelte';
	import FoamQuestion from '$lib/components/foamquiz/FoamQuestion.svelte';
	import Icon from '@iconify/svelte';
	import { quizTypes, generateQuestions } from '$lib/foam';
	import { shuffle } from '$lib/helper';

	let selectionCollapsed = $state(true);
	let compactView = $state(false);
	let selectedTypes = $state([...quizTypes.map((t) => t.id)]);
	const questions = shuffle(generateQuestions());
	let filteredQuestions = $state(questions.filter((q) => selectedTypes.includes(q.type.id)));
	let question = $derived(filteredQuestions[0]);

	let answer = $state('');
	let answered = $state(false);

	function answerQuestion() {
		answered = true;
	}

	function nextQuestion() {
		answer = '';
		answered = false;
		filteredQuestions = [...filteredQuestions.slice(1)];
	}
</script>

<svelte:head>
	<title>Schaumquiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<div class="relative mb-2 flex w-full justify-between">
		<h1 class="mb-2 flex-1 text-center text-3xl font-semibold">Schaumquiz</h1>
	</div>
	<div class="relative mb-4">
		<h2 class="mb-1 text-center text-2xl font-semibold">Quiztyp</h2>
		<label class="btn swap absolute top-0 left-0 btn-sm">
			<input type="checkbox" bind:checked={selectionCollapsed} />
			<Icon class="swap-on" icon="bx:right-arrow" />
			<Icon class="swap-off" icon="bx:up-arrow" />
		</label>
		{#if !selectionCollapsed}
			<div class="grid grid-cols-1 items-center gap-2 lg:grid-cols-3">
				{#each quizTypes as type (type.id)}
					<input
						class="btn"
						aria-label={type.name}
						type="checkbox"
						value={type.id}
						bind:group={selectedTypes}
					/>
				{/each}
			</div>
			<div class="mt-2 flex justify-end">
				<label class="btn swap">
					<input type="checkbox" bind:checked={compactView} />
					<Icon class="swap-on" icon="solar:text-bold" />
					<Icon class="swap-off" icon="octicon:number-16" />
				</label>
			</div>
		{:else if question}
			<h2 class="text-center text-lg font-semibold">{question.type.name}</h2>
		{/if}
	</div>
	{#if filteredQuestions.length > 0}
		<div class="flex flex-col justify-center gap-2">
			<FoamQuestion {question} {compactView} />
			<form class="flex flex-col items-center gap-2 border-t-2 border-t-base-300 p-2">
				{#if !answered}
					<div class="flex w-full flex-col gap-2 lg:w-1/2">
						<input
							class="input w-full self-center text-center text-lg"
							type="text"
							bind:value={answer}
						/>
						<span class="text-center font-semibold"> {question.type.answerUnit} </span>
					</div>
				{:else if question.answer === answer}
					<div class="flex w-full flex-col items-center gap-2 text-center font-semibold">
						<div class="relative flex h-10 items-center justify-center rounded-md border lg:w-1/2">
							<Icon
								class="absolute left-1 h-6 w-6 rounded-full text-success"
								icon="carbon:checkmark-filled"
							/>
							<span class="overflow-x-auto text-lg text-success"> {answer} </span>
						</div>
						<span> {question.type.answerUnit} </span>
					</div>
				{:else}
					<div class="flex w-full flex-col items-center gap-2 text-center font-semibold">
						<div class="relative flex h-10 items-center justify-center rounded-md border lg:w-1/2">
							<Icon
								class="absolute left-1 h-6 w-6 rounded-full text-error"
								icon="carbon:close-filled"
							/>
							<span class="overflow-x-auto text-lg text-error"> {answer ? answer : '-'} </span>
						</div>
						<span> {question.type.answerUnit} </span>
					</div>
				{/if}
				<div class="mt-3 flex w-full justify-center lg:w-1/2">
					<button
						class="btn w-full btn-outline btn-primary"
						type="submit"
						onclick={() => (answered ? nextQuestion() : answerQuestion())}
					>
						{#if !answered}
							Wählen
						{:else}
							Weiter
						{/if}
					</button>
				</div>
			</form>
			{#if answered}
				<FoamHelp {question} />
			{/if}
		</div>
	{:else}
		<div class="text-center text-lg font-semibold">Kein Fragetyp ausgewählt!</div>
	{/if}
</div>
