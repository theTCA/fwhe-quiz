<script>
    import {helps} from "$lib/data.json";
    /**
     * @type {import("$lib/types").Question}
     */
    export let question;
    const questionHelp = question.help.map(q => ({...helps.find((/** @type {{ name: string; }} */ h) => h.name === q.name), page: q.page}));
</script>

{#if questionHelp}
<div class="flex flex-col gap-2">
    {#each questionHelp as help}
    <a class="btn flex flex-col flex-nowrap justify-center items-center text-sm h-full gap-0.5" href={`${help.source}#page=${help.page}`} target="_blank">
        <h4 class="font-bold"> {help.name} </h4>
        <div>
            <div>
                {help.description}
            </div>
            <div class="text-xs mt-0.5">
                Seite {help.page}
            </div>
        </div>
    </a>
    {/each}
</div>
{/if}