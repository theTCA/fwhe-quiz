<script>
    import { base } from "$app/paths";
    import Icon from "@iconify/svelte";

    /** @type {{question: import("$lib/types").Question, date: Date, answer: string}}*/
    export let history;
</script>

<a class="flex items-center gap-1" target="_blank" href={base + `/search#${history.question.id}`}>
    {#if history.question.choices.find(c => c.answer)?.text === history.answer}
    <Icon class="w-5 h-5 rounded-full border border-base-200 text-success" icon="carbon:checkmark-filled"/>
    {:else}
    <Icon class="w-5 h-5 rounded-full border border-base-200 text-error" icon="carbon:close-filled"/>
    {/if}
    <div class="flex-1">
        {history.question.question}
        <span class="text-sm opacity-70"> aus {history.question.catalog} </span>
    </div>
</a>