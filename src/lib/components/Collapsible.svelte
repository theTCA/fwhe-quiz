<script>
	let { hidden = $bindable(false), open = $bindable(false), title, content } = $props();
</script>

{#if !hidden}
	<div class="collapse bg-base-200">
		<input type="checkbox" checked={open} />
		<div class="collapse-title">
			{@render title?.()}
		</div>
		<div class="collapse-content overflow-y-auto">
			{@render content?.()}
		</div>
	</div>
{/if}
