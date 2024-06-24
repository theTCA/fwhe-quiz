<script>
    import {catalogues, images} from "$lib/data.json";
    import Icon from "@iconify/svelte";
    import Collapsible from "$lib/components/Collapsible.svelte";
    import QuestionHelp from "$lib/components/QuestionHelp.svelte";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { onMount } from "svelte";
    import { allQuestionTags, flattendQuestions } from "$lib/data";

    let searchInput = "";
    let selectedTag = allQuestionTags[0];

    /** @type {string[]} */
    let selectedTags = [];

    $: questions = getCatalogues();

    $: openedQuestion = 0;
    onMount(() => {
        openedQuestion = parseInt((new URL(window.location.href)).hash.replace("#", ""));
    });

    const searchToggles = [
        {
            name: "Fragen",
            value: true
        },
        {
            name: "Antworten",
            value: false
        }
    ];

    function search() {
        let hiddenQuestions = [...filterQuestionSearch(), ...filterQuestionTags()];
        questions = getCatalogues().map(c => ({...c, questions: c.questions.map(q => ({...q, hidden: hiddenQuestions.includes(q.id)}))})).filter(c => c.questions.reduce((acc, q) => q.hidden ? acc : acc + 1, 0) > 0);
        questions = questions;
    }

    function clearSearch() {
        searchInput = "";
        search();
    }

    function clearTags() {
        selectedTags = [];
        search();
    }

    function filterQuestionSearch() {
        /**
         * @type {number[]}
         */
        let hiddenQuestions = [];
        if(searchInput.length > 0) {
            for(let question of flattendQuestions) {
                if(searchToggles.at(0)?.value && question.question.toLowerCase().includes(searchInput.toLowerCase())) {
                    continue;
                }
                if(searchToggles.at(1)?.value && question.choices.some(c => c.text.toLowerCase().includes(searchInput.toLowerCase()))) {
                    continue;
                }
                hiddenQuestions = [...hiddenQuestions, question.id];
            }
        }
        return hiddenQuestions;
    }

    function filterQuestionTags() {
        /**
         * @type {number[]}
         */
        let hiddenQuestions = [];
        if(selectedTags.length > 0) {
            for(let question of flattendQuestions) {
                for(let tag of selectedTags) {
                    if(!question.tags.includes(tag)) {
                        hiddenQuestions = [...hiddenQuestions, question.id];
                        break;
                    }
                }
            }
        }
        return hiddenQuestions;
    }

    function getCatalogues() {
        return catalogues.map(c => ({name: c.name, questions: c.questions.map(q => ({...q, hidden: false}))}));
    }

    function selectTag() {
        if(selectedTag && selectedTag.length > 0)
            selectedTags = Array.from(new Set([...selectedTags, selectedTag])).sort((a, b) => a.localeCompare(b));
        search();
    }

    /**
     * @param {string} tag
     */
    function removeTag(tag) {
        selectedTags = selectedTags.filter(t => t !== tag);
        search();
    }
</script>

<svelte:head>
    <title>Durchsuchen - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Durchsuchen</h1>
    <form class="mx-auto flex flex-col gap-2 w-3/4 lg:w-2/3">
        <div class="join flex">
            <div class="flex-1 relative">
                <input class="join-item input input-bordered w-full" type="text" placeholder="Suche" bind:value={searchInput}>
                <button class="absolute right-4 top-4 text-error" type="button" on:click={clearSearch}>
                    <Icon icon="material-symbols:close"/>
                </button>
            </div>
            <button class="join-item btn btn-primary" type="submit" on:click|preventDefault={search}>
                <Icon icon="material-symbols:search"/>
            </button>
        </div>
        <div class="px-4">
            <div>
                {#each searchToggles as toggle}
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">{toggle.name}</span>
                        <input class="toggle toggle-primary" type="checkbox" bind:checked={toggle.value}>
                    </label>
                </div>
                {/each}
            </div>
            <div class="flex flex-col gap-2">
                <h2 class="font-semibold"> Schlagwörter </h2>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <div class="flex flex-col gap-2">
                        <div class="join">
                            <select class="join-item select select-bordered" bind:value={selectedTag}>
                                {#each allQuestionTags as tag}
                                    <option value={tag}>{tag}</option>
                                {/each}
                            </select>
                            <button class="join-item btn btn-primary btn-square" type="button" on:click={selectTag}>
                                <Icon icon="mingcute:add-fill"/>
                            </button>
                        </div>
                    </div>
                    <div class="col-span-2 flex flex-row flex-wrap gap-2">
                        {#each selectedTags as tag}
                        <div>
                            <div class="join">
                                <span class="join-item text-sm px-1 border font-semibold"> {tag} </span>
                                <button class="join-item btn btn-xs text-error" type="button" on:click={() => removeTag(tag)}>
                                    <Icon icon="carbon:close-filled"/>
                                </button>
                            </div>
                        </div>
                        {/each}
                    </div>
                </div>
                <div>
                    <button class="btn btn-error btn-outline btn-sm btn-block" type="button" on:click={clearTags}>
                        Zurücksetzten
                    </button>
                </div>
            </div>
        </div>
    </form>
    <div class="divider"></div>
    <div>
        <div class="flex flex-col gap-3">
            {#each questions as catalog}
            <div class="flex flex-col gap-1">
                <span class="font-bold text-lg text-primary">{catalog.name}</span>
                <div class="flex flex-col gap-1">
                    {#each catalog.questions as question}
                    <Collapsible open={question.id === openedQuestion} hidden={question.hidden}>
                        <div slot="title" id={""+question.id} class="font-semibold select-none">{question.question}</div>
                        <div slot="content">
                            {#if question.image}
                            <div class="w-32 h-32 mx-auto py-1">
                                <img src={`./img/${images.find(i => i.id === question.image)?.file}`} alt={images.find(i => i.id === question.image)?.description}>
                            </div>
                            {/if}
                            <div class="mb-3">
                                {#each question.choices as choice}
                                <div class="flex items-center gap-2 p-1.5 border-2 border-base-200 rounded-md">
                                    {#if choice.answer}
                                    <Icon class="h-6 w-6 text-success border border-primary rounded-full" icon="carbon:checkmark-filled"/>
                                    {:else}
                                    <span class="h-6 w-6 border border-primary rounded-full"></span>
                                    {/if}
                                    <div class="flex-1 text-sm lg:text-base">
                                        {choice.text}
                                    </div>
                                </div>
                                {/each}
                            </div>
                            <QuestionHelp {question}/>
                        </div>
                    </Collapsible>
                    {/each}
                </div>
            </div>
            {/each}
        </div>
    </div>
</div>