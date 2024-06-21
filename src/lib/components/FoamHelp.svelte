<script>
    import { base } from "$app/paths";
    import { alignStar } from "mathlifier";

    export let question;
</script>

<svelte:head>
    <link rel="stylesheet" href={base + "/katex.min.css"}>
</svelte:head>

<div>
    {#if question.type.id === "foamVolume"}
    {@html alignStar(`
        \\text{Schaumvolumen} &= \\text{Durchflussrate} \\times \\text{Verschäumungszahl} \\times \\text{Zeit} \\\\
                              &= ${question.nozzle.flowRate} \\frac{\\text{l}}{\\text{min}} \\times ${question.nozzle.foamRatio} \\times ${question.time} \\text{min} \\\\
                              &= ${question.answer} \\text{l}
    `)}
    {:else if question.type.id === "agentVolume"}
    {@html alignStar(`
        \\text{Schaummittelmenge} &= \\text{Durchflussrate} \\times \\text{Zumischrate} \\times \\text{Zeit} \\\\
                                  &= ${question.mixer.flowRate} \\frac{\\text{l}}{\\text{min}} \\times ${question.mixer.mixingRate}\\% \\times ${question.time} \\text{min} \\\\
                                  &= ${question.answer} \\text{l}
    `)}
    {:else if question.type.id === "time"}
    {@html alignStar(`
        \\text{Zeit} &= \\frac{\\text{Schaummittelmenge}}{\\text{Durchflussrate} \\times \\text{Zumischrate}} \\\\
                     &= \\frac{${question.agentAmount}\\text{l}}{${question.mixer.flowRate} \\frac{\\text{l}}{\\text{min}}  \\times ${question.mixer.mixingRate}\\%} \\\\
                     &= \\frac{${question.agentAmount}\\text{l}}{${question.mixer.flowRate * (question.mixer.mixingRate / 100)} \\frac{\\text{l}}{\\text{min}}} \\\\
                     &= ${question.answer} \\text{min}
    `)}
    {/if}
</div>