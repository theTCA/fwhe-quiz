<script>
    export let quizHistory;

    $: correctQuestions = quizHistory.reduce(reduceCorrectQuestions, 0);
    $: correctQuestionsProgress = quizHistory.length > 0 ? Math.round((correctQuestions / quizHistory.length) * 100) : 0;
    $: worstCatalog = Object.keys(historyAsCatalogues).reduce((acc, c) => {
        let ratio = historyAsCatalogues[c].incorrect / quizHistory.length;
        return ratio > acc.ratio ? {ratio: ratio, catalog: c} : acc;
    }, {ratio: 0, catalog: "-"});
    $: historyAsCatalogues = quizHistory.reduce(reduceCatalogues, {});

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
</script>

<div class="border-2 border-base-200 p-2 rounded-md mb-4 grid grid-cols-1 lg:grid-cols-3 items-end">
    <div>
        <div class="text-lg font-bold text-center">
            {quizHistory.length}
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