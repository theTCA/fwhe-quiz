<script>
    import Question from "$lib/components/Question.svelte";
    import QuestionDisplay from "$lib/components/QuestionDisplay.svelte";
    import QuestionHelp from "$lib/components/QuestionHelp.svelte";
    import { flattendQuestions } from "$lib/data";
    import { shuffle } from "$lib/helper";
    import { quizQuestions, quizHistory } from "$lib/stores";

    if($quizQuestions.length === 0) {
        $quizQuestions = [...shuffle(flattendQuestions)];
    }
    let question = $quizQuestions.at(0);
    let answer = "";
    let answered = false;

    function nextQuestion() {
        answered = false;
        if($quizQuestions.length <= 0) {
            $quizQuestions = [...shuffle(flattendQuestions)];
        }
        question = $quizQuestions.at(0);
        answer = "";
    }

    function answerQuestion() {
        $quizHistory = [...$quizHistory, {question: question, answer: answer, date: new Date()}];
        answered = true;
        $quizQuestions = [...$quizQuestions.slice(1)];
    }
</script>

<svelte:head>
    <title>Quiz - HFLÜ-Trainer</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Quiz</h1>
    <div class="mb-2">
        {#if answered}
        <QuestionDisplay question={question} answer={answer}/>
        {:else}
        <Question question={question} bind:answer/>
        {/if}
    </div>
    <div class="flex justify-center mb-4">
        <div></div>
        {#if answered}
        <button class="btn btn-primary btn-block lg:w-1/2" on:click={nextQuestion}> Weiter </button>
        {:else}
        <button class="btn btn-primary btn-block lg:w-1/2" on:click={answerQuestion}> Wählen </button>
        {/if}
    </div>
    {#if answered}
    <QuestionHelp question={question}/>
    {/if}
</div>