<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { adr } from '$lib/adr.json';
	import AdrHelp from '$lib/components/adrquiz/AdrHelp.svelte';
	import AdrQuestion from '$lib/components/adrquiz/AdrQuestion.svelte';
	import AdrQuestionDisplay from '$lib/components/adrquiz/AdrQuestionDisplay.svelte';
	import { shuffle } from '$lib/helper';

	let questions = shuffle(adr)
		.filter((q) => q.examples.length > 0)
		.map(mapQuestions);
	let question = $state(questions.at(0));

	let answer = $state('');
	let answered = $state(false);

	/**
	 * @param {{ number: string; description: string; examples: string[]; }} question
	 */
	function mapQuestions(question) {
		const types = shuffle(adr.filter((a) => a.number !== question.number));
		return {
			number: question.number,
			choices: shuffle([
				{
					text: question.description,
					answer: true
				},
				{
					text: types.at(0).description,
					answer: false
				},
				{
					text: types.at(1).description,
					answer: false
				}
			]),
			example: shuffle(question.examples).at(0)
		};
	}

	function nextQuestion() {
		answered = false;
		answer = '';
		if (questions.length > 0) {
			questions = [...questions.slice(1)];
		} else {
			questions = shuffle(adr)
				.filter((q) => q.examples.length > 0)
				.map(mapQuestions);
		}
		question = questions.at(0);
	}

	function answerQuestion() {
		answered = true;
	}
</script>

<svelte:head>
	<title>ADR-Quiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-center text-3xl font-semibold">ADR-Quiz</h1>
	{#if answered}
		<AdrQuestionDisplay {question} {answer} />
	{:else}
		<AdrQuestion {question} bind:answer />
	{/if}
	<div class="m-4 flex justify-center">
		{#if answered}
			<button class="btn btn-block lg:w-1/2" onclick={nextQuestion}> Weiter </button>
		{:else if answer}
			<button class="btn btn-block btn-primary lg:w-1/2" onclick={answerQuestion}> Wählen </button>
		{:else}
			<button class="btn btn-block btn-soft btn-primary lg:w-1/2" onclick={answerQuestion}>
				Wählen
			</button>
		{/if}
	</div>
	{#if answered && answer !== question?.choices.find((c) => c.answer)?.text}
		<AdrHelp {question} />
	{/if}
</div>
