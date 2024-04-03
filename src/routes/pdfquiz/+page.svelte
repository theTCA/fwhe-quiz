<script>
    import QuestionAdder from "$lib/components/QuestionAdder.svelte";
    import Icon from "@iconify/svelte";
    import {catalogues} from "$lib/data.json";
    import { shuffle } from "$lib/helper";
    import { QuizBuilder } from "$lib/pdf";
    import { bookmarks } from "$lib/stores";

    const flattendQuestions = catalogues.map(c => c.questions.map(q => ({...q, catalog: c.name}))).flat();

    /**
     * @type {HTMLDialogElement}
     */
    let modal;

    /** @type {import("$lib/types").Question[]}*/
    let questions = [];

    let randomQuestions = 15;
    let quizName = "Fragebogen";
    /** @type {'normal' | 'xl'}*/
    let quizFontSize = "normal";

    function addRandomQuestions() {
        let possibleQuestions = Array.from({length: flattendQuestions.length}, (_, i) => i+1);
        possibleQuestions = possibleQuestions.filter(id => !questions.some(q => q.id === id));
        possibleQuestions = shuffle(possibleQuestions);
        let ids = possibleQuestions.slice(0, randomQuestions);
        // @ts-ignore
        questions = [...questions, ...ids.map(id => flattendQuestions[id-1])];
    }

    /**
     * @param {CustomEvent} e
     */
    function addQuestion(e) {
        let id = e.detail.id;
        if(!questions.some(q => q.id === id)) {
            // @ts-ignore
            questions = [...questions, flattendQuestions[id-1]];
        }
    }

    function clearQuestions() {
        questions = [];
    }

    /**
     * @param {number} id
     */
    function removeQuestion(id) {
        questions = questions.filter(q => q.id !== id);
    }

    /**
     * @param {boolean} solution
     */
    function buildQuiz(solution) {
        if(questions.length === 0)
            return;
        let bloburl = null;
        if(solution) {
            bloburl = new QuizBuilder(quizName, questions, {style: quizFontSize, showSolution: true}).get().output("bloburl");
        } else {
            bloburl = new QuizBuilder(quizName, questions, {style: quizFontSize}).get().output("bloburl");
        }
        window.open(bloburl, "_blank");
    }

    function addBookmarks() {
        for(let bookmark of $bookmarks) {
            addQuestion(new CustomEvent("", {detail: {id: bookmark.id}}));
        }
    }
</script>

<svelte:head>
    <title>PDF-Quiz - HFLÜ-Trainer</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">PDF-Quiz</h1>
    <div class="flex flex-col gap-3 lg:w-1/2 mx-auto">
        <label class="form-control">
            <span class="label pb-0 label-text font-bold">Überschrift</span>
            <input class="input input-bordered" type="text" bind:value={quizName}>
        </label>
        <div>
            <h3 class="pl-1.5 font-bold text-sm">Schriftgröße</h3>
            <div class="form-control">
                <label class="label justify-start gap-2 cursor-pointer">
                    <input class="radio radio-primary" type="radio" value="normal" bind:group={quizFontSize}>
                    <span class="label-text text-base">Normal</span>
                </label>
            </div>
            <div class="form-control">
                <label class="label justify-start gap-2 cursor-pointer">
                    <input class="radio radio-primary" type="radio" value="xl" bind:group={quizFontSize}>
                    <span class="label-text text-base">XL</span>
                </label>
            </div>
        </div>
    </div>
    <div class="divider font-bold text-primary"> Fragen hinzufügen </div>
    <div class="flex flex-col gap-3 lg:w-1/2 mx-auto">
        <div>
            <div class="flex items-center gap-1">
                <Icon icon="ion:dice"/>
                <h3 class="font-semibold mb-1">zufällige Fragen</h3>
            </div>
            <div class="flex flex-col lg:flex-row lg:items-end gap-2">
                <input class="input input-sm input-bordered" type="number" min={1} bind:value={randomQuestions}>
                <button class="flex-1 btn btn-sm btn-outline btn-success" on:click={addRandomQuestions}> hinzufügen </button>
            </div>
        </div>
        <div>
            <div class="flex items-center gap-1">
                <Icon icon="icon-park-solid:add"/>
                <h3 class="font-semibold mb-1">aus Fragenkatalog auswählen</h3>
            </div>
            <button class="btn btn-sm btn-block btn-outline btn-success" on:click={() => modal.showModal()}>Fragen auswählen</button>
            <dialog id="quizQuestionSelection" class="modal" bind:this={modal}>
                <form class="modal-box max-w-[90%] text-wrap" method="dialog">
                    <div class="mb-2 flex justify-end">
                        <button class="btn btn-square btn-outline">
                            <Icon icon="mdi:close"/>
                        </button>
                    </div>
                    <QuestionAdder on:add={addQuestion}/>
                </form>
                <form class="modal-backdrop" method="dialog">
                    <button></button>
                </form>
            </dialog>
        </div>
        {#if $bookmarks.length > 0}
        <div>
            <div class="flex items-center gap-1">
                <Icon icon="mdi:bookmark"/>
                <h3 class="font-semibold mb-1"> Lesezeichen </h3>
            </div>
            <button class="btn btn-sm btn-block btn-outline btn-success" on:click={addBookmarks}>
                hinzufügen
            </button>
        </div>
        {/if}
    </div>
    <div class="divider font-bold text-primary"> Erstellen </div>
    <div class="grid grid-cols-2 gap-2 w-full lg:w-1/2 mx-auto">
        <button class="btn btn-primary" on:click={() => buildQuiz(false)} disabled={questions.length <= 0}> Fragebogen </button>
        <button class="btn btn-primary" on:click={() => buildQuiz(true)} disabled={questions.length <= 0}> Antwortbogen </button>
    </div>
    <div class="divider font-bold text-primary"> Fragen </div>
    <div>
        <div class="mb-2 flex items-center">
            <h2 class="flex-1 text-base lg:text-lg font-semibold">Ausgewählte Fragen ({questions.length})</h2>
            <button class="btn btn-sm btn-outline btn-error" on:click={clearQuestions}>Alle löschen</button>
        </div>
        <div class="flex flex-col gap-2">
            {#if questions.length > 0}
            {#each questions as question}
            <div class="p-2 bg-base-200 rounded-md flex items-center gap-2">
                <!--
                    TODO: make questions drag and droppable
                    <div>
                        <Icon icon="octicon:grabber-16"/>
                </div>
                -->
                <div class="text-base flex-1">
                    {question?.question}
                </div>
                <button on:click={() => removeQuestion(question.id)}>
                    <Icon class="w-6 h-6 text-error" icon="ep:remove-filled"/>
                </button>
            </div>
            {/each}
            {/if}
        </div>
    </div>
</div>