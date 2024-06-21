<script>
    export let question;
    export let compactView = false;
</script>

<div class="text-base lg:text-lg">
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
                {question.mixer.mixingRate.toString().replace(".", ",")}%
            </span>
            Zumischung des Schaummittel in
            <span class="font-semibold">
                {question.time}
            </span>
            Minuten hergestellt werden?
        </div>
        {:else if question.type.id === "agentVolume"}
        <div class="text-center">
            Welche Menge Schaummittel wird für einen Zumischer
            <span class="font-semibold">
                {question.mixer.type}
            </span>
            mit einem Schaumstrahlrohr
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
                {question.mixer.mixingRate.toString().replace(".", ",")}%
            </span>
            Zumischung des Schaummittel in
            <span class="font-semibold">
                {question.time}
            </span>
            Minuten benötigt werden?
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
                {question.mixer.mixingRate.toString().replace(".", ",")}%
            </span>
            und ein Schaumstrahlrohr
            <span class="font-semibold">
                {question.nozzle.type}
            </span>
            eingesetzt wird?
        </div>
        {/if}
    {/if}
</div>
