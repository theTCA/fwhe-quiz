import {catalogues} from "./data.json";

export const flattendQuestions = catalogues.map(c => c.questions.map(q => ({...q, catalog: c.name}))).flat();
export const allQuestionTags = flattendQuestions.reduce((/** @type {string[]} */ acc, q) => Array.from(new Set([...acc, ...q.tags])), []).sort((a, b) => a.localeCompare(b));