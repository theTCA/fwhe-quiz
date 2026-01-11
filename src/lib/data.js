import { catalogues } from './data.json';

export const flattendQuestions = catalogues
	.map((c) => c.questions.map((q) => ({ ...q, catalog: c.name })))
	.flat();
