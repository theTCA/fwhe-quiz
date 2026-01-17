<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { shuffle } from '$lib/helper';
	import { catalogues } from '$lib/data.json';
	import { flattendQuestions } from '$lib/data';
	import Question from '$lib/components/Question.svelte';
	import QuizResult from '$lib/components/QuizResult.svelte';
	import { quizQuestions, quizHistory } from '$lib/stores';
	import { onMount } from 'svelte';

	let numberOfQuestions = $state(15);
	/**
	 * @type {string[]}
	 */
	let selectedCatalogues = $state([]);

	let started = $state(false);

	/**
	 * @type {import("$lib/types").Question | undefined}
	 */
	let question = $state(undefined);
	/**
	 * @type {import("$lib/types").Question[]}
	 */
	let questions = $state([]);

	/** @type {string | undefined}*/
	let answer = $state(undefined);

	let answered = $state(false);
	let ended = $state(false);

	onMount(() => {
		if ($quizQuestions.length > 0) {
			questions = [
				...$quizQuestions
					.filter((/** @type {{answered: boolean}} */ e) => !e.answered)
					.map((/** @type {{ question: import("$lib/types").Question}} */ e) => e.question)
			];
			if (questions.length > 0) {
				question = questions.shift();
				answer = '';
				answered = false;
				started = true;
				ended = false;
			} else {
				$quizQuestions = [];
			}
		}
	});

	function start() {
		let possibleQuestions = flattendQuestions
			.filter((q) => selectedCatalogues.includes(q.catalog))
			.map((q) => ({ ...q, choices: shuffle(q.choices) }));
		shuffle(possibleQuestions);
		questions = possibleQuestions.slice(0, numberOfQuestions);
		$quizQuestions = [...questions].map((q) => ({ question: q, answer: '', answered: false }));
		answered = false;
		answer = '';
		question = questions.shift();
		started = true;
		ended = false;
	}

	function nextQuestion() {
		answered = false;
		answer = '';
		if (questions.length > 0) question = questions.shift();
		else ended = true;
	}

	function answerQuestion() {
		if (question) {
			if (!('quiz' in $quizHistory)) $quizHistory['quiz'] = [];
			$quizHistory['quiz'] = [
				{ question: question, answer: answer || '', date: new Date() },
				...$quizHistory['quiz']
			];
			let quizQuestion = $quizQuestions.find(
				(/** @type {{ question: import("$lib/types").Question }} */ e) =>
					e.question.id === question?.id
			);
			if (!quizQuestion) {
				return;
			}
			quizQuestion.answer = answer || '';
			quizQuestion.answered = true;
			$quizQuestions = $quizQuestions;
		}
		answered = true;
		nextQuestion();
	}

	function toMenu() {
		started = false;
		answered = false;
		ended = false;
		$quizQuestions = [];
	}

	function selectAll() {
		if (selectedCatalogues.length > 0) selectedCatalogues = [];
		else selectedCatalogues = catalogues.map((c) => c.name);
	}

	function setNumberOfQuestions(/** @type {number} */ value) {
		if (numberOfQuestions + value > 0) numberOfQuestions += value;
		else numberOfQuestions = 1;
	}
</script>

<svelte:head>
	<title>Quiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-center text-3xl font-semibold">Quiz</h1>
	{#if !started}
		<div class="mb-4 flex flex-col gap-2">
			<div>
				<h3 class="mb-2 font-semibold">Anzahl Fragen</h3>
				<div class="join">
					<button
						class="btn join-item btn-sm"
						type="button"
						onclick={() => (numberOfQuestions = 1)}
					>
						Min
					</button>
					<button
						class="btn join-item btn-sm"
						type="button"
						onclick={() => setNumberOfQuestions(-1)}
					>
						-1
					</button>
					<input
						class="input input-sm join-item w-full text-center lg:w-auto"
						min={1}
						type="number"
						bind:value={numberOfQuestions}
					/>
					<button
						class="btn join-item btn-sm"
						type="button"
						onclick={() => setNumberOfQuestions(1)}
					>
						+1
					</button>
					<button
						class="btn join-item btn-sm"
						type="button"
						onclick={() => setNumberOfQuestions(5)}
					>
						+5
					</button>
				</div>
			</div>
			<div>
				<h3 class="mb-2 font-semibold">Fragenkataloge</h3>
				<div class="flex flex-col gap-2">
					<div class="mb-2 grid grid-cols-1 gap-2 lg:grid-cols-2">
						<label
							class="label flex cursor-pointer items-center gap-2 rounded-md bg-base-200 p-2 select-none"
						>
							<input
								class="checkbox rounded-full bg-base-100 text-primary"
								type="checkbox"
								checked={catalogues.length === selectedCatalogues.length}
								onclick={selectAll}
							/>
							<span class="text-base-content"> Alle </span>
						</label>
					</div>
					<div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
						{#each catalogues as catalog (catalog.name)}
							<label
								class="label flex cursor-pointer items-center gap-2 rounded-md bg-base-200 p-2 select-none"
							>
								<input
									class="checkbox rounded-full bg-base-100 text-primary"
									type="checkbox"
									value={catalog.name}
									bind:group={selectedCatalogues}
								/>
								<span class="text-base-content"> {catalog.name} </span>
							</label>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="mb-4 flex justify-center">
			{#if selectedCatalogues.length > 0 && numberOfQuestions > 0}
				<button class="btn w-[50%] btn-primary" type="button" onclick={start}>Start</button>
			{:else}
				<button class="btn w-[50%]" type="button" disabled>Start</button>
			{/if}
		</div>
	{:else}
		{#if question && !ended}
			<Question {question} bind:answer />
			<div class="mt-2 mb-4 grid w-full grid-cols-2 gap-2">
				<button class="btn btn-outline btn-error" type="button" onclick={() => (ended = true)}
					>Abbrechen</button
				>
				{#if answered}
					<button class="btn btn-primary" type="button" onclick={nextQuestion}>Weiter</button>
				{:else if answer && answer.length > 0}
					<button class="btn btn-primary" type="button" onclick={answerQuestion}>Wählen</button>
				{:else}
					<button class="btn btn-outline btn-primary" type="button" onclick={answerQuestion}
						>Wählen</button
					>
				{/if}
			</div>
		{/if}
		{#if ended}
			<QuizResult questions={[...$quizQuestions]} />
			<div class="mb-4 grid w-full grid-cols-2 gap-2">
				<button class="btn btn-outline btn-error" type="button" onclick={toMenu}>Zurück</button>
				<button class="btn btn-primary" type="button" onclick={start}>Erneut</button>
			</div>
		{/if}
	{/if}
</div>
