<script>
    import Icon from "@iconify/svelte";
    import {onMount} from "svelte";
    import {themeChange} from "theme-change";
    import {theme} from "$lib/stores";

    onMount(() => {
        themeChange(false);
    });

    function onChange() {
        if($theme === "light")
            $theme = "dark"
        else
            $theme = "light"
    }
</script>

<div>
    <label class="swap btn">
        <input type="checkbox" on:change={onChange} checked={$theme === "light"}>
        <Icon class="swap-off" icon="ph:sun-bold"/>
        <Icon class="swap-on" icon="ph:moon-bold"/>
    </label>
    <input class="theme-controller" type="checkbox" checked={true} value={$theme} hidden>
</div>