<script>
    export let question;
</script>

<div class="px-2 flex items-center gap-2">
    {#each question.tags as tag}
        <span class="badge badge-outline badge-sm">
            {tag}
        </span>
    {/each}
</div>