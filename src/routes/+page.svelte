<script>
    import {storageAvailable} from "$lib/helper";
    import { meta } from "$lib/data.json";
    import Icon from "@iconify/svelte";

    const cards = [
        {
            name: "Training",
            desc: "Beantworte Fragen aus dem Fragenkatalog nach Wahl.",
            href: "/training"
        },
        {
            name: "Quiz",
            desc: "Beantworte zufällige Fragen aus dem Fragenkatalog.",
            href: "/quiz"
        },
        {
            name: "ADR-Quiz",
            desc: "Beantworte Fragen zu Gefahrgütern und deren Kennzeichnung.",
            href: "/adrquiz"
        },
        {
            name: "PDF-Quiz",
            desc: "Erstelle Fragen- und Antwortenbogen als PDF.",
            href: "/pdfquiz"
        },
        {
            name: "Statistik",
            desc: "Informationen über Fragenkatalog",
            href: "/quizstats"
        },
        {
            name: "Verlauf",
            desc: "Historie der beantworteten Fragen",
            href: "/history"
        }
    ];
</script>

<svelte:head>
    <title>Startseite - HFLÜ-Trainer</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold">HFLÜ-Trainer</h1>
    <div class="mt-4 p-4 text-center text-lg bg-base-200 rounded-md">
        <div class="font-semibold">
            Trainer zum Vorbereiten auf die hessische Feuerwehrleistungsübung.
        </div>
        <div class="divider"></div>
        Die Fragen stammen aus dem Fragenkatalog der <a class="link link-primary" href="https://hlfs.hessen.de">hessischen Landesfeuerwehrschule</a>.
        <div class="text-sm">
            Stand: {meta.date}
        </div>
        <div class="divider"></div>
        <div class="text-sm">
            Dieser Trainer verwendet statische Seiten und benutzt wenn möglich den <a class="link link-primary" href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">LocalStorage</a> des
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
    <div class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2">
        {#each cards as card}
        <a href={card.href} class="btn flex flex-col flex-nowrap h-full w-full p-2">
            <h2 class="text-xl text-primary"> {card.name} </h2>
            <p>{card.desc}</p>
        </a>
        {/each}
    </div>
</div>