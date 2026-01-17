<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { page } from '$app/state';
	import HistoryTab from '$lib/components/history/HistoryTab.svelte';

	const tabs = [
		{
			id: 'endless',
			name: 'Endlosquiz'
		},
		{
			id: 'quiz',
			name: 'Quiz'
		}
	];
	let selectedTab = $state(tabs[0].id);
	if (page.url.hash && tabs.some((t) => '#' + t.id === page.url.hash)) {
		selectedTab = page.url.hash.replace('#', '');
	}
</script>

<svelte:head>
	<title>Verlauf - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-center text-3xl font-semibold">Verlauf</h1>
	<div role="tablist" class="tabs-box tabs w-full tabs-xl">
		{#each tabs as tab (tab.id)}
			{#if selectedTab == tab.id}
				<button
					role="tab"
					type="button"
					class="tab-active tab flex-auto select-auto"
					onclick={() => (selectedTab = tab.id)}>{tab.name}</button
				>
			{:else}
				<button
					role="tab"
					type="button"
					class="tab flex-auto select-auto"
					onclick={() => (selectedTab = tab.id)}>{tab.name}</button
				>
			{/if}
		{/each}
	</div>
	{#each tabs as tab (tab.id)}
		<HistoryTab {tab} selected={selectedTab === tab.id} />
	{/each}
</div>
