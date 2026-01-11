<script>
	import { resolve } from '$app/paths';
	import { Math } from 'svelte-math';

	let { question } = $props();
	let foamVolume =
		$derived(`\\begin{align}\\text{Schaumvolumen} &= \\text{Durchflussrate} \\times \\text{Zeit} \\times \\text{Verschäumungszahl} \\\\
                              &= ${question.nozzle.flowRate} \\frac{\\text{l}}{\\text{min}} \\times ${question.time} \\text{min} \\times ${question.nozzle.foamRatio} \\\\
                              &= ${question.nozzle.flowRate * question.time} \\text{l} \\times ${question.nozzle.foamRatio} \\\\
                              &= ${question.answer} \\text{l}\\end{align}`);

	let agentVolume =
		$derived(`\\begin{align}\\text{Schaummittelmenge} &= \\text{Durchflussrate} \\times \\text{Zeit} \\times \\text{Zumischrate} \\\\
                                  &= ${question.mixer.flowRate} \\frac{\\text{l}}{\\text{min}} \\times ${question.time} \\text{min} \\times ${question.mixer.mixingRate}\\% \\\\
                                  &= ${question.mixer.flowRate * question.time} \\text{l} \\times ${question.mixer.mixingRate}\\% \\\\
                                  &= ${question.answer} \\text{l}\\end{align}`);

	let time =
		$derived(`\\begin{align}\\text{Zeit} &= \\frac{\\text{Schaummittelmenge}}{\\text{Durchflussrate} \\times \\text{Zumischrate}} \\\\
                     &= \\frac{${question.agentAmount}\\text{l}}{${question.mixer.flowRate} \\frac{\\text{l}}{\\text{min}}  \\times ${question.mixer.mixingRate}\\%} \\\\
                     &= \\frac{${question.agentAmount}\\text{l}}{${question.mixer.flowRate * (question.mixer.mixingRate / 100)} \\frac{\\text{l}}{\\text{min}}} \\\\
                     &= ${question.answer} \\text{min}\\end{align}`);
</script>

<svelte:head>
	<link rel="stylesheet" href={resolve('/') + 'Temml-Local.css'} />
</svelte:head>

<div class="flex flex-col gap-4 overflow-x-scroll rounded-md bg-base-300 text-xs lg:text-base">
	<h2 class="text-center font-semibold">Berechnung</h2>
	{#if question.type.id === 'foamVolume'}
		<Math displayMode latex={foamVolume} />
	{:else if question.type.id === 'agentVolume'}
		<Math displayMode latex={agentVolume} />
	{:else if question.type.id === 'time'}
		<Math displayMode latex={time} />
	{/if}
</div>
