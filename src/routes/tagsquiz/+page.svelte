<script>
    import { flattendQuestions } from "$lib/data";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { quizHistory } from "$lib/stores";
    import { shuffle } from "$lib/helper";
    import Icon from "@iconify/svelte";
    import Question from "$lib/components/Question.svelte";
    import QuestionHelp from "$lib/components/QuestionHelp.svelte";
    import QuestionDisplay from "$lib/components/QuestionDisplay.svelte";

    const tags = [...new Set(flattendQuestions.reduce((/** @type {string[]} */acc, q) => [...acc, ...q.tags], []))]
        .sort((a, b) => a.localeCompare(b))
        .map(t => ({name: t, questions: flattendQuestions.filter(q => q.tags.some(tag => tag === t))}));

    /** @type { undefined | string }*/
    let selectedTag = undefined;
    let answer = "";
    let answered = false;

    /** @type {import("$lib/types").Question[]}*/
    let questions = [];

    /** @param { string | undefined } tag */
    function selectTag(tag) {
        selectedTag = tag;
        if(tag !== undefined)
            prepareQuestions();
    }

    function prepareQuestions() {
        let possibleQuestions = tags.find(t => t.name === selectedTag);
        if(!possibleQuestions || possibleQuestions.questions.length === 0)
            return;
        questions = shuffle(possibleQuestions.questions).map(q => ({...q, choices: shuffle(q.choices)}));
    }

    function answerQuestion() {
        answered = true;
        $quizHistory = [{question: questions[0], answer: answer, date: new Date(), type: "tagsquiz"}, ...$quizHistory];
    }

    function nextQuestion() {
        answered = false;
        if(questions.length > 1)
            questions = questions.slice(1);
        else
            reset();
    }

    function reset() {
        answer = "";
        answered = false;
        selectedTag = undefined;
    }
</script>

<svelte:head>
    <title> Schlagwortquiz - {PUBLIC_APP_NAME} </title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2"> Schlagwortquiz</h1>
    {#if !selectedTag}
    <p class="text-center mb-3 ">
        Beantworte Fragen wie im Endlosquiz, jedoch nach Schlagwörtern gruppiert.
        Fragen können meheren Schlagwörter zugeordnet sein.
        <br>
        <span class="font-semibold"> Wähle ein Schlagwort aus, um das Quiz zu starten. </span>
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {#each tags as tag}
        <div class="bg-base-200 p-2 rounded-md flex flex-row items-center gap-2">
            <button class="btn btn-primary btn-outline btn-square bg-base-100" on:click={() => selectTag(tag.name)}>
                <Icon icon="carbon:play-filled-alt"/>
            </button>
            <div class="flex-1 flex justify-between">
                <h3 class="font-semibold text-left break-words min-w-0"> {tag.name} </h3>
                <div class="flex justify-center items-center border-2 border-base-300 bg-base-100 w-10 h-10 rounded-full">
                    <span class="font-semibold"> {tag.questions.length} </span>
                </div>
            </div>
        </div>
        {/each}
    </div>
    {:else}
    <div>
        {#if questions.length > 0}
            {#if !answered}
                <Question question={questions[0]} bind:answer />
            {:else}
                <QuestionDisplay question={questions[0]} answer={answer}/>
            {/if}
            <div class="grid grid-cols-2 gap-2 mt-2">
                <button class="btn btn-error btn-outline" type="button" on:click={reset}>
                    Zurück
                </button>
                {#if !answered}
                    {#if answer}
                    <button class="btn btn-primary" type="button" on:click={answerQuestion}>
                        Wählen
                    </button>
                    {:else}
                    <button class="btn btn-primary btn-outline" type="button" on:click={answerQuestion}>
                        Wählen
                    </button>
                    {/if}
                {:else}
                    <button class="btn btn-primary" type="button" on:click={nextQuestion}>
                        Weiter
                    </button>
                {/if}
            </div>
            {#if answered}
            <div class="mt-4">
                <QuestionHelp question={questions[0]}/>
            </div>
            {/if}
        {/if}
    </div>
    {/if}
</div>