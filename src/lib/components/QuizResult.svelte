<script>
    import QuestionResult from "./QuestionResult.svelte";

    /** @type {{question: import("$lib/types").Question, answer: string}[]}*/
    export let questions;

    let correctQuestions = questions.reduce((acc, q) => q.question.choices.find(c => c.answer)?.text === q.answer ? acc + 1 : acc, 0);
    let correctQuestionsProgress = Math.round((correctQuestions / questions.length) * 100);
    let onlyWrong = true;
    $: showedQuestions = questions.filter(e => onlyWrong ? e.question.choices.find(c => c.answer)?.text !== e.answer : true);
</script>

<div>
    <div class="mb-4 grid grid-cols-1 lg:grid-cols-3 items-end gap-4">
        <div>
            <div class="text-lg font-bold text-center">
                {questions.length}
            </div>
            <h3 class="text-sm font-semibold text-center opacity-70">Fragen</h3>
        </div>
        <div class="inline-flex flex-col gap-2">
            <div class="radial-progress self-center text-primary font-bold" style={`--value:${correctQuestionsProgress};`} role="progressbar">
                {`${correctQuestionsProgress}%`}
            </div>
            <h3 class="text-sm font-semibold text-center opacity-70">richtige Antworten</h3>
        </div>
        <div class=""></div>
    </div>
    <div class="divider"></div>
    <div class="flex justify-center items-center relative mb-2">
        <h2 class="text-xl font-semibold text-center text-primary">Fragen</h2>
        <label class="absolute right-0 flex items-center gap-2 text-sm">
            nur Falsche
            <input class="toggle toggle-sm toggle-primary" type="checkbox" bind:checked={onlyWrong}>
        </label>
    </div>
    <div class="flex flex-col gap-2 mb-2">
    {#if showedQuestions.length > 0}
        {#each showedQuestions as entry}
        <QuestionResult question={entry.question} answer={entry.answer}/>
        {/each}
    {:else}
        <div class="text-center">&vellip;</div>
    {/if}
    </div>
</div>