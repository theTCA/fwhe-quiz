<script>
	import { storageAvailable } from '$lib/helper';
	import { pageGroups } from '$lib/pages';
	import { meta } from '$lib/data.json';
	import Icon from '@iconify/svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<h1 class="text-center text-3xl font-semibold">
		{PUBLIC_APP_NAME}
	</h1>
	<div class="mt-4 rounded-md bg-base-200 p-4 text-center text-lg">
		<div class="font-semibold">Quiz zum Vorbereiten auf die hessische Feuerwehrleistungsübung.</div>
		<div class="divider"></div>
		Die Fragen stammen aus dem Fragenkatalog der
		<a class="link link-primary" href="https://hlfs.hessen.de/hessische-feuerwehrleistungsuebung"
			>hessischen Landesfeuerwehrschule</a
		>.
		<div class="text-sm">
			Stand: {meta.date}
		</div>
		<div class="divider"></div>
		<div class="text-sm">
			Diese Webseite verwendet statische Seiten und benutzt, wenn möglich, den <a
				class="link link-primary"
				href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">LocalStorage</a
			>
			des
			<span class="inline-flex items-center gap-2">
				Browsers.
				{#if typeof window !== 'undefined' && storageAvailable('localStorage')}
					<Icon class="text-success" icon="material-symbols:check-circle" />
				{:else}
					<Icon class="text-error" icon="material-symbols:error" />
				{/if}
			</span>
		</div>
		<div class="text-sm">
			Die Konsequenz ist, dass alle Ergebnisse nur im Browser gespeichert werden.
		</div>
	</div>
	{#each pageGroups as group (group.name)}
		<div class="flex flex-col gap-2">
			<div class="divider mb-0 text-lg font-bold text-primary">{group.name}</div>
			<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				{#each group.pages as card (card.href)}
					<a href={resolve(card.href)} class="btn h-fit p-2">
						<div class="flex flex-col items-center justify-center">
							<div class="rounded-full bg-base-100 text-primary">
								<Icon class="h-16 w-16 p-2" icon={card.icon} />
							</div>
							<h2 class="text-xl text-primary">{card.name}</h2>
							<p class="wrap-break-word">{card.desc}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>
<footer class="mt-16">
	<div class="flex w-full justify-center">
		<a class="btn btn-ghost btn-sm" href="https://github.com/theTCA">
			<Icon icon="mdi:github" />
			theTCA
		</a>
	</div>
</footer>
