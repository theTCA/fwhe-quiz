<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { shuffle } from "$lib/helper";
    import { catalogues } from "$lib/data.json";
    import { flattendQuestions } from "$lib/data";
    import Question from "$lib/components/Question.svelte";
    import QuizResult from "$lib/components/QuizResult.svelte";
    import { quizQuestions, quizHistory } from "$lib/stores";

    let numberOfQuestions = 15;
    /**
     * @type {string[]}
     */
    let selectedCatalogues = [];

    let started = false;

    /**
     * @type {import("$lib/types").Question | undefined}
     */
    let question = undefined;
    /**
     * @type {import("$lib/types").Question[]}
     */
    let questions = [];

    /** @type {string}*/
    let answer;

    let answered = false;
    let ended = false;

    if($quizQuestions.length > 0) {
        questions = [...$quizQuestions.filter((/** @type {{answered: boolean}} */ e) => !e.answered).map((/** @type {{ question: import("$lib/types").Question}} */ e) => e.question)];
        if(questions.length > 0) {
            question = questions.shift();
            answer = "";
            answered = false;
            started = true;
            ended = false;
        } else {
            $quizQuestions = [];
        }
    }

    function start() {
        let possibleQuestions = flattendQuestions.filter(q => selectedCatalogues.includes(q.catalog)).map(q => ({...q, choices: shuffle(q.choices)}));
        shuffle(possibleQuestions);
        questions = possibleQuestions.slice(0, numberOfQuestions);
        $quizQuestions = [...questions].map(q => ({question: q, answer: "", answered: false}));
        answered = false;
        answer = "";
        question = questions.shift();
        started = true;
        ended = false;
    }

    function nextQuestion() {
        answered = false;
        answer = "";
        if(questions.length > 0)
            question = questions.shift();
        else
            ended = true;
    }

    function answerQuestion() {
        if(question) {
            $quizHistory = [{question: question, answer: answer, date: new Date(), type: "quiz"}, ...$quizHistory];
            let quizQuestion = $quizQuestions.find((/** @type {{ question: import("$lib/types").Question }} */ e) => e.question.id === question?.id);
            quizQuestion.answer = answer;
            quizQuestion.answered = true;
            $quizQuestions = $quizQuestions;
        }
        answered = true;
        nextQuestion();
    }

    function toMenu() {
        started = false;
        answered = false;
        ended = false;
        $quizQuestions = [];
    }

    function selectAll() {
        if(selectedCatalogues.length > 0)
            selectedCatalogues = [];
        else
            selectedCatalogues = catalogues.map(c => c.name);
    }

    function setNumberOfQuestions(/** @type {number} */ value) {
        if(numberOfQuestions + value > 0)
            numberOfQuestions += value;
        else
            numberOfQuestions = 1;
    }
</script>

<svelte:head>
    <title>Quiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Quiz</h1>
    {#if !started}
    <div class="flex flex-col gap-2 mb-4">
        <div>
            <h3 class="font-semibold mb-2">Anzahl Fragen</h3>
            <div class="join">
                <button class="join-item btn btn-sm" type="button" on:click={() => numberOfQuestions = 1}> Min </button>
                <button class="join-item btn btn-sm" type="button" on:click={() => setNumberOfQuestions(-1)}> -1 </button>
                <input class="join-item input input-bordered input-sm w-full lg:w-auto text-center" min={1} type="number" bind:value={numberOfQuestions}>
                <button class="join-item btn btn-sm" type="button" on:click={() => setNumberOfQuestions(1)}> +1 </button>
                <button class="join-item btn btn-sm" type="button" on:click={() => setNumberOfQuestions(5)}> +5 </button>
            </div>
        </div>
        <div>
            <h3 class="font-semibold mb-2">Fragenkataloge</h3>
            <div class="flex flex-col gap-2">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
                    <label class="flex items-center gap-2 p-2 bg-base-200 rounded-md cursor-pointer select-none">
                        <input class="checkbox checkbox-primary rounded-full bg-base-100" type="checkbox" checked={catalogues.length === selectedCatalogues.length} on:click={selectAll}>
                        Alle
                    </label>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {#each catalogues as catalog}
                    <label class="flex items-center gap-2 p-2 bg-base-200 rounded-md cursor-pointer select-none">
                        <input class="checkbox checkbox-primary bg-base-100 rounded-full" type="checkbox" value={catalog.name} bind:group={selectedCatalogues}>
                        {catalog.name}
                    </label>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-center mb-4">
        {#if selectedCatalogues.length > 0 && numberOfQuestions > 0}
        <button class="btn btn-primary w-[50%]" type="button" on:click={start}>Start</button>
        {:else}
        <button class="btn w-[50%]" type="button" disabled>Start</button>
        {/if}
    </div>
    {:else}
        {#if question && !ended}
        <Question {question} bind:answer={answer}/>
        <div class="grid grid-cols-2 gap-2 w-full mt-2 mb-4">
            <button class="btn btn-outline btn-error" type="button" on:click={() => ended = true}>Abbrechen</button>
            {#if answered}
            <button class="btn btn-primary" type="button" on:click={nextQuestion}>Weiter</button>
            {:else}
            <button class="btn btn-primary" type="button" on:click={answerQuestion}>Wählen</button>
            {/if}
        </div>
        {/if}
        {#if ended}
        <QuizResult questions={[...$quizQuestions]}/>
        <div class="grid grid-cols-2 gap-2 w-full mb-4">
            <button class="btn btn-error btn-outline" type="button" on:click={toMenu}>Zurück</button>
            <button class="btn btn-primary" type="button" on:click={start}>Erneut</button>
        </div>
        {/if}
    {/if}
</div>