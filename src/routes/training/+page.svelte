<script>
	import { trainingChapters, trainingLastChapter, trainedBookmarks, bookmarks } from '$lib/stores';
	import { flattendQuestions } from '$lib/data';
	import { catalogues } from '$lib/data.json';
	import Question from '$lib/components/Question.svelte';
	import QuestionDisplay from '$lib/components/QuestionDisplay.svelte';
	import ChapterSelector from '$lib/components/ChapterSelector.svelte';
	import { shuffle } from '$lib/helper';
	import { onMount } from 'svelte';
	import QuestionHelp from '$lib/components/QuestionHelp.svelte';
	import BookmarkButton from '$lib/components/BookmarkButton.svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Icon from '@iconify/svelte';

	if ($trainingChapters.length <= 0) {
		$trainingChapters = catalogues.map((c) => ({
			name: c.name,
			questions: [],
			length: c.questions.length
		}));
	}

	let completedChapters = $derived(
		$trainingChapters.reduce(
			(/** @type {number} */ acc, /** @type {{ questions: string | any[]; length: any; }} */ c) =>
				c.questions.length === c.length ? acc + 1 : acc,
			0
		)
	);

	let chapterProgress = $derived(
		$trainingChapters.reduce(
			(/** @type {any} */ acc, /** @type {{ questions: number[] }} */ c) =>
				acc + c.questions.length,
			0
		)
	);

	/**
	 * @type {{name: string, questions: number[], length: number} | undefined}
	 */
	let selectedChapter = $state(undefined);

	/**
	 * @type {import("$lib/types").Question[]}
	 */
	let questions = [];
	/**
	 * @type {import("$lib/types").Question | undefined}
	 */
	let question = $state(undefined);
	let answer = $state('');
	let answered = $state(false);

	onMount(() => {
		if ($trainingLastChapter) {
			onSelectChapter($trainingLastChapter);
		}
	});

	function answerQuestion() {
		answered = true;
		if (!question) {
			return;
		}
		let correctChoice = question.choices.find((c) => c.answer);
		if (correctChoice && selectedChapter && questions) {
			if (correctChoice.text === answer) {
				if (selectedChapter.name === 'Lesezeichen') {
					selectedChapter.questions = [...selectedChapter.questions, question.id];
					$trainedBookmarks = [...$trainedBookmarks, question];
					$trainedBookmarks = $trainedBookmarks;
				} else {
					$trainingChapters.find(
						(/** @type {{ name: string; }} */ c) => c.name === selectedChapter?.name
					).questions = [...selectedChapter.questions, question.id];
					selectedChapter.questions = [...selectedChapter.questions, question.id];
					$trainingChapters = $trainingChapters;
				}
			} else {
				questions = [...questions, question];
			}
		}
		$trainingChapters = $trainingChapters;
	}

	function nextQuestion() {
		if (!questions || questions.length <= 0) {
			return;
		}
		questions = [...questions.slice(1)];
		if (questions.length > 0) {
			question = questions?.at(0);
			answer = '';
			answered = false;
		} else {
			closeQuestions();
		}
	}

	function closeQuestions() {
		selectedChapter = undefined;
		answer = '';
		answered = false;
		questions = [];
		question = undefined;
		$trainingLastChapter = '';
	}

	function loadChapter() {
		if (!selectedChapter) return;
		if (selectedChapter.questions.length === selectedChapter.length) {
			resetChapter(selectedChapter.name);
		}
		let possibleQuestions = getPossibleQuestions(selectedChapter);
		if (possibleQuestions) {
			questions = possibleQuestions;
			question = questions?.at(0);
		}
	}

	function selectBookmarkChapter() {
		if ($trainedBookmarks.length === $bookmarks.length) $trainedBookmarks = [];
		selectedChapter = {
			name: 'Lesezeichen',
			questions: [...$trainedBookmarks],
			length: $bookmarks.length
		};
		$trainingLastChapter = 'Lesezeichen';
		questions = shuffle(
			$bookmarks
				.filter(
					(/** @type {import("$lib/types").Question} */ q) => !$trainedBookmarks.includes(q.id)
				)
				.map((/** @type {import("$lib/types").Question} */ q) => ({
					...q,
					choices: shuffle(q.choices)
				}))
		);
		question = questions?.at(0);
	}

	function resetBookmarkChapter() {
		$trainedBookmarks = [];
	}

	/**
	 * @param {string} name
	 */
	function onSelectChapter(name) {
		if (!name) {
			selectedChapter = undefined;
			return;
		}
		if (name === 'Lesezeichen') {
			selectBookmarkChapter();
			return;
		}
		let chapter = $trainingChapters.find((/** @type {{ name: string; }} */ c) => c.name === name);
		if (!chapter) {
			selectedChapter = undefined;
			return;
		}
		selectedChapter = chapter;
		$trainingLastChapter = selectedChapter?.name;
		loadChapter();
	}

	/**
	 * @param {string} name
	 */
	function onResetChapter(name) {
		if (!name) {
			return;
		}
		resetChapter(name);
	}

	/**
	 * @param {string} name
	 */
	function resetChapter(name) {
		let chapter = $trainingChapters.find((/** @type {{ name: string; }} */ c) => c.name === name);
		if (!chapter) {
			return;
		}
		chapter.questions = [];
		$trainingChapters = $trainingChapters;
	}

	/**
	 * @param {{name: string, questions: number[], length: number} | null} chapter
	 */
	function getPossibleQuestions(chapter) {
		if (!chapter) return null;
		let questions = catalogues.find((c) => c.name === chapter.name)?.questions;
		if (!questions || questions?.length <= 0) {
			return null;
		}
		questions = questions
			.filter((q) => !chapter.questions.includes(q.id))
			.map((q) => ({ ...q, choices: shuffle(q.choices) }));
		return shuffle(questions);
	}
