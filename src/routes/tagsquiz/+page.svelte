<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { flattendQuestions } from "$lib/data";
    import Question from "$lib/components/Question.svelte";
    import QuestionDisplay from "$lib/components/QuestionDisplay.svelte";
    import { shuffle } from "$lib/helper";

    const tags = [...new Set(flattendQuestions.reduce((/** @type {string[]} */acc, q) => [...acc, ...q.tags], []))].sort((a, b) => a.localeCompare(b));

    /** @type { undefined | string }*/
    let selectedTag = undefined;
    let answer = "";

    $: questions = shuffle(flattendQuestions.filter(q => q.tags.includes(selectedTag)));

    /** @param { string | undefined } tag */
    function selectTag(tag) {
        selectedTag = tag;
    }
</script>

<svelte:head>
    <title>Schlagwortquiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Schlagwortquiz</h1>
    {#if !selectedTag}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {#each tags as tag}
            <button class="btn" type="button" on:click={()=> selectTag(tag)}>
                {tag}
            </button>
        {/each}
    </div>
    {:else}
    <div>
        {#if !answer}
        <Question question={questions[0]} bind:answer />
        {:else}
        <QuestionDisplay question={questions[0]} answer={answer}/>
        {/if}
        <div>
            <button type="button" on:click={() => questions[1]}>
                Weiter
            </button>
        </div>
    </div>
    <div>
        <button class="btn btn-error btn-outline" type="button" on:click={() => selectTag(undefined)}>
            Zurück
        </button>
    </div>
    {/if}
</div>