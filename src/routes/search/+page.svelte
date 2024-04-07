<script>
    import {catalogues, images} from "$lib/data.json";
    import Icon from "@iconify/svelte";
    import Collapsible from "$lib/components/Collapsible.svelte";
    import QuestionHelp from "$lib/components/QuestionHelp.svelte";

    let searchInput = "";
    $: questions = getCatalogues();

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
        if(searchInput.length > 0) {
            questions = getCatalogues().map(c => ({...c, questions: c.questions.map(q => ({...q, hidden: !filterQuestion(q)}))})).filter(c => c.questions.reduce((acc, q) => q.hidden ? acc : acc + 1, 0) > 0);
        } else {
            questions = getCatalogues();
        }
        questions = questions;
    }

    function clear() {
        searchInput = "";
        search();
    }

    /**
     * @param {import("$lib/types").Question} question
     */
    function filterQuestion(question) {
        if(searchToggles.at(0)?.value && question.question.toLowerCase().includes(searchInput.toLowerCase())) return true;
        if(searchToggles.at(1)?.value && question.choices.some(c => c.text.toLowerCase().includes(searchInput.toLowerCase()))) return true;
        return false;
    }

    function getCatalogues() {
        return catalogues.map(c => ({name: c.name, questions: c.questions.map(q => ({...q, hidden: false}))}));
    }
</script>

<svelte:head>
    <title>Durchsuchen - HFLÜ-Trainer</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Durchsuchen</h1>
    <form class="mx-auto flex flex-col gap-2 w-3/4 lg:w-2/3">
        <div class="join flex">
            <div class="flex-1 relative">
                <input class="join-item input input-bordered w-full" type="text" placeholder="Suche" bind:value={searchInput}>
                <button class="absolute right-4 top-4 text-error" type="button" on:click={clear}>
                    <Icon icon="material-symbols:close"/>
                </button>
            </div>
            <button class="join-item btn btn-primary" type="submit" on:click|preventDefault={search}>
                <Icon icon="material-symbols:search"/>
            </button>
        </div>
        <div class="px-4">
            {#each searchToggles as toggle}
            <div class="form-control">
                <label class="label">
                    <span class="label-text">{toggle.name}</span>
                    <input class="toggle toggle-primary" type="checkbox" bind:checked={toggle.value}>
                </label>
            </div>
            {/each}
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
                    <Collapsible hidden={question.hidden}>
                        <div slot="title" class="font-semibold select-none">{question.question}</div>
                        <div slot="content">
                            {#if question.image}
                            <div class="w-32 h-32 mx-auto py-1">
                                <img src={`./img/${images.find(i => i.id === question.image)?.file}`} alt={images.find(i => i.id === question.image)?.description}>
                            </div>
                            {/if}
                            <div class="mb-2">
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
                            {#if question.help.length > 0}
                            <div class="divider font-semibold">Hilfe</div>
                            <QuestionHelp {question}/>
                            {/if}
                        </div>
                    </Collapsible>
                    {/each}
                </div>
            </div>
            {/each}
        </div>
    </div>
</div>