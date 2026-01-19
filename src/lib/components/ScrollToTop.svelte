<script>
	import Icon from '@iconify/svelte';

	let clientHeight = $state(0);
	let position = $state(0);
	let show = $derived(position > clientHeight);

	function scrollTop() {
		window.scrollTo(0, 0);
	}
</script>

<svelte:window bind:scrollY={position} bind:innerHeight={clientHeight} />

{#if show}
	<div class="fab">
		<button class="btn btn-circle btn-lg btn-primary" type="button" onclick={scrollTop}>
			<Icon icon="solar:map-arrow-up-bold" />
		</button>
	</div>
{/if}
