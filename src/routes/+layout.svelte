<script>
    import "../app.css";
    import {base} from "$app/paths";
    import {page} from "$app/stores";
    import Icon from "@iconify/svelte";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import { PUBLIC_APP_NAME } from "$env/static/public";

    const links = [
        {
            name: "Training",
            href: "/training"
        },
        {
            name: "Quiz",
            href: "/quiz"
        },
        {
            name: "ADR Quiz",
            href: "/adrquiz"
        },
        {
            name: "PDF-Quiz",
            href: "/pdfquiz"
        }
    ].map(l => ({...l, href: base + l.href}));
    /**
     * @type {HTMLInputElement}
     */
    let drawer;

    function closeDrawer() {
        drawer.checked = false;
    }
</script>

<div class="drawer">
    <input id="drawer" type="checkbox" class="drawer-toggle" bind:this={drawer}>
    <div class="drawer-content flex flex-col">
        <nav class="w-full navbar bg-base-300">
            <div class="flex-none lg:hidden">
                <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div class="flex-none px-2 mx-2">
                <a class="btn btn-ghost text-lg font-semibold" href={base + "/"}>
                    {PUBLIC_APP_NAME}
                </a>
            </div>
            <div class="flex-1 hidden lg:block">
                <ul class="menu menu-horizontal gap-2">
                    {#each links as link}
                    <li class="flex items-center">
                        {#if $page.url.pathname === link.href}
                        <a class="btn btn-sm btn-active" href={link.href}>{link.name}</a>
                        {:else}
                        <a class="btn btn-sm" href={link.href}>{link.name}</a>
                        {/if}
                    </li>
                    {/each}
                </ul>
            </div>
            <div class="flex-1 gap-3 justify-end">
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
                {PUBLIC_APP_NAME}
            </li>
            {#each links as link}
            <li>
                {#if $page.url.pathname === link.href}
                <a class="bg-base-100 active" href={link.href} on:click={closeDrawer}>{link.name}</a>
                {:else}
                <a class="bg-base-100" href={link.href} on:click={closeDrawer}>{link.name}</a>
                {/if}
            </li>
            {/each}
        </ul>
    </div>
</div>