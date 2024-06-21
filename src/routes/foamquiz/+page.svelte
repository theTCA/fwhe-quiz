<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { shuffle } from "$lib/helper";
    import FoamHelp from "$lib/components/FoamHelp.svelte";
    import FoamQuestion from "$lib/components/FoamQuestion.svelte";
    import Icon from "@iconify/svelte";

    const mixers = [
        {
            type: "Z2",
            flowRate: 200
        },
        {
            type: "Z4",
            flowRate: 400
        },
        {
            type: "Z8",
            flowRate: 800
        }
    ];

    const nozzles = [
        {
            type: "S2",
            flowRate: 200,
            foamRatio: 15
        },
        {
            type: "S4",
            flowRate: 400,
            foamRatio: 15
        },
        {
            type: "S8",
            flowRate: 800,
            foamRatio: 15
        },
        {
            type: "M2",
            flowRate: 200,
            foamRatio: 150
        },
        {
            type: "M4",
            flowRate: 400,
            foamRatio: 150
        },
        {
            type: "M8",
            flowRate: 800,
            foamRatio: 150
        }
    ];
    const mixingRates = [0.1, 0.5, 1, 2, 3, 4, 5, 6];

    const quizTypes = [
        {
            id: "foamVolume",
            name: "Schaumvolumen",
            calcFunc: calculateFoamVolume,
            answerUnit: "Liter Schaum"
        },
        {
            id: "agentVolume",
            name: "Schaummittelmenge",
            calcFunc: calculateAgentVolume,
            answerUnit: "Liter Schaummittel"
        },
        {
            id: "time",
            name: "Zeitberechnung",
            calcFunc: calculateTime,
            answerUnit: "Minuten"
        }
    ];

    let selectionCollapsed = true;
    let compactView = false;
    $: selectedTypes = [...quizTypes.map(t => t.id)];
    const questions = generateQuestions();
    $: filteredQuestions = questions.filter(q => selectedTypes.includes(q.type.id));
    $: question = filteredQuestions[0];

    let answer = "";
    let answered = false;

    function generateQuestions() {
        /**
         * @type {any[]}
         */
        let questions = [];
        const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for(let type of quizTypes) {
            for(let mixer of mixers) {
                for(let nozzle of nozzles) {
                    if(nozzle.flowRate !== mixer.flowRate) continue;
                    for(let time of times) {
                        for(let mixingRate of mixingRates) {
                            let question = {
                                type: type,
                                mixer: {
                                    ...mixer,
                                    mixingRate: mixingRate
                                },
                                nozzle: nozzle,
                                time: time,
                                agentAmount: 0,
                                answer: ""
                            };
                            if(type.id === "time") {
                                question.agentAmount = Number(calculateAgentVolume(question).toPrecision(2))
                            }
                            if(type.id === "foamVolume") {
                                question.mixer.mixingRate = shuffle(mixingRates)[0];
                            }
                            question.answer = Number(question.type.calcFunc(question).toPrecision(2)).toString();
                            questions = [...questions, question];
                            if(type.id === "foamVolume") {
                                break;
                            }
                        }
                    }
                }
            }
        }
        return shuffle(questions);
    }

    function answerQuestion() {
        answered = true;
    }

    function nextQuestion() {
        answer = "";
        answered = false;
        filteredQuestions = [...filteredQuestions.slice(1)];
    }

    /**
     * @param {{ mixer:{ mixingRate: number; flowRate: number }, nozzle: { flowRate: number; foamRatio: number; }; time: number; }} data
     */
    function calculateFoamVolume(data) {
        return data.nozzle?.flowRate * data?.nozzle?.foamRatio * data.time;
    }

    /**
     * @param {{ mixer:{ mixingRate: number; flowRate: number }, nozzle: { flowRate: number; foamRatio: number; }; time: number; }} data
     */
    function calculateAgentVolume(data) {
        return data.nozzle?.flowRate * (data.mixer?.mixingRate / 100) * data.time;
    }

    /**
     * @param {{ mixer:{ mixingRate: number; flowRate: number }, nozzle: { flowRate: number; foamRatio: number; }; time: number; agentAmount: number}} data
     */
    function calculateTime(data) {
        return data.agentAmount / (data.mixer.flowRate * (data.mixer?.mixingRate / 100));
    }
</script>

<svelte:head>
    <title> Schaumquiz - {PUBLIC_APP_NAME} </title>
</svelte:head>

<div>
    <div class="relative flex justify-between w-full mb-2">
        <h1 class="text-3xl flex-1 text-center font-semibold mb-2"> Schaumquiz </h1>
    </div>
    <div class="relative mb-4">
        <h2 class="text-center font-semibold text-2xl mb-1"> Quiztyp </h2>
        <label class="swap btn btn-sm absolute top-0 left-0">
            <input type="checkbox" bind:checked={selectionCollapsed}>
            <Icon class="swap-on" icon="bx:right-arrow"/>
            <Icon class="swap-off" icon="bx:up-arrow"/>
        </label>
        {#if !selectionCollapsed}
        <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-2">
            {#each quizTypes as type}
                <input class="btn" aria-label={type.name} type="checkbox" value={type.id} bind:group={selectedTypes}>
            {/each}
        </div>
        <div class="flex justify-end mt-2">
            <label class="swap btn">
                <input type="checkbox" bind:checked={compactView}>
                <Icon class="swap-on" icon="solar:text-bold"/>
                <Icon class="swap-off" icon="octicon:number-16"/>
            </label>
        </div>
        {:else}
            {#if question}
            <h2 class="text-center font-semibold text-lg"> {question.type.name} </h2>
            {/if}
        {/if}
    </div>
    {#if filteredQuestions.length > 0}
    <div class="flex flex-col justify-center gap-2">
        <FoamQuestion {question} {compactView}/>
        <form class="flex items-center flex-col gap-2 border-t-2 border-t-base-300 p-2">
            {#if !answered}
            <div class="flex-1 flex flex-col gap-2 w-full lg:w-1/2">
                <input class="input input-bordered text-center text-lg w-full lg:w-1/2 inline-flex self-center" type="text" bind:value={answer}>
                <span class="font-semibold text-center"> {question.type.answerUnit} </span>
            </div>
            {:else}
                {#if question.answer === answer}
                <div class="flex flex-col gap-2 w-full text-center text-success font-semibold">
                    <div class="flex justify-center items-center min-h-12">
                        <span class="text-lg"> {answer} </span>
                    </div>
                    <span> {question.type.answerUnit} </span>
                </div>
                {:else}
                <div class="flex flex-col gap-2 w-full text-center text-error font-semibold">
                    <div class="flex justify-center items-center min-h-12">
                        <span class="text-lg"> {answer} </span>
                    </div>
                    <span> {question.type.answerUnit} </span>
                </div>
                {/if}
            {/if}
            <div class="flex justify-center w-full lg:w-1/2 mt-3">
                <button class="btn btn-primary btn-outline w-full" type="submit" on:click|preventDefault={() => answered ? nextQuestion() : answerQuestion()}>
                    {#if !answered}
                    Wählen
                    {:else}
                    Weiter
                    {/if}
                </button>
            </div>
        </form>
        {#if answered}
        <FoamHelp {question}/>
        {/if}
    </div>
    {:else}
    <div class="text-center font-semibold text-lg">
        Kein Fragetyp ausgewählt!
    </div>
    {/if}
</div>