<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { catalogues } from '$lib/data.json';

	const flattendQuestions = catalogues
		.map((c) => c.questions.map((q) => ({ ...q, catalogue: c.name })))
		.flat();

	const longestCatalog = catalogues.reduce((acc, c) =>
		c.questions.length > acc.questions.length ? c : acc
	);
	const shortestCatalog = catalogues.reduce((acc, c) =>
		c.questions.length < acc.questions.length ? c : acc
	);

	const rightChoices = flattendQuestions.reduce(
		(acc, q) => {
			const sortedLength = q.choices.sort((a, b) => a.text.length - b.text.length);
			if (sortedLength.length === 3) {
				acc.short += sortedLength[0].answer ? 1 : 0;
				acc.middle += sortedLength[1].answer ? 1 : 0;
				acc.long += sortedLength[2].answer ? 1 : 0;
			}
			return acc;
		},
		{ short: 0, middle: 0, long: 0 }
	);
	const stats = [
		{
			name: 'Fragenkataloge',
			elements: [
				{
					title: 'gesamt',
					value: catalogues.length
				},
				{
					title: 'kürzester Katalog',
					value: `${shortestCatalog.name} (${shortestCatalog.questions.length})`
				},
				{
					title: 'längster Katalog',
					value: `${longestCatalog.name} (${longestCatalog.questions.length})`
				}
			]
		},
		{
			name: 'Fragen',
			elements: [
				{
					title: 'gesamt',
					value: flattendQuestions.length
				},
				{
					title: 'mit Bildern',
					value: flattendQuestions.filter((q) => q.image).length
				},
				{
					title: 'mit Hilfestellung',
					value: flattendQuestions.filter((q) => q.help.length > 0).length
				}
			]
		},
		{
			name: 'Antworten',
			elements: [
				{
					title: 'kürzeste Richtige',
					value: `${rightChoices.short} (${Math.round((rightChoices.short / flattendQuestions.length) * 100)}%)`
				},
				{
					title: 'mittlere Richtige',
					value: `${rightChoices.middle} (${Math.round((rightChoices.middle / flattendQuestions.length) * 100)}%)`
				},
				{
					title: 'längste Richtige',
					value: `${rightChoices.long} (${Math.round((rightChoices.long / flattendQuestions.length) * 100)}%)`
				}
			]
		}
	];
</script>

<svelte:head>
	<title>Statistik - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-center text-3xl font-semibold">Statistik</h1>
	<div>
		{#each stats as statgroup (statgroup.name)}
			<div class="mb-4 rounded-md bg-base-200 p-2">
				<h2 class="mb-2 text-center text-xl font-semibold text-primary">{statgroup.name}</h2>
				<div class="grid grid-cols-1 gap-2 text-center lg:grid-cols-3">
					{#each statgroup.elements as stat (stat.title)}
						<div>
							<h3 class="text-sm opacity-60 lg:text-base">{stat.title}</h3>
							<p class="text-xl font-bold wrap-break-word lg:text-2xl">{stat.value}</p>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
