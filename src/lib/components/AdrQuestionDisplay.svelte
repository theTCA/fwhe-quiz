<script>
    import Icon from "@iconify/svelte";
    import AdrHeader from "./AdrHeader.svelte";

    /** @type {{number: string, example: string, choices: {text: string, answer: boolean}[]}}*/
    export let question;
    /** @type {string}*/
    export let answer;
</script>

<div class="flex flex-col gap-2">
    <AdrHeader {question} />
    <div class="flex flex-col gap-3">
    {#each question.choices as choice}
        <div class="flex items-center gap-2 px-1.5 py-3 border-2 border-base-200 rounded-md">
            {#if choice.answer}
            <Icon class="h-6 w-6 text-success border border-primary rounded-full" icon="carbon:checkmark-filled"/>
            {:else if answer === choice.text}
            <Icon class="h-6 w-6 text-error border border-primary rounded-full" icon="carbon:close-filled"/>
            {:else}
            <span class="h-6 w-6 border border-primary rounded-full"></span>
            {/if}
            <div class="flex-1 text-sm lg:text-base">
                {choice.text}
            </div>
        </div>
        {/each}
    </div>
</div>