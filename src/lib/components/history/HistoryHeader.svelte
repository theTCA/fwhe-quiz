<script>
	let { history = [] } = $props();

	let correctQuestions = $derived(history.reduce(reduceCorrectQuestions, 0));
	let correctQuestionsProgress = $derived(
		history.length > 0 ? Math.round((correctQuestions / history.length) * 100) : 0
	);
	let historyAsCatalogues = $derived(history.reduce(reduceCatalogues, {}));
	let worstCatalog = $derived(
		Object.keys(historyAsCatalogues).reduce(
			(acc, c) => {
				let ratio = historyAsCatalogues[c].incorrect / history.length;
				return ratio > acc.ratio ? { ratio: ratio, catalog: c } : acc;
			},
			{ ratio: 0, catalog: '-' }
		)
	);

	/**
	 * @param {any} acc
	 * @param {import("$lib/types").QuizHistory} history
	 */
	function reduceCatalogues(acc, history) {
		let catalog = history.question.catalog;
		let correctChoice = history.question.choices.find(
			(/** @type {{text:string, answer: boolean; }} */ c) => c.answer
		);
		if (catalog && correctChoice) {
			if (catalog in acc) {
				correctChoice.text === history.answer
					? (acc[catalog].correct += 1)
					: (acc[catalog].incorrect += 1);
			} else {
				acc[catalog] = { correct: 0, incorrect: 0 };
				correctChoice.text === history.answer
					? (acc[catalog].correct += 1)
					: (acc[catalog].incorrect += 1);
			}
		}
		return acc;
	}

	/**
	 * @param {number} acc
	 * @param {import("$lib/types").QuizHistory} history
	 */
	function reduceCorrectQuestions(acc, history) {
		let correctChoice = history.question.choices.find(
			(/** @type {{text:string, answer: boolean; }} */ c) => c.answer
		);
		if (correctChoice) {
			return correctChoice.text === history.answer ? acc + 1 : acc;
		}
		return acc;
	}
</script>

<div class="grid grid-cols-1 items-end rounded-md border-2 border-base-200 p-2 lg:grid-cols-3">
	<div>
		<div class="text-center text-lg font-bold text-primary">
			{history.length}
		</div>
		<h3 class="text-center text-sm font-semibold opacity-70">beantwortete Fragen</h3>
	</div>
	<div class="inline-flex flex-col gap-2">
		<div
			class="radial-progress self-center font-bold text-primary"
			style={`--value:${correctQuestionsProgress};`}
			role="progressbar"
		>
			{`${correctQuestionsProgress}%`}
		</div>
		<h3 class="text-center text-sm font-semibold opacity-70">richtige Antworten</h3>
	</div>
	<div class="">
		<div class="text-center text-lg font-bold text-primary">
			{worstCatalog.catalog}
			{#if worstCatalog.catalog !== '-'}
				{`(${historyAsCatalogues[worstCatalog.catalog].incorrect})`}
			{/if}
		</div>
		<h3 class="text-center text-sm font-semibold opacity-70">meisten Fehler in Fragenkatalog</h3>
	</div>
</div>
