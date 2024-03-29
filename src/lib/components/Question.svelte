<script>
    import QuestionHeader from "./QuestionHeader.svelte";

    /** @type {import("$lib/types").Question}*/
    export let question;
    export let showCatalog = true;
    export let answer = "";
    export let disabled = false;
</script>

<div>
    <QuestionHeader {question} {showCatalog}/>
    <div class="flex flex-col gap-3">
    {#each question.choices as choice}
        <label class="flex items-center gap-2 px-1.5 py-3 cursor-pointer border-2 border-base-200 rounded-md">
            <input class="radio radio-primary" type="radio" value={choice.text} bind:group={answer} {disabled}>
            <div class="text-sm lg:text-base">
                {choice.text}
            </div>
        </label>
        {/each}
    </div>
</div>