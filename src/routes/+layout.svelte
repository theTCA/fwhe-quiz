<script>
    import "../app.css";
    import { onMount } from "svelte";
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { meta } from "$lib/data.json";
    import { pages, pageGroups } from "$lib/pages";
    import { version, clearVersionDependentStores } from "$lib/stores";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import Icon from "@iconify/svelte";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";

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
        if($version < meta.version) {
            clearVersionDependentStores();
            $version = meta.version;
        }
    }
</script>

<svelte:head>
    <link rel="apple-touch-icon" sizes="180x180" href={ base + "/apple-touch-icon.png"}>
    <link rel="icon" type="image/png" sizes="32x32" href={base + "/favicon-32x32.png"}>
    <link rel="icon" type="image/png" sizes="16x16" href={base + "/favicon-16x16.png"}>
    <link rel="manifest" href={base + "/site.webmanifest"}>
    <link rel="mask-icon" href={base + "/safari-pinned-tab.svg"} color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
</svelte:head>

<div class="drawer">
    <input id="drawer" type="checkbox" class="drawer-toggle" bind:this={drawer}>
    <div class="drawer-content flex flex-col">
        <nav class="w-full navbar bg-base-300">
            <div class="flex-none lg:hidden">
                <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                    <Icon class="w-7 h-7" icon="ci:hamburger-md"/>
                </label>
            </div>
            <div class="flex-none mr-2">
                <a class="btn btn-ghost text-lg font-semibold" href={base + "/"}>
                    <Icon icon="openmoji:fire-engine"/>
                    {PUBLIC_APP_NAME}
                </a>
            </div>
            <div class="flex-1 hidden lg:block">
                <ul class="menu menu-horizontal gap-2">
                    {#each pages.filter(p => p.inNavbar) as link}
                    <li class="flex items-center">
                        {#if page.url.pathname === link.href}
                        <a class="btn btn-sm btn-active" href={link.href}>
                            <Icon icon={link.icon}/>
                            {link.name}
                        </a>
                        {:else}
                        <a class="btn btn-sm" href={link.href}>
                            <Icon icon={link.icon}/>
                            {link.name}
                        </a>
                        {/if}
                    </li>
                    {/each}
                </ul>
            </div>
            <div class="flex-1 lg:flex-none gap-3 justify-end">
                <ThemeSwitcher/>
                <a href={base + "/bookmarks"} class="btn btn-square">
                    <Icon class="h-5 w-5" icon="material-symbols:bookmark"/>
                </a>
            </div>
        </nav>
        <main class="w-full lg:w-[80%] mx-auto p-1 mt-2">
            <slot/>
        </main>
    </div>
    <div class="drawer-side">
        <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full gap-2 bg-base-200">
            <li class="text-lg font-semibold">
                <a href={`${base}/`} on:click={closeDrawer}>
                    <Icon icon="openmoji:fire-engine"/>
                    {PUBLIC_APP_NAME}
                </a>
            </li>
            {#each pageGroups as group}
            <li class="text-primary">
                {group.name}
            </li>
            {#each group.pages as link}
            <li>
                {#if page.url.pathname === link.href}
                <a class="bg-base-100 active" href={link.href} on:click={closeDrawer}>
                    <Icon icon={link.icon}/>
                    {link.name}
                </a>
                {:else}
                <a class="bg-base-100" href={link.href} on:click={closeDrawer}>
                    <Icon icon={link.icon}/>
                    {link.name}
                </a>
                {/if}
            </li>
            {/each}
            {/each}
        </ul>
    </div>
</div>