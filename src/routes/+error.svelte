<script>
    import { page } from "$app/state";
    import { PUBLIC_APP_NAME } from "$env/static/public";
</script>

<svelte:head>
    <title>Error {page.status} - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div class="w-full h-full flex flex-col items-center justify-center gap-2">
    <div class="w-60 h-60 border-8 border-base-300 rounded-full flex justify-center items-center">
        <h2 class="font-bold text-primary text-6xl"> {page.status} </h2>
    </div>
    <div class="font-semibold text-lg">
        {page.error?.message}
    </div>
</div>