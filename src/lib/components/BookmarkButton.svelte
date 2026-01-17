<script>
	import Icon from '@iconify/svelte';
	import { bookmarks } from '$lib/stores';
	import { flattendQuestions } from '$lib/data';

	let { question, ...props } = $props();

	let inBookmarks = $derived($bookmarks.some((b) => b.id === question.id));

	function onClick() {
		if (inBookmarks) {
			removeQuestion();
		} else {
			addQuestion();
		}
	}

	function addQuestion() {
		if ('catalog' in question) {
			$bookmarks = [...$bookmarks, question];
			return;
		}
		let myQuestion = flattendQuestions.find((q) => q.id === question.id);
		if (myQuestion) $bookmarks = [...$bookmarks, myQuestion];
	}

	function removeQuestion() {
		$bookmarks = $bookmarks.filter((b) => b.id !== question.id);
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
