<script>
    /** @type {{number: string, example: string, choices: {text: string, answer: boolean}[]}}*/
    export let question;
</script>

<div class="flex flex-col gap-2">
    <h2 class="text-base lg:text-lg font-semibold text-center"> Welche Beschreibung passt zu dieser Gefahrentafel? </h2>
    <div class="flex flex-col text-center bg-orange-500 border-4 border-black text-black text-lg font-bold w-24 mx-auto rounded-md">
        <span class="border-b-2 border-black"> {question.number} </span>
        <span class="border-t-2 border-black"> {question.example} </span>
    </div>
</div>