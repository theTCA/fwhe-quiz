<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import {bookmarks} from "$lib/stores";
    import Icon from "@iconify/svelte";

    /**
     * @param {{catalog: string, questions: import("$lib/types").Question[]}[]} acc
     * @param {import("$lib/types").Question} b
     */
    function reduceBookmarks(acc, b) {
        let myCatalog = acc.find(c => c.catalog === b.catalog);
        if(myCatalog) {
            myCatalog.questions  = [...myCatalog.questions, b];
        } else {
            if(b.catalog)
                acc = [...acc, {catalog: b.catalog, questions: [b]}];
        }
        return acc;
    }

    /**
     * @param {number} id
     */
    function removeBookmark(id) {
        $bookmarks = $bookmarks.filter((/** @type {{ id: number; }} */ b) => b.id !== id);
    }
</script>

<svelte:head>
    <title>Lesezeichen - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2"> Lesezeichen </h1>
    {#if $bookmarks.length > 0}
    <div class="flex flex-col gap-2">
        {#each $bookmarks.sort((/** @type {{ id: number; }} */ a, /** @type {{ id: number; }} */ b) => a.id > b.id).reduce(reduceBookmarks, []) as entry}
        <div>
            <span class="font-semibold"> {entry.catalog} </span>
            {#each entry.questions as question}
            <div class="pl-2 flex items-center gap-1">
                <button class="text-error" on:click={() => removeBookmark(question.id)}>
                    <Icon class="w-5 h-5" icon="ep:remove-filled"/>
                </button>
                <div class="flex-1"> {question.question} </div>
            </div>
            {/each}
        </div>
        {/each}
    </div>
    {:else}
    <div class="text-center">
        Keine Einträge.
    </div>
    {/if}
</div>