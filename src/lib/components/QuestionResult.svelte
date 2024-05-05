<script>
    import Icon from "@iconify/svelte";

    /** @type {import("$lib/types").Question}*/
    export let question;

    /** @type {string}*/
    export let answer;
</script>

<a class="flex items-center gap-1 bg-base-200 rounded-md p-1" target="_blank" href={`/search#${question.id}`}>
    {#if question.choices.find(c => c.answer)?.text === answer}
    <Icon class="rounded-full border border-base-200 w-6 h-6 text-success" icon="carbon:checkmark-filled"/>
    {:else}
    <Icon class="rounded-full border border-base-200 w-6 h-6 text-error" icon="carbon:close-filled"/>
    {/if}
    <div class="flex flex-1 flex-col text-left">
        <h3 class="font-semibold mb-1">
            {question.question}
        </h3>
        <div class="p-2 pt-0 pl-1 text-sm">
            <span class="font-semibold mr-1">Antwort:</span>{answer.length > 0 ? answer : "-"}
        </div>
    </div>
</a>