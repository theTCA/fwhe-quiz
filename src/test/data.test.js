import { flattendQuestions } from '$lib/data';
import { expect, test } from 'vitest';

test('Unique ids for questions', () => {
	const uniqueIds = new Set();
	/**
	 * @type {Array<number>}
	 */
	let duplicates = [];
	flattendQuestions.forEach((q) => {
		if (!uniqueIds.has(q.id)) uniqueIds.add(q.id);
		else duplicates = [...duplicates, q.id];
	});
	expect(duplicates.length, `Duplicate ids @ ${duplicates.toString()}`).toEqual(0);
});

test('Exactly one correct answer', () => {
	/**
	 * @type {Array<number>}
	 */
	let failedAnswers = [];
	flattendQuestions.forEach((q) => {
		let choices = [0, 0];
		q.choices.forEach((c) => {
			choices[c.answer ? 0 : 1] += 1;
		});
		if (choices[0] + choices[1] !== 3) {
			failedAnswers = [...failedAnswers, q.id];
			return;
		}
		if (choices[0] !== 1) {
			failedAnswers = [...failedAnswers, q.id];
			return;
		}
	});
	expect(failedAnswers.length, `Answers wrong @ ${failedAnswers.toString()}`).toEqual(0);
});
