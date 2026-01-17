<script>
	let { addSelectedQuestions, selectedQuestions = $bindable() } = $props();
	let selectedQuestionsCount = $derived(
		selectedQuestions.reduce(
			(/** @type {number} */ acc, /** @type {{ selected: number[]; }} */ c) =>
				acc + c.selected.length,
			0
		)
	);

	/**
	 * @param {Event & {currentTarget: HTMLInputElement}} e
	 * @param {import("$lib/types").Catalog & {selected: number[]}} catalog
	 */
	function selectAllQuestions(e, catalog) {
		if (!catalog) return;
		let isChecked = false;
		if (e.currentTarget) {
			isChecked = e.currentTarget.checked;
		}
		if (isChecked) {
			catalog.selected = catalog.questions.map((q) => q.id);
		} else {
			catalog.selected = [];
		}
	}
</script>

<div class="flex flex-col gap-2">
	<div class="join join-vertical">
		{#each selectedQuestions as catalog (catalog.name)}
			<div class="join join-item border">
				<div class="join-item inline-flex justify-center pt-4 pl-2">
					<input
						class="checkbox checkbox-primary"
						type="checkbox"
						checked={catalog.selected.length === catalog.questions.length}
						onchange={(e) => selectAllQuestions(e, catalog)}
					/>
				</div>
				<div class="collapse-arrow collapse join-item">
					<input type="checkbox" />
					<h3 class="collapse-title pl-2 font-semibold">
						<div class="flex justify-between">
							{catalog.name}
							<span class="badge badge-soft badge-xs">
								{catalog.selected.length}
							</span>
						</div>
					</h3>
					<div class="collapse-content flex flex-col gap-2">
						{#each catalog.questions as question (question.id)}
							<div>
								<label class="flex flex-row items-center gap-2">
									<input
										class="checkbox checkbox-sm checkbox-primary"
										type="checkbox"
										value={question.id}
										bind:group={catalog.selected}
									/>
									<div class="flex w-full items-center justify-between gap-1">
										<span class="text-sm">
											{question.question}
										</span>
										{#if question.image}
											<span class="badge badge-soft badge-sm badge-info">Bild</span>
										{/if}
									</div>
								</label>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="mt-4 grid grid-cols-2 gap-2">
		<button class="btn btn-block btn-error" type="reset"> Zurücksetzten </button>
		<button class="btn btn-block btn-success" type="submit" onclick={addSelectedQuestions}>
			<span class="badge badge-soft badge-sm">{selectedQuestionsCount}</span>
			Auswählen
		</button>
	</div>
</div>
