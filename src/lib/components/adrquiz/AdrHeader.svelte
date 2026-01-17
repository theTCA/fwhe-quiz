<script>
	let { question } = $props();
</script>

<div class="flex flex-col gap-2">
	<h2 class="text-center text-base font-semibold lg:text-lg">
		Welche Beschreibung passt zu dieser Gefahrentafel?
	</h2>
	<div
		class="mx-auto flex w-24 flex-col border-4 border-black bg-orange-500 text-center text-lg font-bold text-black"
	>
		<span class="border-b-2 border-black"> {question.number} </span>
		<span class="border-t-2 border-black"> {question.example} </span>
	</div>
</div>
