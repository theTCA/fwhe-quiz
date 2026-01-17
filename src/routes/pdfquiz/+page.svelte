<script>
	import QuestionAdder from '$lib/components/QuestionAdder.svelte';
	import Icon from '@iconify/svelte';
	import { flattendQuestions } from '$lib/data';
	import { catalogues } from '$lib/data.json';
	import { shuffle } from '$lib/helper';
	import { QuizBuilder } from '$lib/pdf';
	import { bookmarks } from '$lib/stores';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	/**
	 * @type {HTMLDialogElement}
	 */
	let modal;

	/** @type {import('$lib/types').Question[]}*/
	let questions = $state([]);

	let selectedQuestions = $state(catalogues.map((c) => ({ ...c, selected: [] })));

	let randomQuestions = $state(15);
	let quizName = $state('Fragebogen');
	/** @type {'normal' | 'xl'}*/
	let quizFontSize = $state('normal');

	function addRandomQuestions() {
		let possibleQuestions = Array.from({ length: flattendQuestions.length }, (_, i) => i + 1);
		possibleQuestions = possibleQuestions.filter((id) => !questions.some((q) => q.id === id));
		possibleQuestions = shuffle(possibleQuestions);
		let ids = possibleQuestions.slice(0, randomQuestions);
		for (let id of ids) {
			addQuestion(id);
		}
	}

	function addSelectedQuestions() {
		/**
		 * @type {number[]}
		 */
		let val = [];
		let ids = selectedQuestions.reduce((acc, q) => [...acc, ...q.selected], val);
		if (ids.length == 0) return;
		questions = [];
		for (let id of ids) {
			addQuestion(id);
		}
	}

	function addBookmarks() {
		for (let bookmark of $bookmarks) {
			addQuestion(bookmark.id);
		}
	}

	function shuffleQuestions() {
		questions = shuffle(questions);
	}

	/**
	 * @param {number} id
	 */
	function addQuestion(id) {
		if (id <= 0 || id > flattendQuestions.length) return;
		if (questions.some((q) => q.id === id)) return;
		let question = flattendQuestions[id - 1];
		if (question) {
			question.choices = shuffle(question.choices);
			questions = [...questions, question];
		}
	}

	function clearQuestions() {
		questions = [];
	}

	/**
	 * @param {number} id
	 */
	function removeQuestion(id) {
		questions = questions.filter((q) => q.id !== id);
	}

	/**
	 * @param {boolean} solution
	 */
	function buildQuiz(solution) {
		if (questions.length === 0) return;
		let bloburl = null;
		if (solution) {
			bloburl = new QuizBuilder(quizName, questions, { style: quizFontSize, showSolution: true })
				.get()
				.output('bloburl');
		} else {
			bloburl = new QuizBuilder(quizName, questions, { style: quizFontSize })
				.get()
				.output('bloburl');
		}
		window.open(bloburl, '_blank');
	}

	/**
	 * @param {number} index
	 */
	function moveUp(index) {
		if (index <= 0) return;
		[questions[index - 1], questions[index]] = [questions[index], questions[index - 1]];
	}

	/**
	 * @param {number} index
	 */
	function moveDown(index) {
		if (index >= questions.length - 1) return;
		[questions[index + 1], questions[index]] = [questions[index], questions[index + 1]];
	}

	function openModal() {
		modal.showModal();
		// @ts-ignore
		selectedQuestions = selectedQuestions.map((c) => ({
			...c,
			selected: c.questions.map((q) => q.id).filter((id) => questions.some((q) => q.id === id))
		}));
	}
</script>

