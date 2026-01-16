const groups = ['Quiz nach Fragenkatalog', 'Weitere', 'Informationen'];

export const pages = [
	{
		name: 'Training',
		desc: 'Fragen aus dem Fragenkatalog üben',
		href: '/training',
		icon: 'mdi:brain',
		group: groups[0],
		inNavbar: true
	},
	{
		name: 'Endlosquiz',
		desc: 'endlose Fragen aus dem Fragenkatalog',
		href: '/endless',
		icon: 'ri:infinity-line',
		group: groups[0],
		inNavbar: true
	},
	{
		name: 'Quiz',
		desc: 'selbst gewählte Fragen nach Themenbereich',
		href: '/quiz',
		icon: 'material-symbols:question-mark',
		group: groups[0],
		inNavbar: true
	},
	{
		name: 'ADR-Quiz',
		desc: 'Fragen zur Gefahrguttafel und deren Kennzeichnung',
		href: '/adrquiz',
		icon: 'mdi:biohazard',
		group: groups[1],
		inNavbar: true
	},
	{
		name: 'Schaumquiz',
		desc: 'Fragen zur Berechnung von Schaum',
		href: '/foamquiz',
		icon: 'icon-park-outline:soap-bubble',
		group: groups[1],
		inNavbar: false
	},
	{
		name: 'Problemquiz',
		desc: 'falsch beantwortete Fragen wiederholen',
		href: '/problemquiz',
		icon: 'icon-park-outline:thinking-problem',
		group: groups[0],
		inNavbar: false
	},
	{
		name: 'PDF-Quiz',
		desc: 'Erstelle Fragen- und Antwortenbogen als PDF.',
		href: '/pdfquiz',
		icon: 'ph:file-pdf',
		group: groups[0],
		inNavbar: true
	},
	{
		name: 'Durchsuchen',
		desc: 'Fragenkatalog nach Fragen durchsuchen',
		href: '/search',
		icon: 'f7:doc-text-search',
		group: groups[2],
		inNavbar: false
	},
	{
		name: 'Statistik',
		desc: 'Informationen über Fragenkatalog',
		href: '/quizstats',
		icon: 'streamline-plump:graph-bar-increase-solid',
		group: groups[2],
		inNavbar: false
	},
	{
		name: 'Verlauf',
		desc: 'Historie der beantworteten Fragen',
		href: '/history',
		icon: 'material-symbols:history',
		group: groups[2],
		inNavbar: false
	}
];

export const pageGroups = pages.reduce(cardReducer, []);

/**
 * @param {any[]} acc
 * @param {{ group: any; }} page
 */
function cardReducer(acc, page) {
	if (acc.some((g) => g.name === page.group)) {
		let group = acc.find((g) => g.name === page.group);
		if (group) group.pages = [...group.pages, page];
	} else {
		acc = [...acc, { name: page.group, pages: [page] }];
	}
	return acc;
}
