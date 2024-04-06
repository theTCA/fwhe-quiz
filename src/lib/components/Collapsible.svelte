<script>
    export let hidden = false;
</script>

{#if !hidden}
<div class="collapse bg-base-200">
    <input type="checkbox">
    <div class="collapse-title">
        <slot name="title"/>
    </div>
    <div class="collapse-content">
        <slot name="content"/>
    </div>
</div>
{/if}