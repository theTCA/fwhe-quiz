<script>
	import Icon from '@iconify/svelte';
	import QuestionDisplay from './QuestionDisplay.svelte';

	let { question, modal = $bindable() } = $props();
</script>

<dialog id="questionModal" class="modal" bind:this={modal}>
	<form class="modal-box max-h-11/12 max-w-10/12" method="dialog">
		<div class="flex items-center justify-center">
			{#if question}
				<QuestionDisplay {question} />
			{/if}
		</div>
		<button
			class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm"
			onclick={() => modal.close()}
		>
			<Icon icon="mdi:close" />
		</button>
	</form>
	<form method="dialog" class="modal-backdrop select-none">
		<button aria-label="backdrop"></button>
	</form>
</dialog>
