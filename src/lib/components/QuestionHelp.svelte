<script>
    import {helps} from "$lib/data.json";
    /**
     * @type {import("$lib/types").Question}
     */
    export let question;
    const questionHelp = question.help.map(q => ({...helps.find((/** @type {{ name: string; }} */ h) => h.name === q.name), page: q.page}));
</script>

{#if questionHelp}
<div class="flex flex-wrap">
    {#each questionHelp as help}
    <a class="btn flex-col flex-1" href={`${help.source}#page=${help.page}`} target="_blank">
        <h4 class="text-sm font-bold"> {help.name} </h4>
        <div>
            {help.description}
        </div>
    </a>
    {/each}
</div>
{/if}