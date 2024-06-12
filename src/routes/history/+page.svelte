<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { quizHistory } from "$lib/stores";
    import HistoryHeader from "$lib/components/HistoryHeader.svelte";
    import QuizHistory from "$lib/components/QuizHistory.svelte";

    $: historyRange = 10;
    $: deleteRange = 10;

    /**
     * @param {number} range
     */
    function groupHistory(range) {
        /** @type {{label: string, time: number, history: import("$lib/types").QuizHistory[]}[]}*/
        let groups = [
            {
                label: "Jetzt",
                time: 1,
                history: []
            },
            {
                label: "Letzten Minuten",
                time: 10,
                history: []
            },
            {
                label: "Letzter Stunde",
                time: 60,
                history: []
            },
            {
                label: "Letzten Tag",
                time: 24*60,
                history: []
            },
            {
                label: "Älter",
                time: Number.MAX_SAFE_INTEGER,
                history: []
            }
        ];
        let amount = 0;
        for(let history of $quizHistory) {
            let diff = (Date.now() - history.date) / 60000;
            for(let group of groups) {
                if(diff < group.time) {
                    group.history = [...group.history, history];
                    break;
                }
            }
            amount++;
            if(amount >= range)
                break;
        }
        return groups;
    }

    function deleteHistory() {
        if($quizHistory.length <= deleteRange) {
            $quizHistory = [];
        } else {
            $quizHistory = $quizHistory.slice(0, $quizHistory.length - deleteRange);
        }
    }
</script>

<svelte:head>
    <title>Verlauf - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <h1 class="text-3xl text-center font-semibold mb-2">Verlauf</h1>
    <HistoryHeader/>
    <div class="divider"></div>
    <div class="flex flex-col gap-4">
        {#if $quizHistory.length > 0}
        <div class="flex flex-row items-center gap-2">
            <span class="font-bold"> Letzten </span>
            <select class="select select-bordered select-sm" bind:value={historyRange}>
                <option value={10}> 10 </option>
                <option value={20}> 20 </option>
                <option value={50}> 50 </option>
                <option value={$quizHistory.length}> Alle </option>
            </select>
            <span class="font-bold"> Fragen </span>
        </div>
        {/if}
        <div class="flex flex-col gap-1">
            {#each groupHistory(historyRange) as group}
                {#if group.history.length > 0}
                <div>
                    <span class="font-bold text-primary text-sm"> {group.label} </span>
                    <div class="flex flex-col gap-0.5">
                        {#each group.history as history}
                            <QuizHistory {history}/>
                        {/each}
                    </div>
                </div>
                {/if}
            {/each}
        </div>
        {#if $quizHistory.length > 0}
        <div class="flex items-center gap-2">
            <span class="font-bold"> ältesten </span>
            <div class="join">
                <select class="join-item select select-error select-sm" bind:value={deleteRange}>
                    <option value={10}> 10 </option>
                    <option value={20}> 20 </option>
                    <option value={50}> 50 </option>
                    <option value={$quizHistory.length}> Alle </option>
                </select>
                <button class="join-item btn btn-error btn-sm" on:click={deleteHistory}> Löschen </button>
            </div>
        </div>
        {/if}
    </div>
</div>