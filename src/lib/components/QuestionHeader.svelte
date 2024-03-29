<script>
    import {images} from "$lib/data.json";

    /** @type {import("$lib/types").Question}*/
    export let question;
    /** @type {boolean} */
    export let showCatalog;
</script>

<div class=" text-center mb-2 flex flex-col">
    <div class="text-base lg:text-lg font-semibold">
        {question.question}
    </div>
    {#if showCatalog}
    <span class="text-xs lg:text-sm font-bold opacity-65">aus {question.catalog}</span>
    {/if}
    {#if question.image}
    <div class="w-32 h-32 mx-auto py-1">
        <img src={`./img/${images.find(i => i.id === question.image)?.file}`} alt={images.find(i => i.id === question.image)?.description}>
    </div>
    {/if}
</div>