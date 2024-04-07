<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
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
        $quizHistory = [{question: question, answer: answer, date: new Date()}, ...$quizHistory];
        answered = true;
        $quizQuestions = [...$quizQuestions.slice(1)];
    }
</script>

<svelte:head>
    <title>Quiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <div class="relative flex justify-between w-full">
        <h1 class="text-3xl flex-1 text-center font-semibold mb-2">Quiz</h1>
        <BookmarkButton class="absolute right-2 lg:right-0" {question}/>
    </div>
    <div class="mb-2">
        {#if answered}
        <QuestionDisplay question={question} answer={answer}/>
        {:else}
        <Question question={question} bind:answer/>
        {/if}
    </div>
    <div class="flex justify-center mb-4">
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