<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { adr } from "$lib/adr.json";
    import AdrHelp from "$lib/components/AdrHelp.svelte";
    import AdrQuestion from "$lib/components/AdrQuestion.svelte";
    import AdrQuestionDisplay from "$lib/components/AdrQuestionDisplay.svelte";
    import { shuffle } from "$lib/helper";

    let questions = shuffle(adr).filter(q => q.examples.length > 0).map(mapQuestions);
    $: question = questions.at(0);

    let answer = "";
    let answered = false;

    /**
     * @param {{ number: string; description: string; examples: string[]; }} question
     */
    function mapQuestions(question) {
        const types = shuffle(adr.filter(a => a.number !== question.number));
        return {
            number: question.number,
            choices: shuffle([
                {
                    text: question.description,
                    answer: true
                },
                {
                    text: types.at(0).description,
                    answer: false,
                },
                {
                    text: types.at(1).description,
                    answer: false,
                }
            ]),
            example: shuffle(question.examples).at(0)
        };
    }

    function nextQuestion() {
        answered = false;
        answer = "";
        if(questions.length > 0) {
            questions = [...questions.slice(1)];
        } else {
            questions = shuffle(adr).filter(q => q.examples.length > 0).map(mapQuestions);
        }
    }

    function answerQuestion() {
        answered = true;
    }
</script>

<svelte:head>
    <title>ADR-Quiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2"> ADR-Quiz </h1>
    {#if question}
        {#if answered}
        <AdrQuestionDisplay {question} {answer}/>
        {:else}
        <AdrQuestion {question} bind:answer/>
        {/if}
    {/if}
    <div class="flex justify-center m-4">
        {#if answered}
        <button class="btn btn-primary btn-block lg:w-1/2" on:click={nextQuestion}> Weiter </button>
        {:else}
            {#if answer}
            <button class="btn btn-primary btn-block lg:w-1/2" on:click={answerQuestion}> Wählen </button>
            {:else}
            <button class="btn btn-primary btn-block btn-outline lg:w-1/2" on:click={answerQuestion}> Wählen </button>
            {/if}
        {/if}
    </div>
    {#if answered && answer !== question?.choices.find(c => c.answer)?.text}
    <AdrHelp/>
    {/if}
</div>