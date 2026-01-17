<script>
	import { helpsExtended } from '$lib/adr.json';
	import * as parser from '$lib/adrparser';
	import Icon from '@iconify/svelte';
	let { question } = $props();

	let primaryDanger = $derived(question.number.replace('X', '').charAt(0));
	let deconstructedDanger = $derived(Object.assign({}, ...parser.parse(question.number)));

	let step = $state(0);
	const steps = 3;

	function prevStep() {
		if (step - 1 >= 0) step -= 1;
	}

	function nextStep() {
		if (step + 1 < steps) step += 1;
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-col justify-center">
		<div class="grid grid-cols-3 place-items-center">
			<button class="btn btn-square" type="button" onclick={prevStep}>
				<Icon class="size-4" icon="bxs:left-arrow" />
			</button>
			<ul class="steps">
				{#each Array.from(Array(steps)) as _, idx (idx)}
					{#if idx === step}
						<li class="step step-primary"></li>
					{:else}
						<li class="step"></li>
					{/if}
				{/each}
			</ul>
			<button class="btn btn-square" type="button" onclick={nextStep}>
				<Icon class="size-4" icon="bxs:right-arrow" />
			</button>
		</div>
		{#if step == 0}
			<div class="flex flex-col items-center gap-4">
				<h3 class="font-semibold">Gefahrnummer feststellen</h3>
				<div
					class="relative mx-auto flex w-24 flex-col border-4 border-black bg-orange-500 text-center text-lg font-bold text-black"
				>
					<span class="border-b-2 border-black"> {question.number} </span>
					<span class="absolute -top-7 -left-14">
						<Icon class="size-20 text-accent" icon="foundation:arrow-right" />
					</span>
					<span class="border-t-2 border-black"> {question.example} </span>
				</div>
				<div class="max-w-3xl bg-base-200 p-2 text-sm/7 shadow-md">
					Die Gefahrnummer ist die <span class="font-semibold">obere Nummer</span> auf den auf allen
					Gefahrguttransporten angebrachten orangefarbigen Warntafeln (Gefahrentafeln) und
					beschreibt die Gefahr, die von dem Transportgut ausgeht. Die untere Nummer wird UN-Nummer
					(Stoffnummer) genannt.
					<span class="text-xs font-light">
						Quelle:
						<a
							class="link link-info"
							href="https://de.wikipedia.org/wiki/Nummer_zur_Kennzeichnung_der_Gefahr"
							target="_blank"
							rel="noopener noreferrer">Wikipedia</a
						>
					</span>
				</div>
				<button class="btn btn-wide btn-soft btn-primary" type="button" onclick={nextStep}>
					Nächste
				</button>
			</div>
		{:else if step == 1}
			<div class="flex flex-col items-center gap-4">
				<h3 class="font-semibold">Hauptgefahr bewerten</h3>
				<div class="flex flex-col items-center gap-2">
					<div
						class="flex w-24 flex-col justify-center border-4 border-black bg-orange-500 text-center text-lg font-bold text-black"
					>
						<div class="flex justify-center border-b-2 border-black">
							{#if deconstructedDanger.extra}
								<span class="">X</span>
							{/if}
							<div class="flex outline-4 outline-accent">
								{#if deconstructedDanger.primary.double}
									<span>{deconstructedDanger.primary.val}</span>
								{/if}
								<span>{deconstructedDanger.primary.val}</span>
							</div>
							{#each deconstructedDanger.secondary as secondary (secondary)}
								<span class="">{secondary}</span>
							{/each}
						</div>
						<span class="border-t-2 border-black"> {question.example} </span>
					</div>
					<div>
						<span class="font-bold">{deconstructedDanger.primary.val}</span>
						{helpsExtended.primary.find((h) => h.number === primaryDanger)?.description}
					</div>
				</div>
				<div class="max-w-3xl bg-base-200 p-2 text-sm/7 shadow-md">
					Die <span class="font-semibold">erste Ziffer</span> bezeichnet dabei die Hauptgefahr.
					{#if deconstructedDanger.primary.double}
						Wird sie <span class="font-semibold"> wiederholt,</span> wird dadurch eine
						<span class="font-semibold"> Zunahme der Hauptgefahr </span> ausgedrückt.
					{:else}
						Wird sie wiederholt, wird dadurch eine Zunahme der Hauptgefahr ausgedrückt.
					{/if}
					<span class="text-xs font-light">
						Quelle:
						<a
							class="link link-info"
							href="https://de.wikipedia.org/wiki/Nummer_zur_Kennzeichnung_der_Gefahr#Aufbau_der_Gefahrnummer"
							target="_blank"
							rel="noopener noreferrer">Wikipedia</a
						>
					</span>
				</div>
				{#if steps > 1}
					<button class="btn btn-wide btn-soft btn-primary" type="button" onclick={nextStep}
						>Nächste</button
					>
				{/if}
			</div>
		{:else if step === 2}
			<div class="flex flex-col items-center gap-4">
				<h3 class="font-semibold">Nebengefahr bewerten</h3>
				<div class="flex flex-col items-center gap-2">
					<div
						class="flex w-24 flex-col justify-center border-4 border-black bg-orange-500 text-center text-lg font-bold text-black"
					>
						<div class="flex justify-center border-b-2 border-black">
							{#if deconstructedDanger.extra}
								<span class="outline-4 outline-accent">X</span>
							{/if}
							{#if deconstructedDanger.primary.double}
								<span class="">{deconstructedDanger.primary.val}</span>
							{/if}
							<span class="">{deconstructedDanger.primary.val}</span>
							{#if deconstructedDanger.secondary}
								<div class="outline-4 outline-accent">
									{#each deconstructedDanger.secondary as secondary (secondary)}
										<span>{secondary}</span>
									{/each}
								</div>
							{/if}
						</div>
						<span class="border-t-2 border-black"> {question.example} </span>
					</div>
					<div>
						{#if deconstructedDanger.extra}
							<div>
								<span class="font-bold">X</span>
								{helpsExtended.primary.find((h) => h.number === 'X')?.description}
							</div>
						{/if}
						{#if deconstructedDanger.secondary}
							{#each deconstructedDanger.secondary as secondary (secondary)}
								<div>
									<span class="font-bold">{secondary}</span>
									{helpsExtended.secondary.find((h) => h.number === secondary)?.description}
								</div>
							{/each}
						{:else}
							<div>keine Nebengefahren</div>
						{/if}
					</div>
				</div>
				<div class="max-w-3xl bg-base-200 p-2 text-sm/7 shadow-md">
					Eine Nebengefahr wird durch eine weitere Ziffer bezeichnet. Ein eventuell
					<span class=""> vorangestelltes X </span>
					sagt aus, dass es auf
					<span> gefährliche Weise mit Wasser reagiert.</span>
					<span class="text-xs font-light">
						Quelle:
						<a
							class="link link-info"
							href="https://de.wikipedia.org/wiki/Nummer_zur_Kennzeichnung_der_Gefahr#Aufbau_der_Gefahrnummer"
							target="_blank"
							rel="noopener noreferrer">Wikipedia</a
						>
					</span>
				</div>
			</div>
		{/if}
	</div>
</div>
