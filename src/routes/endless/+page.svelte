<script>
	import { resolve } from '$app/paths';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import BookmarkButton from '$lib/components/BookmarkButton.svelte';
	import Question from '$lib/components/Question.svelte';
	import QuestionDisplay from '$lib/components/QuestionDisplay.svelte';
	import QuestionHelp from '$lib/components/QuestionHelp.svelte';
	import { flattendQuestions } from '$lib/data';
	import { shuffle } from '$lib/helper';
	import { endlessQuizQuestions, quizHistory } from '$lib/stores';

	if ($endlessQuizQuestions.length === 0) {
		$endlessQuizQuestions = [...shuffle(flattendQuestions)];
	}
	let question = $state($endlessQuizQuestions[0]);
	let answer = $state('');
	let answered = $state(false);
	let streak = $state(0);

	function nextQuestion() {
		answered = false;
		if ($endlessQuizQuestions.length <= 0) {
			$endlessQuizQuestions = [...shuffle(flattendQuestions)];
		}
		question = $endlessQuizQuestions[0];
		answer = '';
	}

	function answerQuestion() {
		if (!question) return;
		if ('endless' in $quizHistory) {
			$quizHistory['endless'] = [
				{ question: question, answer: answer, date: new Date() },
				...$quizHistory['endless']
			];
		} else {
			$quizHistory = {
				...$quizHistory,
				endless: [{ question: question, answer: answer, date: new Date() }]
			};
		}
		let correctChoice = question.choices.find((/** @type {{ answer: boolean; }} */ c) => c.answer);
		if (correctChoice && correctChoice.text === answer) {
			streak += 1;
		} else {
			streak = 0;
		}
		answered = true;
		$endlessQuizQuestions = [...$endlessQuizQuestions.slice(1)];
	}
</script>

<svelte:head>
	<title>Endlosquiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<div class="relative flex w-full justify-between">
		<h1 class="mb-2 flex-1 text-center text-3xl font-semibold">Endlosquiz</h1>
		<BookmarkButton class="absolute right-2 lg:right-0" {question} />
	</div>
	<div class="mb-2">
		{#if answered}
			<QuestionDisplay {question} {answer} showCatalog />
		{:else}
			<Question {question} bind:answer />
		{/if}
	</div>
	<div class="mb-4 grid grid-cols-2 gap-2">
		<a class="btn" href={resolve('/')}> Zurück </a>
		{#if answered}
			<button class="btn btn-primary" onclick={nextQuestion}> Weiter </button>
		{:else if answer.length > 0}
			<button class="btn btn-primary" onclick={answerQuestion}> Wählen </button>
		{:else}
			<button class="btn btn-outline btn-primary" onclick={answerQuestion}> Wählen </button>
		{/if}
	</div>
	{#if answered}
		<div class="grid grid-cols-2">
			<div class="mb-4 text-center text-sm">
				in Folge richtig:
				<span class="font-semibold">
					{streak}
				</span>
			</div>
		</div>
		<QuestionHelp {question} />
	{/if}
</div>
