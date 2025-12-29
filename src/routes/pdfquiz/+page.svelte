<script>
    import QuestionAdder from "$lib/components/QuestionAdder.svelte";
    import Icon from "@iconify/svelte";
    import { flattendQuestions } from "$lib/data";
    import { shuffle } from "$lib/helper";
    import { QuizBuilder } from "$lib/pdf";
    import { bookmarks } from "$lib/stores";
    import { PUBLIC_APP_NAME } from "$env/static/public";

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
        for(let id of ids) {
            let question = flattendQuestions[id - 1];
            question.choices = shuffle(question.choices);
            questions = [...questions, question];
        }
    }

    /**
     * @param {CustomEvent} e
     */
    function addQuestion(e) {
        let id = e.detail.id;
        if(!questions.some(q => q.id === id)) {
            let question = flattendQuestions[id - 1];
            question.choices = shuffle(question.choices);
            questions = [...questions, question];
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

    /**
     * @param {number} index
     */
    function moveUp(index) {
        if(index <= 0) return;
        [questions[index - 1], questions[index]] = [questions[index], questions[index - 1]];
    }

    /**
     * @param {number} index
     */
    function moveDown(index) {
        if(index >= questions.length - 1) return;
        [questions[index + 1], questions[index]] = [questions[index], questions[index + 1]];
    }
</script>

<svelte:head>
    <title>PDF-Quiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">PDF-Quiz</h1>
    <div class="flex flex-col gap-3 lg:w-1/2 mx-auto">
        <fieldset class="fieldset">
            <label class="input w-full">
                <span class="label">Name</span>
                <input class="w-full" id="quizName" type="text" placeholder="Fragebogen" bind:value={quizName}>
            </label>
        </fieldset>
        <fieldset class="fieldset">
            <legend>Schriftgröße</legend>
            <label class="input input-ghost justify-start gap-2 cursor-pointer">
                <input class="radio radio-primary" name="quizFontSize" type="radio" value="normal" bind:group={quizFontSize}>
                <span class="label">Normal</span>
            </label>
            <label class="input input-ghost justify-start gap-2 cursor-pointer">
                <input class="radio radio-primary" name="quizFontSize" type="radio" value="xl" bind:group={quizFontSize}>
                <span class="label text-xl">Größer</span>
            </label>
        </fieldset>
        <fieldset class="fieldset">
            <legend class="flex h-8 items-center gap-1">
                <Icon class="w-5 h-5" icon="ion:dice"/>
                <h3>zufällige Fragen</h3>
            </legend>
            <div class="join">
                <div>
                    <label class="input input-sm join-item">
                        <span class="label">Anzahl</span>
                        <input class="w-full" type="number" min={1} bind:value={randomQuestions}>
                    </label>
                </div>
                <button class="flex-1 btn btn-primary btn-sm join-item" on:click={addRandomQuestions} disabled={randomQuestions <= 0}> hinzufügen </button>
            </div>
        </fieldset>
        <fieldset class="fieldset">
            <legend class="flex h-8 items-center gap-1">
                <Icon class="w-5 h-5" icon="flowbite:book-solid"/>
                <h3>aus Fragenkatalog auswählen</h3>
            </legend>
            <button class="btn btn-sm btn-primary btn-block" on:click={() => modal.showModal()}>Fragen auswählen</button>
            <dialog id="quizQuestionSelection" class="modal" bind:this={modal}>
                <form class="modal-box w-screen h-screen max-h-[90%] md:max-w-[90%] z-10" method="dialog">
                    <div class="mb-2 flex justify-between items-center">
                        <h2 class="text-xl font-bold">Fragen auswählen</h2>
                        <button class="btn btn-square btn-outline">
                            <Icon icon="mdi:close"/>
                        </button>
                    </div>
                    <QuestionAdder on:change={addQuestion}/>
                </form>
                <form class="modal-backdrop select-none" method="dialog">
                    <button aria-label="backdrop"></button>
                </form>
            </dialog>
        </fieldset>

    {#if $bookmarks.length > 0}
    <fieldset class="fieldset">
        <legend class="flex h-8 items-center gap-1">
            <Icon class="w-5 h-5" icon="mdi:bookmark"/>
            <h3>Lesezeichen wählen</h3>
        </legend>
        <button class="btn btn-sm btn-primary btn-block" on:click={addBookmarks}>
            <span class="badge badge-sm">{$bookmarks?.length}</span>
            hinzufügen
        </button>
    </fieldset>
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
            {#each questions as question, idx}
            <div class="p-2 bg-base-200 rounded-md flex items-center gap-1">
                <div class="grid grid-rows-2 gap-1">
                    <button class="btn btn-ghost btn-xs" type="button" on:click={() => moveUp(idx)}>
                        <Icon icon="teenyicons:up-solid"/>
                    </button>
                    <button class="btn btn-ghost btn-xs" type="button" on:click={() => moveDown(idx)}>
                        <Icon icon="teenyicons:down-solid"/>
                    </button>
                </div>
                <div class="divider divider-horizontal m-0 p-0"></div>
                <div class="text-base flex-1">
                    {question?.question}
                </div>
                <button on:click={() => removeQuestion(question.id)}>
                    <Icon class="w-6 h-6 cursor-pointer text-error" icon="ep:remove-filled"/>
                </button>
            </div>
            {/each}
            {/if}
        </div>
    </div>
</div>