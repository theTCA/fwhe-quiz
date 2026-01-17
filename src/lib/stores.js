import { writable } from 'svelte/store';
import { storageAvailable } from './helper';
import { flattendQuestions } from './data';

/**
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
export function getLocalStorage(key, defaultValue) {
	if (!storageAvailable('localStorage')) return defaultValue;
	let item = localStorage.getItem(key);
	if (!item) {
		return defaultValue;
	}
	return JSON.parse(item);
}

/**
 * @param {string} key
 * @param {*} value
 */
export function putLocalStorage(key, value) {
	if (!storageAvailable('localStorage')) return;
	localStorage.setItem(key, JSON.stringify(value));
}

export function clearVersionDependentStores() {
	quizQuestions.set([]);
	quizHistory.set({});
	endlessQuizQuestions.set([]);
	trainingChapters.set([]);
	trainingLastChapter.set('');
	bookmarks.set([]);
	trainedBookmarks.set([]);
}

/** @type {import('svelte/store').Writable<Array<import('$lib/types').Question>>} */
export const endlessQuizQuestions = writable(
	getLocalStorage('endlessQuizQuestions', []).map((/** @type {number} */ e) => {
		let question = flattendQuestions.find((q) => q.id === e);
		if (question) return question;
		return e;
	})
);
endlessQuizQuestions.subscribe((val) =>
	putLocalStorage(
		'endlessQuizQuestions',
		val.map((q) => q.id)
	)
);

/**
 * @type {import('svelte/store').Writable<Array<{question: import("$lib/types").Question, answer: string, answered: boolean}>>}
 */
export const quizQuestions = writable(
	getLocalStorage('quizQuestions', []).map(
		(/** @type {{id: number, answer: string, answered: boolean}}*/ e) => ({
			question: flattendQuestions.find((q) => q.id === e.id),
			answer: e.answer,
			answered: e.answered
		})
	)
);
quizQuestions.subscribe((val) =>
	putLocalStorage(
		'quizQuestions',
		val.map((e) => ({
			id: e.question.id,
			answer: e.answer,
			answered: e.answered
		}))
	)
);
/**
 * @typedef {import('$lib/types').QuizHistory | {question: number, date: string}} StoredQuizHistory
 */
/** @type {Object<string, Array<StoredQuizHistory>>} */
const defaultQuizHistoryValue = {};
/**
 * Import the value in localStorage into a @member {Object}
 * @returns {Object<string, Array<import('$lib/types').QuizHistory>>}
 */
function importQuizHistory() {
	let history = getLocalStorage('quizHistory', defaultQuizHistoryValue);
	for (let [key, type] of Object.entries(history)) {
		history[key] = type.map((/** @type {StoredQuizHistory} */ h) => ({
			...h,
			question: flattendQuestions.find((q) => q.id === h.question),
			date: new Date(h.date)
		}));
	}
	return history;
}

/**
 * @param {Object<string, Array<import('$lib/types').QuizHistory >>} history
 * @returns {Object<string, Array<StoredQuizHistory>>}
 * */
function exportQuizHistory(history) {
	let obj = defaultQuizHistoryValue;
	for (let [key, type] of Object.entries(history)) {
		obj[key] = type.map((h) => ({ ...h, question: h.question.id, date: h.date.toJSON() }));
	}
	return obj;
}

/**
 * @type {import('svelte/store').Writable<Object<string, Array<import("$lib/types").QuizHistory>>>}
 */
export const quizHistory = writable(importQuizHistory());
quizHistory.subscribe((val) => putLocalStorage('quizHistory', exportQuizHistory(val)));

export const trainingChapters = writable(getLocalStorage('trainingChapters', []));
trainingChapters.subscribe((val) => putLocalStorage('trainingChapters', val));

export const trainingLastChapter = writable(getLocalStorage('trainingLastChapter', ''));
trainingLastChapter.subscribe((val) => putLocalStorage('trainingLastChapter', val));

/** @type {import('svelte/store').Writable<Array<import('$lib/types').Question>>} */
export const bookmarks = writable(
	getLocalStorage('bookmarks', []).map((/** @type {number} */ m) =>
		flattendQuestions.find((q) => q.id === m)
	)
);

bookmarks.subscribe((val) =>
	putLocalStorage(
		'bookmarks',
		val.map((/** @type { import("$lib/types").Question } */ q) => q.id)
	)
);

export const trainedBookmarks = writable(
	getLocalStorage('trainedBookmarks', []).map((/** @type {number} */ m) =>
		flattendQuestions.find((q) => q.id === m)
	)
);
trainedBookmarks.subscribe((val) =>
	putLocalStorage(
		'trainedBookmarks',
		val.map((/** @type { import("$lib/types").Question } */ q) => q.id)
	)
);

/**
 * @type {import('svelte/store').Writable<string>}
 */
export const theme = writable(getLocalStorage('theme', ''));
theme.subscribe((val) => putLocalStorage('theme', val));

export const version = writable(getLocalStorage('version', 0));
version.subscribe((val) => putLocalStorage('version', val));
