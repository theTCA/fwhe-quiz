<script>
	import QuizHistory from './HistoryQuestion.svelte';
	import HistoryHeader from './HistoryHeader.svelte';
	import { quizHistory } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let historyRange = $state(20);
	let deleteRange = $state(10);

	let { tab, selected = false } = $props();

	let groupedHistory = $derived(groupHistory($quizHistory[tab.id]));

	/** @type {HTMLElement | null}*/
	let listElement = $state(null);
	onMount(() => {
		if (listElement) {
			listElement.addEventListener('scroll', () => {
				if (!listElement) return;
				if (listElement.scrollTop + listElement.clientHeight >= listElement.scrollHeight) {
					historyRange += 10;
				}
			});
		}
	});

	onDestroy(() => {
		if (listElement) listElement.removeEventListener('scroll', () => {});
	});

	function deleteHistory() {
		if(deleteRange === -1) {
			$quizHistory[tab.id] = [];
		} else {
			$quizHistory[tab.id] = $quizHistory[tab.id].slice(0, $quizHistory[tab.id].length - deleteRange);
		}
	}

	/**
	 * @param {import("$lib/types").QuizHistory[]} history
	 */
	function groupHistory(history) {
		if (!history) return;
		let dateNow = new Date();
		/** @type {Array<{label: string, time: number, history: import("$lib/types").QuizHistory[]}>}*/
		let groups = [
			{
				label: 'Jetzt',
				time: 1,
				history: []
			},
			{
				label: 'Letzten Minuten',
				time: 10,
				history: []
			},
			{
				label: 'Letzter Stunde',
				time: 60,
				history: []
			},
			{
				label: 'Letzten Tag',
				time: 24 * 60,
				history: []
			},
			{
				label: 'Älter',
				time: Number.MAX_SAFE_INTEGER,
				history: []
			}
		];
		for (let question of history.slice(0, historyRange)) {
			let time = (dateNow.getTime() - question.date.getTime()) / 100000;
			let group = groups.find((g) => g.time > time);
			if (group) {
				group.history = [...group.history, question];
			}
		}
		return groups;
	}
</script>

{#if selected}
	<div class="mt-4 flex flex-col gap-2" id={tab.id}>
		<HistoryHeader history={$quizHistory[tab.id]} />
		<div class="self-end">
			<div class="join">
				<label class="select join-item">
					<span class="label"> ältesten </span>
					<select bind:value={deleteRange}>
						<option value={1}>1</option>
						<option value={3}>3</option>
						<option value={10}>10</option>
						<option value={50}>50</option>
						<option value={-1}>{$quizHistory[tab.id].length}</option>
					</select>
				</label>
				<button class="btn btn-square btn-error join-item" type="button" onclick={deleteHistory}>
					<Icon icon="mi:delete" />
				</button>
			</div>
		</div>
		<div class="flex h-120 flex-col gap-4 overflow-y-scroll" bind:this={listElement}>
			{#each groupedHistory as group (group.label)}
				{#if group.history.length > 0}
					<h2 class="sticky top-0 z-10 bg-base-200 text-lg font-semibold">{group.label}</h2>
					<div class="flex flex-col gap-2">
						{#each group.history as history (history.date)}
							<QuizHistory {history} />
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}
