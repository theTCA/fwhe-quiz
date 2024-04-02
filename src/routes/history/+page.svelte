<script>
    import QuizHistory from "$lib/components/QuizHistory.svelte";
    import {quizHistory} from "$lib/stores";

    $: historyRange = 10;
    $: correctQuestions = $quizHistory.reduce(reduceCorrectQuestions, 0);
    $: correctQuestionsProgress = $quizHistory.length > 0 ? Math.round((correctQuestions / $quizHistory.length) * 100) : 0;
    $: historyAsCatalogues = $quizHistory.reduce(reduceCatalogues, {});
    $: worstCatalog = Object.keys(historyAsCatalogues).reduce((acc, c) => {
        let ratio = historyAsCatalogues[c].incorrect / $quizHistory.length;
        return ratio > acc.ratio ? {ratio: ratio, catalog: c} : acc;
    }, {ratio: 0, catalog: "-"});

    /**
     * @param {number} acc
     * @param {import("$lib/types").QuizHistory} history
     */
    function reduceCorrectQuestions(acc, history) {
        let correctChoice = history.question.choices.find((/** @type {{text:string, answer: boolean; }} */ c) => c.answer);
        if(correctChoice) {
            return correctChoice.text === history.answer ? acc + 1 : acc;
        }
        return acc;
    }

    /**
     * @param {any} acc
     * @param {import("$lib/types").QuizHistory} history
     */
    function reduceCatalogues(acc, history) {
        let catalog = history.question.catalog;
        let correctChoice = history.question.choices.find((/** @type {{text:string, answer: boolean; }} */ c) => c.answer);
        if(catalog && correctChoice) {
            if(catalog in acc) {
                correctChoice.text === history.answer ? acc[catalog].correct += 1 : acc[catalog].incorrect += 1;
            } else {
                acc[catalog] = {correct: 0, incorrect: 0};
                correctChoice.text === history.answer ? acc[catalog].correct += 1 : acc[catalog].incorrect += 1;
            }
        }
        return acc;
    }
</script>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Verlauf</h1>
    <div class="mb-4 grid grid-cols-1 lg:grid-cols-3 items-end">
        <div>
            <div class="text-lg font-bold text-center">
                {$quizHistory.length}
            </div>
            <h3 class="text-sm font-semibold text-center opacity-70">beantwortete Fragen</h3>
        </div>
        <div class="inline-flex flex-col gap-2">
            <div class="radial-progress self-center text-primary font-bold" style={`--value:${correctQuestionsProgress};`} role="progressbar">
                {`${correctQuestionsProgress}%`}
            </div>
            <h3 class="text-sm font-semibold text-center opacity-70">richtige Antworten</h3>
        </div>
        <div class="">
            <div class="text-lg font-bold text-center">
                {worstCatalog.catalog}
                {#if worstCatalog.catalog !== "-"}
                {`(${historyAsCatalogues[worstCatalog.catalog].incorrect})`}
                {/if}
            </div>
            <h3 class="text-sm font-semibold text-center opacity-70">meisten Fehler in Fragenkatalog</h3>
        </div>
    </div>
    <div class="divider"></div>
    <div class="flex justify-between mb-2">
        <div>
            <span class="font-bold"> Letzten </span>
            <select class="select select-bordered select-sm" bind:value={historyRange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={$quizHistory.length}>Alle</option>
            </select>
            <span class="font-bold"> Fragen</span>
        </div>
        <button class="btn btn-error btn-sm" on:click={() => $quizHistory = []}>Löschen</button>
    </div>
    <div class="flex flex-col gap-1">
        {#each $quizHistory.slice(0, historyRange) as history}
        <QuizHistory {history} />
        {/each}
    </div>
</div>