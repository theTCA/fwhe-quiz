<script>
    import {storageAvailable} from "$lib/helper";
    import {pageGroups} from "$lib/pages";
    import {meta} from "$lib/data.json";
    import Icon from "@iconify/svelte";
    import { PUBLIC_APP_NAME } from "$env/static/public";
</script>

<svelte:head>
    <title>{PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold">
        {PUBLIC_APP_NAME}
    </h1>
    <div class="mt-4 p-4 text-center text-lg bg-base-200 rounded-md">
        <div class="font-semibold">
            Quiz zum Vorbereiten auf die hessische Feuerwehrleistungsübung.
        </div>
        <div class="divider"></div>
        Die Fragen stammen aus dem Fragenkatalog der <a class="link link-primary" href="https://hlfs.hessen.de">hessischen Landesfeuerwehrschule</a>.
        <div class="text-sm">
            Stand: {meta.date}
        </div>
        <div class="divider"></div>
        <div class="text-sm">
            Diese Webseite verwendet statische Seiten und benutzt wenn möglich den <a class="link link-primary" href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">LocalStorage</a> des
            <span class="inline-flex items-center gap-2">
                Browsers.
                {#if typeof window !== 'undefined' && storageAvailable("localStorage")}
                <Icon class="text-success" icon="material-symbols:check-circle"/>
                {:else}
                <Icon class="text-error" icon="material-symbols:error"/>
                {/if}
            </span>
        </div>
    </div>
    {#each pageGroups as group}
    <div class="flex flex-col gap-2">
        <div class="divider text-primary text-lg font-bold">{group.name}</div>
        <div class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {#each group.pages as card}
            <a href={card.href} class="btn flex flex-col flex-nowrap h-full w-full p-2">
                <div class="rounded-full text-primary bg-base-100">
                    <Icon class="w-16 h-16 p-2" icon={card.icon}/>
                </div>
                <h2 class="text-xl text-primary"> {card.name} </h2>
                <p>{card.desc}</p>
            </a>
        {/each}
        </div>
    </div>
    {/each}
</div>