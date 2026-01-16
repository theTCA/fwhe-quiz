<script>
	import Icon from "@iconify/svelte";

    let {children, ...props} = $props();
</script>

<div class="alert shadow-md">
    <Icon class="size-6 text-info" icon="material-symbols:info-outline" />
    {@render children?.()}
</div>