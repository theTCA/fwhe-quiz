<script>
    export let question;
</script>

<div class="flex flex-col items-center justify-center gap-3 mb-5">
    <h3 class="font-semibold text-lg text-center"> Berechnung </h3>
    {#if question.type.id === "foamVolume"}
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mtext> Schaumvolumen </mtext>
            <mo> = </mo>
            <mtext> Durchflussrate </mtext>
            <mo> &times; </mo>
            <mtext> Verschäumungszahl </mtext>
            <mo> &times; </mo>
            <mtext> Zeit </mtext>
        </math>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mo> = </mo>
            <mn> {question.nozzle.flowRate} </mn>
            <mfrac>
                <mrow>
                    <mtext> l </mtext>
                </mrow>
                <mrow>
                    <mtext> min </mtext>
                </mrow>
            </mfrac>
            <mo> &times; </mo>
            <mn> {question.nozzle.foamRatio} </mn>
            <mo> &times; </mo>
            <mn> {question.time} </mn>
            <mtext> min </mtext>
        </math>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mo> = </mo>
            <mn> {question.answer} </mn>
            <mtext> l </mtext>
        </math>
    {:else if question.type.id === "agentVolume"}
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mtext> Schaummittelmenge </mtext>
            <mo> = </mo>
            <mtext> Durchflussrate </mtext>
            <mo> &times; </mo>
            <mtext> Zumischrate</mtext>
            <mo> &times; </mo>
            <mtext> Zeit </mtext>
        </math>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mo> = </mo>
            <mn> {question.mixer.flowRate} </mn>
            <mfrac>
                <mrow>
                    <mtext> l </mtext>
                </mrow>
                <mrow>
                    <mtext> min </mtext>
                </mrow>
            </mfrac>
            <mo> &times; </mo>
            <mn> {question.mixer.mixingRate} </mn>
            <mo> % </mo>
            <mo> &times; </mo>
            <mn> {question.time} </mn>
            <mtext> min </mtext>
        </math>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mo> = </mo>
            <mn> {question.answer} </mn>
            <mtext> l </mtext>
        </math>
    {:else if question.type.id === "time"}
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mtext> Zeit </mtext>
            <mo> = </mo>
            <mfrac>
                <mrow>
                    <mtext> Schaummittelmenge </mtext>
                </mrow>
                <mrow>
                    <mtext> Durchflussrate </mtext>
                    <mo> &times; </mo>
                    <mtext> Zumischrate </mtext>
                </mrow>
            </mfrac>
        </math>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mo> = </mo>
            <mfrac>
                <mrow>
                    <mn> {question.agentAmount} </mn>
                    <mtext> l </mtext>
                </mrow>
                <mrow>
                    <mn> {question.mixer.flowRate} </mn>
                    <mfrac>
                        <mrow>
                            <mtext> l </mtext>
                        </mrow>
                        <mrow>
                            <mtext> min </mtext>
                        </mrow>
                    </mfrac>
                    <mo> &times; </mo>
                    <mn> {question.mixer.mixingRate} </mn>
                    <mtext> % </mtext>
                </mrow>
            </mfrac>
        </math>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mo> = </mo>
            <mn> {question.answer} </mn>
            <mtext> min </mtext>
        </math>
    {/if}
</div>