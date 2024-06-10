<script>
    import { PUBLIC_APP_NAME } from "$env/static/public";

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

    let data = {
        mixer: {
            ...mixers[1],
            mixingRate: 3,
        },
        nozzle: nozzles[4],
        time: 5
    }

    let answer = 0;

    function calculateFoamVolume() {
        return data.nozzle?.flowRate * data?.nozzle?.foamRatio * data.time;
    }

    function calculateAgentVolume() {
        return data.nozzle?.flowRate * (data.mixer?.mixingRate / 100) * data.time;
    }
</script>

<svelte:head>
    <title>Schaum - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
    <div class="relative flex justify-between w-full mb-2">
        <h1 class="text-3xl flex-1 text-center font-semibold mb-2"> Schaum </h1>
    </div>
    <div class="flex flex-col justify-center gap-2">
        <h2 clasS="text-2xl flex-1 text-center font-semibold mb-2"> Schaumvolumen </h2>
        <div>
            Welche Menge Schaum kann mit einem Zumischer mit der Typenbezeichnung
            <span class="font-semibold">
                {data.mixer.type}
            </span>
            und mit einem Schaumstrahlrohr mit der Typenbezeichnung
            <span class="font-semibold">
                {data.nozzle.type}
            </span>
            bei einer
            <span class="font-semibold">
                {data.mixer.mixingRate}%
            </span>
            Zumischung des Schaummittel in
            <span class="font-semibold">
                {data.time}
            </span>
            Minuten hergestellt werden (Verschäumungszahl
            <span class="font-semibold">
                {data.nozzle.foamRatio}
            </span>
            )?
        </div>
        {calculateFoamVolume()}
        <div class="flex-1 text-center">
            <input class="input input-bordered" type="number" bind:value={answer}>
            <span class="font-semibold"> Liter </span>
        </div>
    </div>
    <div class="flex flex-col justify-center gap-2">
        <h2 clasS="text-2xl flex-1 text-center font-semibold mb-2"> Schaummittelmenge </h2>
        <div>
            Welche Menge Schaum kann mit einem Zumischer mit der Typenbezeichnung
            <span class="font-semibold">
                {data.mixer.type}
            </span>
            und mit einem Schaumstrahlrohr mit der Typenbezeichnung
            <span class="font-semibold">
                {data.nozzle.type}
            </span>
            bei einer
            <span class="font-semibold">
                {data.mixer.mixingRate}%
            </span>
            Zumischung des Schaummittel in
            <span class="font-semibold">
                {data.time}
            </span>
            Minuten hergestellt werden (Verschäumungszahl
            <span class="font-semibold">
                {data.nozzle.foamRatio}
            </span>
            )?
        </div>
        {calculateAgentVolume()}
        <div class="flex-1 text-center">
            <input class="input input-bordered" type="number" bind:value={answer}>
            <span class="font-semibold"> Liter </span>
        </div>
    </div>
    <div>
        <button class="btn btn-primary" type="button">
            Wählen
        </button>
    </div>
</div>