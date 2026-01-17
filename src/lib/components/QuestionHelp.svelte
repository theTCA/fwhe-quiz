<script>
	/* eslint-disable svelte/no-navigation-without-resolve */
	import { UAParser } from 'ua-parser-js';
	import { helps } from '$lib/data.json';

	/** @type {{question: import('$lib/types').Question}} */
	let { question } = $props();

	const questionHelp = $derived(
		question.help.map((q) => ({
			...helps.find((/** @type {{ name: string; }} */ h) => h.name === q.name),
			page: q.page
		}))
	);

	function isSafari() {
		const uaParserResult = UAParser();
		return uaParserResult.browser.name && uaParserResult.browser.name.includes('Safari');
	}
</script>

{#if questionHelp}
	<div class="flex flex-col gap-2">
		{#each questionHelp as help, idx (idx)}
			<a
				class="btn flex h-full flex-col flex-nowrap items-center justify-center gap-0.5 text-sm"
				href={`${help.source}#page${isSafari() ? '' : '='}${help.page}`}
				target="_blank"
				rel="noreferrer noopener"
			>
				<h4 class="font-bold">{help.name}</h4>
				<div>
					<div>
						{help.description}
					</div>
					<div class="mt-0.5 text-xs">
						Seite {help.page}
					</div>
				</div>
			</a>
		{/each}
	</div>
{/if}
