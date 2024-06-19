<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { shuffle } from "$lib/helper";

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

    /**
     * @type {string[]}
     */
    let selectedTypes = [];
    let selectedAll = false;
    let compactView = true;

    let questions = generateQuestions();
    /*
    let question = {
        mixer: {
            ...mixers[1],
            mixingRate: 1,
        },
        nozzle: nozzles[4],
        time: 5,
        type: quizTypes[0],
        answer: 0,
        agentAmount: 40
    };
    */
    $: question = questions[0];

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
                            question.answer = Number(question.type.calcFunc(question).toPrecision(2)).toString().replace(".", ",");
                            questions = [...questions, question];
                            if(type.id === "foamVolume") {
                                break;
                            }
                        }
                    }
                }
            }
        }
        console.log(questions);
        return shuffle(questions);
    }

    function answerQuestion() {
        answered = true;
    }

    function nextQuestion() {
        answer = "";
        answered = false;
        questions = [...questions.slice(1)];
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
    <!--
        <div class="flex flex-col gap-2">
            <h2 class="text-lg font-semibold text-center"> Fragetypen </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {#each quizTypes as type}
                <label class="flex items-center gap-2 p-2 bg-base-200 rounded-md cursor-pointer select-none">
                    <input class="checkbox checkbox-primary rounded-full bg-base-100" type="checkbox" value={type.id} checked={selectedTypes.includes(type.id)} bind:group={selectedTypes}>
                    {type.name}
                </label>
                {/each}
            </div>
            <div class="flex justify-center">
                <button class="btn btn-primary" on:click={() => {}}> Wählen </button>
            </div>
        </div>
        -->
    <div class="flex flex-col justify-center gap-2">
        <h2 class="text-2xl flex-1 text-center font-semibold mb-2"> {question.type.name} </h2>
        <input type="checkbox" bind:checked={compactView}>
        {#if compactView}
        <div class="text-center grid grid-cols-1 lg:grid-cols-3">
            <div>
                <h4 class="font-semibold"> Schaumstrahlrohr </h4>
                <div class="flex justify-center gap-2">
                    <span>{question.nozzle.type}</span>
                    <span>{question.nozzle.foamRatio} VZ</span>
                </div>
            </div>
            <div>
                <h4 class="font-semibold"> Zumischer </h4>
                <div class="flex justify-center gap-2">
                    <span>{question.mixer.type}</span>
                    <span>{question.mixer.mixingRate.toString().replace(".", ",")}% Zumischung</span>
                </div>
            </div>
            {#if question.type.id !== "time"}
            <div>
                <h4 class="font-semibold"> Zeit </h4>
                <div>
                    <span>{question.time} Minuten </span>
                </div>
            </div>
            {:else}
            <div>
                <h4 class="font-semibold"> Schaummittel </h4>
                <div>
                    <span>{question.agentAmount} Liter </span>
                </div>
            </div>
            {/if}
        </div>
        {:else}
            {#if question.type.id === "foamVolume"}
            <div class="text-center">
                Welche Menge Schaum kann mit einem Zumischer
                <span class="font-semibold">
                    {question.mixer.type}
                </span>
                und mit einem Schaumstrahlrohr
                <span class="font-semibold">
                    {question.nozzle.type}
                </span>
                (Verschäumungszahl
                <span class="font-semibold">
                    {question.nozzle.foamRatio}
                </span>
                ) bei einer
                <span class="font-semibold">
                    {question.mixer.mixingRate}%
                </span>
                Zumischung des Schaummittel in
                <span class="font-semibold">
                    {question.time}
                </span>
                Minuten hergestellt werden?
            </div>
            {:else if question.type.id === "agentVolume"}
            <div class="text-center">
                Welche Menge Schaummittel wird für einem Zumischer
                <span class="font-semibold">
                    {question.mixer.type}
                </span>
                und mit einem Schaumstrahlrohr
                <span class="font-semibold">
                    {question.nozzle.type}
                </span>
                (Verschäumungszahl
                <span class="font-semibold">
                    {question.nozzle.foamRatio}
                </span>
                )
                bei einer
                <span class="font-semibold">
                    {question.mixer.mixingRate}%
                </span>
                Zumischung des Schaummittel in
                <span class="font-semibold">
                    {question.time}
                </span>
                Minuten hergestellt werden?
            </div>
            {:else if question.type.id === "time"}
            <div class="text-center">
                Nach welcher Zeit sind beim Schaumeinsatz
                <span class="font-semibold">
                    {question.agentAmount} l
                </span>
                Schaummittel zugemischt, wenn ein Zumischer
                <span class="font-semibold">
                    {question.mixer.type}
                </span>
                mit einer Zumischrate von
                <span class="font-semibold">
                    {question.mixer.mixingRate}%
                </span>
                und ein Schaumstrahlrohr
                <span class="font-semibold">
                    {question.nozzle.type}
                </span>
                eingesetzt wird?
            </div>
            {/if}
        {/if}
        <form class="flex flex-col gap-2">
            {#if !answered}
            <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
                <input class="input input-bordered text-center lg:text-right pr-1" type="text" bind:value={answer}>
                <span class="font-semibold text-center lg:text-left"> {question.type.answerUnit} </span>
            </div>
            <div class="flex justify-center">
                <button class="btn btn-primary btn-outline w-full md:w-1/2" type="submit" on:click|preventDefault={answerQuestion}> Wählen </button>
            </div>
            {:else}
            <div class="py-3">
                {#if question.answer === answer}
                <div class=" grid grid-cols-2 gap-2 text-center text-success">
                    <span class="text-right pr-1"> {answer} </span>
                    <span class="font-semibold text-left"> {question.type.answerUnit} </span>
                </div>
                {:else}
                <div class=" grid grid-cols-2 gap-2 text-center text-error">
                    <span class="text-right pr-1"> {answer} </span>
                    <span class="font-semibold text-left"> {question.type.answerUnit} </span>
                </div>
                {/if}
            </div>
            <div class="flex justify-center">
                <button class="btn btn-primary w-full md:w-1/2" type="submit" on:click|preventDefault={nextQuestion}> Weiter </button>
            </div>
            {/if}
        </form>
        <div class="flex justify-center">
        {#if answered}
            {#if question.type.id === "foamVolume"}
                <math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>Schaumvolumen</mtext><mo>=</mo><mi>{question.nozzle.flowRate}</mi><mfrac><mtext>l</mtext><mtext>min</mtext></mfrac><mo>&#xd7;</mo><mi>{question.nozzle.foamRatio}</mi><mo>&#xd7;</mo><mi>{question.time}</mi><mtext>min</mtext><mo>=</mo><mi>{question.answer}</mi><mtext>l</mtext></math>
            {:else if question.type.id === "agentVolume"}
                <math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>Schaummittelmenge</mtext><mo>=</mo><mi>{question.mixer.flowRate}</mi><mfrac><mtext>l</mtext><mtext>min</mtext></mfrac><mo>&#xd7;</mo><mi>{question.mixer.mixingRate}</mi><mo>%</mo><mo>&#xd7;</mo><mi>{question.time}</mi><mtext>min</mtext><mo>=</mo><mi>{question.answer}</mi><mtext>l</mtext></math>
            {:else if question.type.id === "time"}
                <math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>Zeit</mtext><mo>=</mo><mfrac><mrow><mi>{question.agentAmount}</mi><mtext>l</mtext></mrow><mrow><mi>{question.mixer.flowRate}</mi><mfrac><mtext>l</mtext><mtext>min</mtext></mfrac><mo>&#xd7;</mo><mi>{question.mixer.mixingRate}</mi><mtext>%</mtext></mrow></mfrac><mo>=</mo><mi>{question.answer}</mi><mtext>min</mtext></math>
            {/if}
        {/if}
        </div>
    </div>
</div>