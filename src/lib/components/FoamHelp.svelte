<script>
    export let question;
</script>

<div class="flex justify-center">
    {#if question.type.id === "foamVolume"}
        <math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>Schaumvolumen</mtext><mo>=</mo><mi>{question.nozzle.flowRate}</mi><mfrac><mtext>l</mtext><mtext>min</mtext></mfrac><mo>&#xd7;</mo><mi>{question.nozzle.foamRatio}</mi><mo>&#xd7;</mo><mi>{question.time}</mi><mtext>min</mtext><mo>=</mo><mi>{question.answer}</mi><mtext>l</mtext></math>
    {:else if question.type.id === "agentVolume"}
        <math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>Schaummittelmenge</mtext><mo>=</mo><mi>{question.mixer.flowRate}</mi><mfrac><mtext>l</mtext><mtext>min</mtext></mfrac><mo>&#xd7;</mo><mi>{question.mixer.mixingRate}</mi><mo>%</mo><mo>&#xd7;</mo><mi>{question.time}</mi><mtext>min</mtext><mo>=</mo><mi>{question.answer}</mi><mtext>l</mtext></math>
    {:else if question.type.id === "time"}
        <math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>Zeit</mtext><mo>=</mo><mfrac><mrow><mi>{question.agentAmount}</mi><mtext>l</mtext></mrow><mrow><mi>{question.mixer.flowRate}</mi><mfrac><mtext>l</mtext><mtext>min</mtext></mfrac><mo>&#xd7;</mo><mi>{question.mixer.mixingRate}</mi><mtext>%</mtext></mrow></mfrac><mo>=</mo><mi>{question.answer}</mi><mtext>min</mtext></math>
    {/if}
</div>