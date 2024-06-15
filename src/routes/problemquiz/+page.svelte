<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { shuffle } from "$lib/helper";
    import { quizHistory } from "$lib/stores";
    import Question from "$lib/components/Question.svelte";
    import QuestionHelp from "$lib/components/QuestionHelp.svelte";
    import QuestionDisplay from "$lib/components/QuestionDisplay.svelte";
    import { base } from "$app/paths";

    let questions = getPossibleQuestions();
    let currentIndex = 0;
    let answer = "";
    let answered = false;

    function getPossibleQuestions() {
        let possibleQuestions = $quizHistory.filter((/** @type {import("$lib/types").QuizHistory} */ h) => h.answer !== h.question.choices.find(c => c.answer)?.text).map((/** @type {import("$lib/types").QuizHistory} */ h) => h.question);
        possibleQuestions = shuffle(possibleQuestions.map((/** @type {import("$lib/types").Question} */ q) => ({...q, choices: shuffle(q.choices)})));
        return possibleQuestions;
    }

    function nextQuestion() {
        if(currentIndex + 1 > questions.length)
            currentIndex = 0;
        else
            currentIndex++;
        answer = ""
        answered = false;
    }

    function answerQuestion() {
        answered = true;
    }
</script>

<svelte:head>
    <title> Problemquiz - { PUBLIC_APP_NAME } </title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2"> Problemquiz </h1>
    <div class="mb-2">
        {#if !answered}
        <Question question={questions[currentIndex]} bind:answer/>
        {:else}
        <QuestionDisplay question={questions[currentIndex]} {answer}/>
        {/if}
    </div>
    <div class="grid grid-cols-2 gap-2 mb-4">
        <a class="btn btn-outline" href={base + "/history"}> Zurück </a>
        {#if answered}
        <button class="btn btn-primary" on:click={nextQuestion}> Weiter </button>
        {:else}
        {#if answer.length > 0}
        <button class="btn btn-primary" on:click={answerQuestion}> Wählen </button>
        {:else}
        <button class="btn btn-primary btn-outline" on:click={answerQuestion}> Wählen </button>
        {/if}
        {/if}
    </div>
    {#if answered}
    <QuestionHelp question={questions[currentIndex]}/>
    {/if}
</div>