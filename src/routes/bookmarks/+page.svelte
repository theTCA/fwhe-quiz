<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Alert from '$lib/components/Alert.svelte';
	import SearchResult from '$lib/components/SearchResult.svelte';
	import SearchResultModal from '$lib/components/SearchResultModal.svelte';
	import { bookmarks } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import { derived } from 'svelte/store';

	let modal = $state();
	let modalQuestion = $state();

	/**
	 * @param {number} id
	 */
	function removeBookmark(id) {
		$bookmarks = $bookmarks.filter((/** @type {{ id: number; }} */ b) => b.id !== id);
	}

	/**
	 * @param {import('$lib/types').Question} question
	 */
	function selectQuestion(question) {
		modalQuestion = question;
		modal.showModal();
	}

	const bookmarksByCatalog = derived(bookmarks, ($bookmarks) => {
		/** @type {{name: string, questions:import('$lib/types').Question[]}[]} */
		let val = [];
		return $bookmarks
			.sort((a, b) => a.id - b.id)
			.reduce((acc, b) => {
				let myCatalog = acc.find((c) => c.name === b.catalog);
				if (myCatalog) {
					myCatalog.questions = [...myCatalog.questions, b];
				} else {
					if (b.catalog) acc = [...acc, { name: b.catalog, questions: [b] }];
				}
				return acc;
			}, val);
	});
</script>

<svelte:head>
	<title>Lesezeichen - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-center text-3xl font-semibold">Lesezeichen</h1>
	{#if $bookmarks.length > 0}
		<div class="flex flex-col gap-2">
			{#each $bookmarksByCatalog as catalog (catalog.questions)}
				<div class="flex flex-col gap-1">
					<h3 class="font-semibold text-primary">{catalog.name}</h3>
					{#each catalog.questions as question (question.id)}
						<div class="flex items-center gap-2">
							<SearchResult {question} onclick={() => selectQuestion(question)} />
							<button
								class="btn btn-square shadow-md btn-soft btn-error"
								type="button"
								onclick={() => removeBookmark(question.id)}
							>
								<Icon icon="mi:delete" />
							</button>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{:else}
		<div class="mt-8 flex flex-col items-center justify-center">
			<h2 class="mb-2 text-lg font-semibold">Noch keine Einträge.</h2>
			<div class="flex flex-col gap-2 text-sm">
				<Alert>
					<div>
						<div>
							Mit
							<div class="btn btn-square cursor-auto btn-sm select-none">
								<Icon class="size-5" icon="material-symbols:bookmark-add-outline" />
							</div>
							Fragen als Lesezeichen hinzufügen.
						</div>
						Lesezeichen können verwendet werden um:
						<ul class="m-1">
							<li>im Training gepeicherte Fragen gezielt zu wiederholen</li>
							<li>im PDF-Quiz einzelne Fragen hinzuzufügen</li>
						</ul>
					</div>
				</Alert>
			</div>
		</div>
	{/if}
</div>
<SearchResultModal question={modalQuestion} bind:modal />
