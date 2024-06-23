<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import FoamHelp from "$lib/components/FoamHelp.svelte";
    import FoamQuestion from "$lib/components/FoamQuestion.svelte";
    import Icon from "@iconify/svelte";
    import {quizTypes, generateQuestions} from "$lib/foam";
    import { shuffle } from "$lib/helper";

    let selectionCollapsed = true;
    let compactView = false;
    $: selectedTypes = [...quizTypes.map(t => t.id)];
    const questions = shuffle(generateQuestions());
    $: filteredQuestions = questions.filter(q => selectedTypes.includes(q.type.id));
    $: question = filteredQuestions[0];

    let answer = "";
    let answered = false;

    function answerQuestion() {
        answered = true;
    }

    function nextQuestion() {
        answer = "";
        answered = false;
        filteredQuestions = [...filteredQuestions.slice(1)];
    }
</script>

<svelte:head>
    <title> Schaumquiz - {PUBLIC_APP_NAME} </title>
</svelte:head>

<div>
    <div class="relative flex justify-between w-full mb-2">
        <h1 class="text-3xl flex-1 text-center font-semibold mb-2"> Schaumquiz </h1>
    </div>
    <div class="relative mb-4">
        <h2 class="text-center font-semibold text-2xl mb-1"> Quiztyp </h2>
        <label class="swap btn btn-sm absolute top-0 left-0">
            <input type="checkbox" bind:checked={selectionCollapsed}>
            <Icon class="swap-on" icon="bx:right-arrow"/>
            <Icon class="swap-off" icon="bx:up-arrow"/>
        </label>
        {#if !selectionCollapsed}
        <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-2">
            {#each quizTypes as type}
                <input class="btn" aria-label={type.name} type="checkbox" value={type.id} bind:group={selectedTypes}>
            {/each}
        </div>
        <div class="flex justify-end mt-2">
            <label class="swap btn">
                <input type="checkbox" bind:checked={compactView}>
                <Icon class="swap-on" icon="solar:text-bold"/>
                <Icon class="swap-off" icon="octicon:number-16"/>
            </label>
        </div>
        {:else}
            {#if question}
            <h2 class="text-center font-semibold text-lg"> {question.type.name} </h2>
            {/if}
        {/if}
    </div>
    {#if filteredQuestions.length > 0}
    <div class="flex flex-col justify-center gap-2">
        <FoamQuestion {question} {compactView}/>
        <form class="flex items-center flex-col gap-2 border-t-2 border-t-base-300 p-2">
            {#if !answered}
            <div class="flex-1 flex flex-col gap-2 w-full lg:w-1/2">
                <input class="input input-bordered text-center text-lg w-full lg:w-1/2 inline-flex self-center" type="text" bind:value={answer}>
                <span class="font-semibold text-center"> {question.type.answerUnit} </span>
            </div>
            {:else}
                {#if question.answer === answer}
                <div class="flex flex-col gap-2 w-full text-center text-success font-semibold">
                    <div class="flex justify-center items-center min-h-12">
                        <span class="text-lg"> {answer} </span>
                    </div>
                    <span> {question.type.answerUnit} </span>
                </div>
                {:else}
                <div class="flex flex-col gap-2 w-full text-center text-error font-semibold">
                    <div class="flex justify-center items-center min-h-12">
                        <span class="text-lg"> {answer} </span>
                    </div>
                    <span> {question.type.answerUnit} </span>
                </div>
                {/if}
            {/if}
            <div class="flex justify-center w-full lg:w-1/2 mt-3">
                <button class="btn btn-primary btn-outline w-full" type="submit" on:click|preventDefault={() => answered ? nextQuestion() : answerQuestion()}>
                    {#if !answered}
                    Wählen
                    {:else}
                    Weiter
                    {/if}
                </button>
            </div>
        </form>
        {#if answered}
        <FoamHelp {question}/>
        {/if}
    </div>
    {:else}
    <div class="text-center font-semibold text-lg">
        Kein Fragetyp ausgewählt!
    </div>
    {/if}
</div>