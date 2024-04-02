<script>
    import Icon from "@iconify/svelte";
    import {bookmarks} from "$lib/stores";

    /** @type {import("$lib/types").Question}*/
    export let question;

    $: inBookmarks = $bookmarks.some((/** @type {{ id: number; }} */ b) => b.id === question.id);

    function onClick() {
        if(inBookmarks) {
            removeQuestion();
        } else {
            addQuestion();
        }
    }

    function addQuestion() {
        $bookmarks = [...$bookmarks, question];
    }

    function removeQuestion() {
        $bookmarks = $bookmarks.filter((/** @type {{ id: number; }} */ b) => b.id !== question.id);
    }
</script>

<div class={$$props.class}>
    <div class="indicator">
        {#if inBookmarks}
        <span class="indicator-item">
            <Icon class="text-success w-5 h-5" icon="ph:seal-check-fill"/>
        </span>
        {/if}
        <button class="btn btn-sm lg:btn-md btn-square btn-outline" type="button" on:click={onClick}>
            <Icon icon="material-symbols:bookmark-add"/>
        </button>
    </div>
</div>