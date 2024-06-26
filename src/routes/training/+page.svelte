<script>
    import {trainingChapters, trainingLastChapter, trainedBookmarks, bookmarks} from "$lib/stores";
    import {flattendQuestions} from "$lib/data";
    import {catalogues} from "$lib/data.json";
    import Question from "$lib/components/Question.svelte";
    import QuestionDisplay from "$lib/components/QuestionDisplay.svelte";
    import ChapterSelector from "$lib/components/ChapterSelector.svelte";
    import { shuffle } from "$lib/helper";
    import { onMount } from "svelte";
    import QuestionHelp from "$lib/components/QuestionHelp.svelte";
    import BookmarkButton from "$lib/components/BookmarkButton.svelte";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import Icon from "@iconify/svelte";

    if($trainingChapters.length <= 0) {
        $trainingChapters = catalogues.map(c => ({name: c.name, questions:[], length: c.questions.length}));
    }

    $: completedChapters = $trainingChapters.reduce((/** @type {number} */ acc, /** @type {{ questions: string | any[]; length: any; }} */ c) => c.questions.length === c.length ? acc + 1: acc, 0);
    $: chapterProgress = $trainingChapters.reduce((/** @type {any} */ acc, /** @type {{ questions: number[] }} */ c) => acc + c.questions.length, 0);

    /**
     * @type {{name: string, questions: number[], length: number} | null}
     */
    $: selectedChapter = null;

    /**
     * @type {import("$lib/types").Question[] | null}
     */
    let questions = [];
    /**
     * @type {import("$lib/types").Question | undefined}
     */
    let question = undefined;
    let answer = "";
    let answered = false;

    onMount(() => {
        if($trainingLastChapter) {
            onSelectChapter(new CustomEvent("", {detail: {name: $trainingLastChapter}}));
        }
    })

    function answerQuestion() {
        answered = true;
        if(!question) {
            return;
        }
        let correctChoice = question.choices.find(c => c.answer);
        if(correctChoice && selectedChapter && questions) {
            if(correctChoice.text === answer) {
                if(selectedChapter.name === "Lesezeichen") {
                    selectedChapter.questions = [...selectedChapter.questions, question.id];
                    $trainedBookmarks = [...$trainedBookmarks, question];
                    $trainedBookmarks = $trainedBookmarks;
                } else {
                    $trainingChapters.find((/** @type {{ name: string; }} */ c) => c.name === selectedChapter?.name).questions = [...selectedChapter.questions, question.id];
                    $trainingChapters = $trainingChapters;
                }
            } else {
                questions = [...questions, question];
            }
        }
        selectedChapter = selectedChapter;
    }

    function nextQuestion() {
        if(!questions || questions.length <= 0) {
            return;
        }
        questions = [...questions.slice(1)];
        if(questions.length > 0) {
            question = questions?.at(0);
            answer = "";
            answered = false;
        } else {
            closeQuestions();
        }
    }

    function closeQuestions() {
        selectedChapter = null;
        answer = "";
        answered = false;
        questions = [];
        question = undefined;
        $trainingLastChapter = "";
    }

    function loadChapter() {
        if(!selectedChapter)
            return;
        if(selectedChapter.questions.length === selectedChapter.length) {
            resetChapter(selectedChapter.name);
        }
        questions = getPossibleQuestions(selectedChapter);
        question = questions?.at(0);
    }

    function selectBookmarkChapter() {
        if($trainedBookmarks.length === $bookmarks.length)
            $trainedBookmarks = [];
        selectedChapter = {name: "Lesezeichen", questions: [...$trainedBookmarks], length: $bookmarks.length};
        $trainingLastChapter = "Lesezeichen";
        questions = shuffle($bookmarks.filter((/** @type {import("$lib/types").Question} */ q) => !$trainedBookmarks.includes(q.id)).map((/** @type {import("$lib/types").Question} */ q) => ({...q, choices: shuffle(q.choices)})));
        question = questions?.at(0);
    }

    function resetBookmarkChapter() {
        $trainedBookmarks = [];
    }

    /**
     * @param {CustomEvent} e
     */
    function onSelectChapter(e) {
        if(!e.detail.name) {
            selectedChapter = null;
            return;
        }
        if(e.detail.name === "Lesezeichen") {
            selectBookmarkChapter();
            return;
        }
        let chapter = $trainingChapters.find((/** @type {{ name: string; }} */ c) => c.name === e.detail.name);
        if(!chapter) {
            selectedChapter = null;
            return;
        }
        selectedChapter = chapter;
        $trainingLastChapter = selectedChapter?.name;
        loadChapter();
    }

    /**
     * @param {CustomEvent} e
     */
    function onResetChapter(e) {
        if(!e.detail.name) {
            return;
        }
        resetChapter(e.detail.name);
    }

    /**
     * @param {string} name
     */
    function resetChapter(name) {
        let chapter = $trainingChapters.find((/** @type {{ name: string; }} */ c) => c.name === name);
        if(!chapter) {
            return;
        }
        chapter.questions = [];
        $trainingChapters = $trainingChapters;
    }

    /**
     * @param {{name: string, questions: number[], length: number} | null} chapter
     */
    function getPossibleQuestions(chapter) {
        if(!chapter)
            return null;
        let questions = catalogues.find(c => c.name === chapter.name)?.questions;
        if(!questions || questions?.length <= 0) {
            return null;
        }
        questions = questions.filter(q => !chapter.questions.includes(q.id)).map(q => ({...q, choices: shuffle(q.choices)}));
        return shuffle(questions);
    }
