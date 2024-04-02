import { writable } from "svelte/store";
import { storageAvailable } from "./helper";
import { flattendQuestions } from "./data";

/**
 * @param {string} key
 * @param {*} base
 */
function getStored(key, base) {
    if(!storageAvailable("localStorage"))
        return base;
    let item = localStorage.getItem(key);
    if(!item) {
        return base;
    }
    return JSON.parse(item);
}

/**
 * @param {string} key
 * @param {*} value
 */
function putStore(key, value) {
    if(!storageAvailable("localStorage"))
        return;
    localStorage.setItem(key, JSON.stringify(value));
}

export const quizQuestions = writable(getStored("quizQuestions", []).map((/** @type {number} */ e) => flattendQuestions.find(q => q.id === e)));
quizQuestions.subscribe(val => putStore("quizQuestions", val.map((/** @type {{ id: number; }} */ q) => q.id)));

export const quizHistory = writable(getStored("quizHistory", []).map((/**@type {{id: number, answer: string, date:Date}} */ e) => ({question: flattendQuestions.find(q => q.id === e.id), answer: e.answer, date: new Date(e.date)})));
quizHistory.subscribe(val => putStore("quizHistory", val.map(( /** @type {import("$lib/types").QuizHistory} */ h) => ({id: h.question.id, answer: h.answer, date: h.date}))));

export const trainingChapters = writable(getStored("trainingChapters", []));
trainingChapters.subscribe(val => putStore("trainingChapters", val));

export const trainingLastChapter = writable(getStored("trainingLastChapter", ""));
trainingLastChapter.subscribe(val => putStore("trainingLastChapter", val));

export const bookmarks = writable(getStored("bookmarks", []).map((/** @type {number} */ m) => flattendQuestions.find(q => q.id === m)));
bookmarks.subscribe(val => putStore("bookmarks", val.map((/** @type { import("$lib/types").Question } */ q) => q.id)));