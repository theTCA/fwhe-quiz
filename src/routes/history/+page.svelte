<script>
    import {quizHistory} from "$lib/stores";
</script>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Verlauf</h1>
    <button class="btn btn-error btn-sm" on:click={() => $quizHistory = []}>Löschen</button>
    <div>
        {#each $quizHistory.slice($quizHistory.length - 10) as history}
        <div>
            {history.question.question}
        </div>
        {/each}
    </div>
</div>