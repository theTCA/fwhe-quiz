<script>
    import {catalogues} from "$lib/data.json";
    import Icon from "@iconify/svelte";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    /**
     * @param {number} id
     */
    function addQuestion(id) {
        dispatch("add", {
            id: id
        });
    }

    /**
     * @param {number[]} ids
     */
    function addQuestions(ids) {
        for(let id of ids)
            addQuestion(id);
    }
</script>

<ul class="menu">
    {#each catalogues as catalog}
    <li>
        <details>
            <summary>
                <button type="button" class="btn btn-xs btn-primary btn-square btn-outline" on:click={() => addQuestions(catalog.questions.map(q => q.id))}>
                    <Icon icon="mdi:add-bold"/>
                </button>
                <div>
                    {catalog.name}
                </div>
                <span class="badge badge-outline">{catalog.questions.length}</span>
            </summary>
            <ul>
                {#each catalog.questions as question, idx}
                <li class="flex-row items-center gap-1">
                    <button type="button" class="btn btn-success btn-xs btn-square" on:click={() => addQuestion(question.id)}>
                        <Icon icon="mdi:add-bold"/>
                    </button>
                    <div class="flex-1"> {question.question} </div>
                </li>
                {/each}
            </ul>
        </details>
    </li>
    {/each}
</ul>