</script>

<svelte:head>
	<title>Training - {PUBLIC_APP_NAME}</title>
</svelte:head>

<div>
	<div class="relative mb-2 flex w-full justify-between">
		<h1 class="mb-2 flex-1 text-center text-3xl font-semibold">Training</h1>
		{#if question}
			<BookmarkButton class="absolute right-2 lg:right-0" {question} />
		{/if}
	</div>
	{#if !selectedChapter}
		<div class="mb-6">
			<h2 class="text-lg font-semibold">Fortschritt</h2>
			<div class="text-sm">
				<span class="font-bold">{completedChapters}</span>
				von
				<span class="font-bold">{$trainingChapters.length}</span>
				Themenbereichen abgeschlossen
			</div>
			<div class="flex flex-col gap-1">
				<progress
					class="progress progress-primary"
					value={chapterProgress}
					max={flattendQuestions.length}
				></progress>
				<div class="mx-auto text-xs font-bold">
					<span>{chapterProgress}</span>
					<span>/</span>
					<span>{flattendQuestions.length}</span>
				</div>
			</div>
		</div>
		<div class="divider font-bold">Themenbereiche</div>
		{#if $bookmarks.length > 0}
			<div class="mb-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				<div class="flex w-full items-center gap-2 rounded-md bg-base-200 p-2">
					<button
						class="btn btn-square btn-soft btn-primary"
						type="button"
						onclick={selectBookmarkChapter}
					>
						<Icon icon="carbon:play-filled-alt" />
					</button>
					<div class="flex-1">
						<h3 class="min-w-0 text-left font-semibold wrap-break-word">Lesezeichen</h3>
						<progress
							class="progress progress-primary"
							value={$trainedBookmarks.length}
							max={$bookmarks.length}
						></progress>
					</div>
					<button class="btn btn-square btn-soft" onclick={resetBookmarkChapter}>
						<Icon icon="material-symbols:refresh" />
					</button>
				</div>
			</div>
			<div class="divider"></div>
		{/if}
		<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
			{#each $trainingChapters as chapter (chapter.name)}
				<ChapterSelector {chapter} select={onSelectChapter} reset={onResetChapter} />
			{/each}
		</div>
	{:else}
		<div>
			<div class="mb-6">
				<h2 class="mb-2 flex-1 text-center text-sm font-semibold text-primary">
					{selectedChapter.name}
				</h2>
				<div class="flex flex-col gap-1">
					<progress
						class="progress progress-primary"
						value={selectedChapter.questions.length}
						max={selectedChapter.length}
					></progress>
					<div class="text-content text-center text-xs font-bold">
						<span>{selectedChapter.questions.length}</span>
						<span>/</span>
						<span>{selectedChapter.length}</span>
					</div>
				</div>
			</div>
			{#if question}
				<div class="mb-2">
					{#if answered}
						<QuestionDisplay {question} {answer} />
					{:else}
						<Question {question} showCatalog={false} bind:answer />
					{/if}
				</div>
			{/if}
			<div class="grid grid-cols-2 gap-2">
				<button class="btn" onclick={closeQuestions}> Zurück </button>
				{#if answered}
					<button class="btn btn-primary" onclick={nextQuestion}> Weiter </button>
				{:else if answer === ''}
					<button class="btn btn-outline btn-primary" onclick={answerQuestion}> Wählen </button>
				{:else}
					<button class="btn btn-primary" onclick={answerQuestion}> Wählen </button>
				{/if}
			</div>
			{#if question && answered}
				<div class="mt-6">
					<QuestionHelp {question} />
				</div>
			{/if}
		</div>
	{/if}
</div>
