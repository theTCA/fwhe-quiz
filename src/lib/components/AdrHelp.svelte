<script>
    import { helps } from "$lib/adr.json";
</script>

<div class="flex flex-col gap-2">
    {#each helps as help}
    <div class="flex flex-row text-sm gap-1">
        <h4 class="font-bold">{help?.number}</h4>
        <div>
            {help?.description}
        </div>
    </div>
    {/each}
    <div class="text-xs pt-1 pl-2">
        Quelle: <a class="link link-primary" target="_blank" href="https://de.wikipedia.org/wiki/Nummer_zur_Kennzeichnung_der_Gefahr">Wikipedia</a>
    </div>
</div>