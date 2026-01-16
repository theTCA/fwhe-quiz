<script>
	import Icon from '@iconify/svelte';
	import { bookmarks } from '$lib/stores';

	/**
	 * @typedef {Object} Props
	 * @property {import("$lib/types").Question} question
	 */

	/** @type {Props & { [key: string]: any }} */
	let { ...props } = $props();

	let inBookmarks = $derived(
		$bookmarks.some((/** @type {{ id: number; }} */ b) => b.id === props.question.id)
	);

	function onClick() {
		if (inBookmarks) {
			removeQuestion();
		} else {
			addQuestion();
		}
	}

	function addQuestion() {
		$bookmarks = [...$bookmarks, props.question];
	}

	function removeQuestion() {
		$bookmarks = $bookmarks.filter(
			(/** @type {{ id: number; }} */ b) => b.id !== props.question.id
		);
	}
</script>

<div class={props.class}>
	<div class="indicator">
		<button class="btn btn-square btn-sm lg:btn-md" type="button" onclick={onClick}>
			{#if inBookmarks}
			<Icon class="size-5 text-success" icon="material-symbols:bookmark-check-outline" />
			{:else}
			<Icon class="size-5" icon="material-symbols:bookmark-add-outline" />
			{/if}
		</button>
	</div>
</div>
