<script>
    export let hidden = false;
    export let open = false;
</script>

{#if !hidden}
<div class="collapse bg-base-200">
    <input type="checkbox" checked={open}>
    <div class="collapse-title">
        <slot name="title"/>
    </div>
    <div class="collapse-content overflow-y-auto">
        <slot name="content"/>
    </div>
</div>
{/if}