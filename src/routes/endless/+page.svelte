<script>
    import { base } from "$app/paths";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import Question from "$lib/components/Question.svelte";
    import QuestionDisplay from "$lib/components/QuestionDisplay.svelte";
    import QuestionHelp from "$lib/components/QuestionHelp.svelte";
    import { flattendQuestions } from "$lib/data";
    import { shuffle } from "$lib/helper";
    import { endlessQuizQuestions, quizHistory } from "$lib/stores";

    if($endlessQuizQuestions.length === 0) {
        $endlessQuizQuestions = [...shuffle(flattendQuestions)];
    }
    let question = $endlessQuizQuestions.at(0);
    let answer = "";
    let answered = false;
    let streak = 0;

    function nextQuestion() {
        answered = false;
        if($endlessQuizQuestions.length <= 0) {
            $endlessQuizQuestions = [...shuffle(flattendQuestions)];
        }
        question = $endlessQuizQuestions.at(0);
        answer = "";
    }

    function answerQuestion() {
        $quizHistory = [{question: question, answer: answer, date: new Date(), type: "endless"}, ...$quizHistory];
        let correctChoice = question.choices.find((/** @type {{ answer: boolean; }} */ c) => c.answer);
        if(correctChoice && correctChoice.text === answer) {
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
    <div class="relative flex justify-between w-full">
        <h1 class="text-3xl flex-1 text-center font-semibold mb-2"> Endlosquiz </h1>
        <BookmarkButton class="absolute right-2 lg:right-0" {question}/>
    </div>
    <div class="mb-2">
        {#if answered}
        <QuestionDisplay question={question} answer={answer}/>
        {:else}
        <Question question={question} bind:answer/>
        {/if}
    </div>
    <div class="grid grid-cols-2 gap-2 mb-4">
        <a class="btn btn-outline" href={base + "/history"}> Verlauf </a>
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
    <div class="grid grid-cols-2">
        <div class="text-sm text-center mb-4">
            in Folge richtig:
            <span class="font-semibold">
                {streak}
            </span>
        </div>
    </div>
    <QuestionHelp question={question}/>
    {/if}
</div>