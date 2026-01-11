<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { meta } from '$lib/data.json';
	import { pages, pageGroups } from '$lib/pages';
	import { version, clearVersionDependentStores } from '$lib/stores';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Icon from '@iconify/svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	let { children } = $props();

	onMount(() => {
		versionCheck();
	});

	/**
	 * @type {HTMLInputElement}
	 */
	let drawer;

	function closeDrawer() {
		drawer.checked = false;
	}

	function versionCheck() {
		if ($version < meta.version) {
			clearVersionDependentStores();
			$version = meta.version;
		}
	}
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href={asset('/apple-touch-icon.png')} />
	<link rel="icon" type="image/png" sizes="32x32" href={asset('/favicon-32x32.png')} />
	<link rel="icon" type="image/png" sizes="16x16" href={asset('/favicon-16x16.png')} />
	<link rel="manifest" href={asset('/site.webmanifest')} />
	<link rel="mask-icon" href={asset('/safari-pinned-tab.svg')} color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<div class="drawer">
	<input id="drawer" type="checkbox" class="drawer-toggle" bind:this={drawer} />
	<div class="drawer-content flex flex-col">
		<nav class="navbar w-full bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<Icon class="h-7 w-7" icon="ci:hamburger-md" />
				</label>
			</div>
			<div class="mr-2 flex-none">
				<a class="btn text-lg font-semibold btn-ghost" href={resolve('/')}>
					<Icon icon="openmoji:fire-engine" />
					{PUBLIC_APP_NAME}
				</a>
			</div>
			<div class="hidden flex-1 lg:block">
				<ul class="menu menu-horizontal gap-2">
					{#each pages.filter((p) => p.inNavbar) as link ('menu' + link.name)}
						<li class="flex items-center">
							{#if page.url.pathname === link.href}
								<a class="btn btn-active btn-sm" href={resolve(link.href)}>
									<Icon icon={link.icon} />
									{link.name}
								</a>
							{:else}
								<a class="btn btn-sm" href={resolve(link.href)}>
									<Icon icon={link.icon} />
									{link.name}
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
			<div class="inline-flex flex-1 items-center justify-end gap-3 lg:flex-none">
				<ThemeSwitcher />
				<a href={resolve('/bookmarks')} class="btn btn-square">
					<Icon class="h-5 w-5" icon="material-symbols:bookmark" />
				</a>
			</div>
		</nav>
		<main class="mx-auto mt-2 w-full p-1 lg:w-[80%]">
			{@render children?.()}
		</main>
	</div>
	<div class="drawer-side">
		<label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu min-h-full w-80 gap-2 bg-base-200 p-4">
			<li class="text-lg font-semibold">
				<a href={resolve('/')} onclick={closeDrawer}>
					<Icon icon="openmoji:fire-engine" />
					{PUBLIC_APP_NAME}
				</a>
			</li>
			{#each pageGroups as group (group)}
				<li class="text-primary">
					{group.name}
				</li>
				{#each group.pages as link (link.href)}
					<li>
						{#if page.url.pathname === link.href}
							<a class="active bg-base-100" href={resolve(link.href)} onclick={closeDrawer}>
								<Icon icon={link.icon} />
								{link.name}
							</a>
						{:else}
							<a class="bg-base-100" href={resolve(link.href)} onclick={closeDrawer}>
								<Icon icon={link.icon} />
								{link.name}
							</a>
						{/if}
					</li>
				{/each}
			{/each}
		</ul>
	</div>
</div>
