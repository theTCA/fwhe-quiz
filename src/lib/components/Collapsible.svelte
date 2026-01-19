<script>
	let { hidden = $bindable(false), open = $bindable(false), title, content, ...props } = $props();
</script>

{#if !hidden}
	<div class={'collapse-plus collapse bg-base-200 ' + props.class}>
		<input type="checkbox" checked={open} />
		<div class="collapse-title ps-12 pe-4 after:start-5 after:end-auto">
			{@render title?.()}
		</div>
		<div class="collapse-content overflow-y-auto">
			{@render content?.()}
		</div>
	</div>
{/if}
