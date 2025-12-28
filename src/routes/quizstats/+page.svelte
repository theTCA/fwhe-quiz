<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import {catalogues} from "$lib/data.json";

    const flattendQuestions = catalogues.map(c => c.questions.map(q => ({...q, catalogue: c.name}))).flat();

    const longestCatalog = catalogues.reduce((acc, c) => c.questions.length > acc.questions.length ? c : acc);
    const shortestCatalog = catalogues.reduce((acc, c) => c.questions.length < acc.questions.length ? c : acc);

    const rightChoices = flattendQuestions.reduce((acc, q) => {
        const sortedLength = q.choices.sort((a, b) => a.text.length - b.text.length);
        if(sortedLength.length === 3) {
            acc.short += sortedLength[0].answer ? 1 : 0;
            acc.middle += sortedLength[1].answer ? 1 : 0;
            acc.long += sortedLength[2].answer ? 1 : 0;
        }
        return acc;
    }, {short: 0, middle: 0, long: 0});
    const stats = [
        {
            name: "Fragenkataloge",
            elements: [
                {
                    title: "gesamt",
                    value: catalogues.length
                },
                {
                    title: "kürzester Katalog",
                    value: `${shortestCatalog.name} (${shortestCatalog.questions.length})`
                },
                {
                    title: "längster Katalog",
                    value: `${longestCatalog.name} (${longestCatalog.questions.length})`
                }
            ]
        },
        {
            name: "Fragen",
            elements: [
                {
                    title: "gesamt",
                    value: flattendQuestions.length
                },
                {
                    title: "mit Bildern",
                    value: flattendQuestions.filter(q => q.image).length
                },
                {
                    title: "mit Hilfestellung",
                    value: flattendQuestions.filter(q => q.help.length > 0).length
                }
            ]
        },
        {
            name: "Antworten",
            elements: [
                {
                    title: "kürzeste Richtige",
                    value: `${rightChoices.short} (${Math.round((rightChoices.short/flattendQuestions.length) * 100)}%)`
                },
                {
                    title: "mittlere Richtige",
                    value: `${rightChoices.middle} (${Math.round((rightChoices.middle/flattendQuestions.length) * 100)}%)`
                },
                {
                    title: "längste Richtige",
                    value: `${rightChoices.long} (${Math.round((rightChoices.long/flattendQuestions.length) * 100)}%)`
                }
            ]
        }
    ];
</script>

<svelte:head>
    <title>Statistik - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Statistik</h1>
    <div>
        {#each stats as statgroup}
        <div class="mb-4 bg-base-200 rounded-md p-2">
            <h2 class="text-xl text-primary font-semibold text-center mb-2">{statgroup.name}</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 text-center">
                {#each statgroup.elements as stat}
                <div>
                    <h3 class="text-sm lg:text-base opacity-60">{stat.title}</h3>
                    <p class="font-bold text-xl lg:text-2xl wrap-break-word">{stat.value}</p>
                </div>
                {/each}
            </div>
        </div>
        {/each}
    </div>
</div>