<svelte:head>
	<title>PDF-Quiz - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<h1 class="mb-2 text-center text-3xl font-semibold">PDF-Quiz</h1>
	<div class="mx-auto flex flex-col gap-3 lg:w-1/2">
		<fieldset class="fieldset">
			<label class="input w-full">
				<span class="label">Name</span>
				<input
					class="w-full"
					id="quizName"
					type="text"
					placeholder="Fragebogen"
					bind:value={quizName}
				/>
			</label>
		</fieldset>
		<fieldset class="fieldset gap-2">
			<legend>Schriftgröße</legend>
			<label class="flex cursor-pointer justify-start gap-3 input-ghost">
				<input
					class="radio"
					name="quizFontSize"
					type="radio"
					value="normal"
					bind:group={quizFontSize}
				/>
				<span class="label">Normal</span>
			</label>
			<label class="flex cursor-pointer justify-start gap-3 input-ghost">
				<input
					class="radio"
					name="quizFontSize"
					type="radio"
					value="xl"
					bind:group={quizFontSize}
				/>
				<span class="label text-xl">Größer</span>
			</label>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="flex h-8 items-center gap-1">
				<Icon class="h-5 w-5" icon="flowbite:book-solid" />
				<h3>aus Fragenkatalog auswählen</h3>
			</legend>
			<button class="btn btn-block btn-sm" onclick={openModal}>Fragen auswählen</button>
			<dialog id="quizQuestionSelection" class="modal" bind:this={modal}>
				<form class="z-10 modal-box h-screen max-h-[90%] w-screen md:max-w-[90%]" method="dialog">
					<div class="mb-2 flex items-center justify-between">
						<h2 class="text-xl font-bold">Fragen auswählen</h2>
						<button class="btn btn-square btn-outline">
							<Icon icon="mdi:close" />
						</button>
					</div>
					<QuestionAdder {addSelectedQuestions} bind:selectedQuestions />
				</form>
				<form class="modal-backdrop select-none" method="dialog">
					<button aria-label="backdrop"></button>
				</form>
			</dialog>
		</fieldset>
		<fieldset class="fieldset">
			<legend class="flex h-8 items-center gap-1">
				<Icon class="h-5 w-5" icon="ion:dice" />
				<h3>zufällige Fragen</h3>
			</legend>
			<div class="join">
				<label class="input input-sm join-item">
					<span class="label">Anzahl</span>
					<input type="number" min={1} bind:value={randomQuestions} />
				</label>
				<button
					class="btn join-item flex-1 btn-sm"
					onclick={addRandomQuestions}
					disabled={randomQuestions <= 0}
				>
					hinzufügen
				</button>
			</div>
		</fieldset>
		{#if $bookmarks.length > 0}
			<fieldset class="fieldset">
				<legend class="flex h-8 items-center gap-1">
					<Icon class="h-5 w-5" icon="mdi:bookmark" />
					<h3>Lesezeichen wählen</h3>
				</legend>
				<button class="btn btn-block btn-sm" onclick={addBookmarks}>
					<span class="badge badge-sm">{$bookmarks.length}</span>
					hinzufügen
				</button>
			</fieldset>
		{/if}
	</div>
	<div class="divider font-bold text-primary">Erstellen</div>
	<div class="mx-auto grid w-full grid-cols-2 gap-2 lg:w-1/2">
		<button
			class="btn btn-primary"
			onclick={() => buildQuiz(false)}
			disabled={questions.length <= 0}
		>
			Fragebogen
		</button>
		<button
			class="btn btn-primary"
			onclick={() => buildQuiz(true)}
			disabled={questions.length <= 0}
		>
			Antwortbogen
		</button>
	</div>
	<div class="divider font-bold text-primary">Fragen</div>
	<div>
		<div class="mb-2 flex items-center gap-2">
			<button class="btn btn-square btn-soft btn-sm" type="button" onclick={shuffleQuestions}>
				<Icon class="h-5 w-5" icon="ion:dice" />
			</button>
			<h2 class="flex-1 text-base font-semibold lg:text-lg">
				Ausgewählte Fragen ({questions.length})
			</h2>
			<button class="btn btn-outline btn-sm btn-error" onclick={clearQuestions}>Alle löschen</button
			>
		</div>
		<div class="flex flex-col gap-2">
			{#if questions.length > 0}
				{#each questions as question, idx (question.id)}
					<div class="flex items-center gap-1 rounded-md bg-base-200 p-2">
						<div class="grid grid-rows-2 gap-1">
							<button
								class="btn btn-ghost btn-soft btn-xs"
								type="button"
								onclick={() => moveUp(idx)}
							>
								<Icon icon="teenyicons:up-solid" />
							</button>
							<button
								class="btn btn-ghost btn-soft btn-xs"
								type="button"
								onclick={() => moveDown(idx)}
							>
								<Icon icon="teenyicons:down-solid" />
							</button>
						</div>
						<div class="divider m-0 divider-horizontal p-0"></div>
						<div class="flex-1 truncate text-base">
							{question?.question}
						</div>
						<button onclick={() => removeQuestion(question.id)}>
							<Icon class="h-6 w-6 cursor-pointer text-error" icon="ep:remove-filled" />
						</button>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
