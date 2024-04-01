<script>
    import QuizHistory from "$lib/components/QuizHistory.svelte";
    import {quizHistory} from "$lib/stores";
</script>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Verlauf</h1>
    <button class="btn btn-error btn-sm" on:click={() => $quizHistory = []}>Löschen</button>
    <div>
        {#each $quizHistory.slice(0, 10) as history}
        <QuizHistory {history} />
        {/each}
    </div>
</div>