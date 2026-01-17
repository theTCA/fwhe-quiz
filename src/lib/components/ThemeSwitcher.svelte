<script>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { theme } from '$lib/stores';

	onMount(() => {
		themeChange(false);
	});

	function onChange() {
		if ($theme === 'light') $theme = 'dark';
		else $theme = 'light';
	}
</script>

<div>
	<label class="btn swap btn-square shadow-md">
		<input type="checkbox" onchange={onChange} checked={$theme === 'light'} />
		<Icon class="swap-off size-4" icon="ph:sun-bold" />
		<Icon class="swap-on size-4" icon="ph:moon-bold" />
	</label>
	<input class="theme-controller" type="checkbox" checked={true} value={$theme} hidden />
</div>