</script>

<svelte:head>
    <title>Training - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <div class="relative flex justify-between w-full mb-2">
        <h1 class="text-3xl flex-1 text-center font-semibold mb-2"> Training </h1>
        {#if question}
        <BookmarkButton class="absolute right-2 lg:right-0" {question}/>
        {/if}
    </div>
    {#if !selectedChapter}
    <div class="mb-2">
        <h2 class="text-lg font-semibold">Fortschritt</h2>
        <div class="text-sm">
            <span class="font-bold">{completedChapters}</span>
            von
            <span class="font-bold">{$trainingChapters.length}</span>
            Abschnitten abgeschlossen
        </div>
        <progress class="progress progress-primary" value={chapterProgress} max={flattendQuestions.length}></progress>
    </div>
    <div class="divider font-bold"> Abschnitte </div>
        {#if $bookmarks.length > 0}
        <div class="flex justify-center px-2 mb-2">
            <div class="flex items-center gap-2 p-2 bg-base-200 rounded-md w-full lg:w-1/3">
                <button class="btn btn-primary btn-square btn-outline" type="button" on:click={selectBookmarkChapter}>
                    <Icon icon="carbon:play-filled-alt"/>
                </button>
                <div class="flex-1">
                    <h3 class="font-semibold text-left break-words min-w-0"> Lesezeichen </h3>
                    <progress class="progress progress-primary" value={$trainedBookmarks.length} max={$bookmarks.length}></progress>
                </div>
                <button class="btn btn-ghost text-primary" on:click={resetBookmarkChapter}>
                    <Icon icon="material-symbols:refresh"/>
                </button>
            </div>
        </div>
        <div class="divider"></div>
        {/if}
    <ChapterSelector chapters={$trainingChapters} on:select={onSelectChapter} on:reset={onResetChapter}/>
    {:else}
    <div>
        <div class="mb-3">
            <h2 class="text-sm flex-1 text-center text-primary font-semibold mb-2"> {selectedChapter.name} </h2>
            <div class="w-[80%] mx-auto">
                <progress class="progress progress-primary" value={selectedChapter.questions.length} max={selectedChapter.length}></progress>
            </div>
        </div>
        {#if question}
        <div class="mb-2">
            {#if answered}
            <QuestionDisplay {question} {answer} showCatalog={false}/>
            {:else}
            <Question {question} showCatalog={false} bind:answer/>
            {/if}
        </div>
        {/if}
        <div class="grid grid-cols-2 gap-2">
            <button class="btn btn-error btn-outline" on:click={closeQuestions}> Zurück </button>
            {#if answered}
            <button class="btn btn-success" on:click={nextQuestion}> Weiter </button>
            {:else}
                {#if answer === ""}
                <button class="btn btn-primary btn-outline" on:click={answerQuestion}> Wählen </button>
                {:else}
                <button class="btn btn-primary" on:click={answerQuestion}> Wählen </button>
                {/if}
            {/if}
        </div>
        {#if question && answered}
        <div class="mt-3">
            <QuestionHelp {question}/>
        </div>
        {/if}
    </div>
    {/if}
</div>