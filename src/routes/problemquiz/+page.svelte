<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { shuffle } from '$lib/helper';
	import { quizHistory } from '$lib/stores';
	import Question from '$lib/components/Question.svelte';
	import QuestionHelp from '$lib/components/QuestionHelp.svelte';
	import QuestionDisplay from '$lib/components/QuestionDisplay.svelte';
	import { resolve } from '$app/paths';

	let questions = getPossibleQuestions();
	let currentIndex = $state(0);
	let answer = $state('');
	let answered = $state(false);

	function getPossibleQuestions() {
		/** @type {import('$lib/types').QuizHistory[]}*/
		let possibleQuestions = [];
		if ('quiz' in $quizHistory) possibleQuestions = [...$quizHistory['quiz']];
		if ('endless' in $quizHistory)
			possibleQuestions = [...possibleQuestions, ...$quizHistory['endless']];
		let questions = possibleQuestions
			.filter((h) => h.answer !== h.question.choices.find((c) => c.answer)?.text)
			.map((h) => h.question);
		questions = shuffle(
			questions.map((q) => ({
				...q,
				choices: shuffle(q.choices)
			}))
		);
		return questions;
	}

	function nextQuestion() {
		if (currentIndex + 1 > questions.length) currentIndex = 0;
		else currentIndex++;
		answer = '';
		answered = false;
	}

	function answerQuestion() {
		answered = true;
	}
</script>

<svelte:head>
	<title>Problemquiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-center text-3xl font-semibold">Problemquiz</h1>
	{#if questions.length > 0}
		<div class="mb-2">
			{#if !answered}
				<Question question={questions[currentIndex]} bind:answer />
			{:else}
				<QuestionDisplay question={questions[currentIndex]} {answer} showCatalog />
			{/if}
		</div>
		<div class="mb-4 grid grid-cols-2 gap-2">
			<a class="btn btn-soft" href={resolve('/')}> Zurück </a>
			{#if answered}
				<button class="btn btn-primary" onclick={nextQuestion}> Weiter </button>
			{:else if answer.length > 0}
				<button class="btn btn-primary" onclick={answerQuestion}> Wählen </button>
			{:else}
				<button class="btn btn-outline btn-primary" onclick={answerQuestion}> Wählen </button>
			{/if}
		</div>
		{#if answered}
			<QuestionHelp question={questions[currentIndex]} />
		{/if}
	{:else}
		<div class="text-center">Keine Problemfragen!</div>
	{/if}
</div>
