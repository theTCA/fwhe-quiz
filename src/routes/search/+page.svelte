<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Icon from '@iconify/svelte';
	import { catalogues } from '$lib/data.json';
	import { flattendQuestions } from '$lib/data';
	import Fuse from 'fuse.js';
	import SearchResult from '$lib/components/SearchResult.svelte';
	import SearchResultModal from '$lib/components/SearchResultModal.svelte';
	import Collapsible from '$lib/components/Collapsible.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';

	let filterOptions = $state(['question']);
	let fuse = $derived(
		new Fuse(flattendQuestions, { keys: filterOptions, threshold: 0.4, ignoreLocation: true })
	);
	let searchQuery = $state('');
	let debouncedQuery = $state('');
	let searchResult = $derived(fuse.search(debouncedQuery).map((v) => v.item));

	let modal = $state();
	let modalQuestion = $state();

	$effect(() => {
		if (!searchQuery) {
			debouncedQuery = '';
			return;
		}
		const handler = setTimeout(() => {
			debouncedQuery = searchQuery;
		}, 400);
		return () => clearTimeout(handler);
	});

	/**
	 * @param {import('$lib/types').Question} question
	 */
	function selectQuestion(question) {
		modalQuestion = question;
		modal.showModal();
	}
</script>

<svelte:head>
	<title>Durchsuchen - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-center text-3xl font-semibold">Durchsuchen</h1>
	<div class="flex flex-col gap-2">
		<div class="join w-full justify-end">
			<label class="input join-item w-full md:w-1/2 lg:w-1/3">
				{#if searchQuery !== debouncedQuery}
					<span class="loading size-4 loading-spinner"></span>
				{:else}
					<Icon class="size-4" icon="mdi:search" />
				{/if}
				<input
					type="search"
					autocomplete="off"
					spellcheck="false"
					placeholder="Suche"
					bind:value={searchQuery}
				/>
			</label>
			<button
				type="button"
				class="btn join-item btn-square btn-soft btn-error"
				onclick={() => (searchQuery = '')}
			>
				<Icon icon="lucide:delete" />
			</button>
		</div>
		<Collapsible class="shadow-md">
			{#snippet title()}
				<span class="font-semibold"> Themenbereiche </span>
			{/snippet}
			{#snippet content()}
				<div class="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3">
					{#each catalogues as catalog ('tag' + catalog.name)}
						<a
							class="btn shadow-md btn-soft btn-sm"
							href={`#catalog-${catalog.name.toLowerCase().replace(' ', '_')}`}
						>
							{catalog.name}
						</a>
					{/each}
				</div>
			{/snippet}
		</Collapsible>
		{#if debouncedQuery.length > 0}
			<h2>Optionen</h2>
			<div>
				<label class="">
					<input type="checkbox" class="toggle" bind:group={filterOptions} value="question" />
					<span class="label cursor-pointer"> Fragen </span>
				</label>
				<label class="">
					<input type="checkbox" class="toggle" bind:group={filterOptions} value="choices.text" />
					<span class="label cursor-pointer"> Antworten </span>
				</label>
			</div>
		{/if}
	</div>
	<div class="mt-4 flex flex-col gap-2">
		{#if debouncedQuery.length > 0}
			<div>
				Ergebnisse:
				<span class="font-bold">{searchResult.length}</span>
			</div>
			{#each searchResult as question (question.id)}
				<SearchResult {question} onclick={() => selectQuestion(question)} />
			{/each}
		{:else}
			{#each catalogues as catalog (catalog.name)}
				<div class="flex flex-col gap-1">
					<h3
						id={`catalog-${catalog.name.toLowerCase().replace(' ', '_')}`}
						class="flex flex-row items-center gap-1 font-bold text-primary"
					>
						<span class="opacity-50"> # </span>
						<span> {catalog.name} </span>
					</h3>
					<div class="flex flex-col gap-2">
						{#each catalog.questions as question (question.id)}
							<SearchResult {question} onclick={() => selectQuestion(question)} />
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
<ScrollToTop />
<SearchResultModal question={modalQuestion} bind:modal />
