<script>
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";

    /** @type {{name: string, questions: number[], length: number}[]}*/
    export let chapters;

    const dispatch = createEventDispatcher();

    /**
     * @param {string} name
     */
    function selectChapter(name) {
        dispatch("select", {
            name: name
        });
    }

    /**
     * @param {any} name
     */
    function resetChapter(name) {
        dispatch("reset", {
            name: name
        })
    }
</script>


<div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
    {#each chapters as chapter}
    <div class="bg-base-200 p-2 rounded-md flex flex-row items-center gap-2">
        {#if chapter.questions.length === chapter.length}
        <div class="text-success">
            <Icon class="btn-square p-2.5" icon="mdi:check"/>
        </div>
        {:else}
        <button class="btn btn-primary btn-outline btn-square" on:click={() => selectChapter(chapter.name)}>
            <Icon icon="carbon:play-filled-alt"/>
        </button>
        {/if}
        <div class="flex-1">
            <h3 class="font-semibold text-left break-words min-w-0">{chapter.name}</h3>
            {#if chapter.questions.length === chapter.length}
            <progress class="progress progress-success" value={chapter.questions.length} max={chapter.length}></progress>
            {:else}
            <progress class="progress" value={chapter.questions.length} max={chapter.length}></progress>
            {/if}
        </div>
        <button class="btn btn-ghost text-primary" on:click={() => resetChapter(chapter.name)}>
            <Icon icon="material-symbols:refresh"/>
        </button>
    </div>
    {/each}
</div>