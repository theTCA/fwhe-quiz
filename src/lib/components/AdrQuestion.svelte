<script>
    import AdrHeader from "./AdrHeader.svelte";

    /** @type {{number: string, example: string, choices: {text: string, answer: boolean}[]}}*/
    export let question;

    /** @type {string}*/
    export let answer = "";
</script>


<div class="flex flex-col gap-2">
    <AdrHeader {question}/>
    <div class="flex flex-col gap-3">
        {#each question.choices as choice}
            <label class="flex items-center gap-2 px-1.5 py-3 cursor-pointer border-2 border-base-200 rounded-md">
                <input class="radio radio-primary" type="radio" value={choice.text} bind:group={answer}>
                <div class="text-sm lg:text-base">
                    {choice.text}
                </div>
            </label>
            {/each}
    </div>
</div>