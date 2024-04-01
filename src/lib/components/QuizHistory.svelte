<script>
    import Icon from "@iconify/svelte";

    /** @type {{question: import("$lib/types").Question, date: Date, answer: string}}*/
    export let history;

    let correctChoice = history.question.choices.find(c => c.answer);
</script>

<div class="flex items-center gap-1">
    <div class="w-6 h-6 inline-flex items-center">
        {#if correctChoice && correctChoice?.text === history.answer}
        <span class="text-success">
            <Icon icon="mdi:tick"/>
        </span>
        {:else}
        <span class="text-error">
            <Icon icon="mdi:close"/>
        </span>
        {/if}
    </div>
    <div class="flex-1 font-semibold">
        {history.question.question}
    </div>
</div>