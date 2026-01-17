import { writable } from 'svelte/store';
import { storageAvailable } from './helper';
import { flattendQuestions } from './data';

/**
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
export function getLocalStorage(key, defaultValue) {
    if (!storageAvailable('localStorage'))         return defaultValue;
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
    if (!storageAvailable('localStorage'))         return;
    localStorage.setItem(key, JSON.stringify(value));
}

export function clearVersionDependentStores() {
    quizQuestions.set([]);
    quizHistory.set([]);
    endlessQuizQuestions.set([]);
    trainingChapters.set([]);
    trainingLastChapter.set("");
    bookmarks.set([]);
    trainedBookmarks.set([]);
}

export const endlessQuizQuestions = writable(getLocalStorage("endlessQuizQuestions", []).map((/** @type {number} */ e) => flattendQuestions.find(q => q.id === e)));
endlessQuizQuestions.subscribe(val => putLocalStorage("endlessQuizQuestions", val.map((/** @type {{ id: number; }} */ q) => q.id)));

export const quizQuestions = writable(getLocalStorage("quizQuestions", []).map((/** @type {{id: number, answer: string, answered: boolean}}*/e) => ({question: flattendQuestions.find(q => q.id === e.id), answer: e.answer, answered: e.answered})));
quizQuestions.subscribe(val => putLocalStorage("quizQuestions", val.map((/** @type {{question: import("$lib/types").Question, answer: string, answered: boolean}}*/ e) => ({id: e.question.id, answer: e.answer, answered: e.answered}))));

export const quizHistory = writable(getLocalStorage("quizHistory", []).map((/**@type {{id: number, answer: string, date: Date, type: string}} */ e) => ({question: flattendQuestions.find(q => q.id === e.id), answer: e.answer, date: new Date(e.date), type: e.type})));
quizHistory.subscribe(val => putLocalStorage("quizHistory", val.map(( /** @type {import("$lib/types").QuizHistory} */ h) => ({id: h.question.id, answer: h.answer, date: h.date, type: h.type}))));

export const trainingChapters = writable(getLocalStorage("trainingChapters", []));
trainingChapters.subscribe(val => putLocalStorage("trainingChapters", val));

export const trainingLastChapter = writable(getLocalStorage("trainingLastChapter", ""));
trainingLastChapter.subscribe(val => putLocalStorage("trainingLastChapter", val));

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

/**
 * @type {import('svelte/store').Writable<string>}
 */
export const theme = writable(getLocalStorage('theme', ''));
theme.subscribe((val) => putLocalStorage('theme', val));

export const version = writable(getLocalStorage("version", 0));
version.subscribe(val => putLocalStorage("version", val));