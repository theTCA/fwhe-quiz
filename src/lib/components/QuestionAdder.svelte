<script>
    import { catalogues as catalogData } from "$lib/data.json";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    let catalogues = catalogData.map((c) => ({ ...c, selected: [] }));

    /**
     * @param {number} id
     */
    function addQuestion(id) {
        dispatch("change", {
            id: id,
        });
    }

    /**
     * @param {number[]} ids
     */
    function addQuestions(ids) {
        for (let id of ids) addQuestion(id);
    }

    function submit() {
        addQuestions(
            catalogues.reduce((acc, c) => [...acc, ...c.selected], []),
        );
    }

    /**
     * @param {Event & {currentTarget: HTMLInputElement}} e
     * @param {import("$lib/types").Catalog & {selected: number[]}} catalog
     */
    function selectAllQuestions(e, catalog) {
        if (!catalog) return;
        let isChecked = false;
        if (e.currentTarget) {
            isChecked = e.currentTarget.checked;
        }
        if (isChecked) {
            catalog.selected = catalog.questions.map((q) => q.id);
        } else {
            catalog.selected = [];
        }
        catalogues = catalogues;
    }
</script>

<div class="flex flex-col gap-2">
    <div class="join join-vertical">
        {#each catalogues as catalog}
            <div class="join-item join border">
                <div class="join-item inline-flex justify-center pl-2 pt-4">
                    <input
                        class="checkbox checkbox-primary"
                        type="checkbox"
                        checked={catalog.selected.length === catalog.questions.length}
                        on:change={(e) => selectAllQuestions(e, catalog)}
                    />
                </div>
                <div class="join-item collapse collapse-arrow">
                    <input type="checkbox" />
                    <h3 class="collapse-title pl-2 font-semibold">
                        {catalog.name}
                    </h3>
                    <div class="collapse-content flex flex-col gap-2">
                        {#each catalog.questions as question}
                            <div>
                                <label class="flex flex-row items-center gap-2">
                                    <input
                                        class="checkbox checkbox-primary checkbox-sm"
                                        type="checkbox"
                                        value={question.id}
                                        bind:group={catalog.selected}
                                    />
                                    <span class="text-sm">
                                        {question.question}
                                    </span>
                                </label>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div class="flex justify-center mt-4">
        <button
            class="btn btn-success btn-block"
            type="submit"
            on:click={submit}
        >
            hinzufügen
        </button>
    </div>
</div>
