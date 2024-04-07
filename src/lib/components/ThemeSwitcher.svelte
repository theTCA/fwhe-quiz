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
            $theme = ""
        else
            $theme = "light"
    }
</script>


<label class="swap btn">
    <input class="theme-controller" type="checkbox" value="light" checked={$theme === "light"} on:change={onChange}>
    <Icon class="swap-off" icon="ph:sun-bold"/>
    <Icon class="swap-on" icon="ph:moon-bold"/>
</label>