import { base } from "$app/paths";

const groups = ["Quiz", "Informationen"];

export const pages = [
    {
        name: "Training",
        desc: "Beantworte Fragen aus dem Fragenkatalog nach Wahl.",
        href: "/training",
        icon: "mdi:brain",
        group: groups[0],
        inNavbar: true,
    },
    {
        name: "Endlosquiz",
        desc: "Beantworte zufällige Fragen aus dem Fragenkatalog.",
        href: "/endless",
        icon: "ri:infinity-line",
        group: groups[0],
        inNavbar: true,
    },
    {
        name: "Quiz",
        desc: "Beantworte selbst gewählte zufällige Fragen aus dem Fragenkatalog.",
        href: "/quiz",
        icon: "material-symbols:question-mark",
        group: groups[0],
        inNavbar: true,
    },
    {
        name: "ADR-Quiz",
        desc: "Beantworte Fragen zu Gefahrgütern und deren Kennzeichnung.",
        href: "/adrquiz",
        icon: "mdi:biohazard",
        group: groups[0],
        inNavbar: true,
    },
    {
        name: "Schaumquiz",
        desc: "Berechne die benötigte Menge Schaum oder Schaummittel",
        href: "/foam",
        icon: "icon-park-outline:soap-bubble",
        group: groups[0],
        inNavbar: false,
    },
    {
        name: "PDF-Quiz",
        desc: "Erstelle Fragen- und Antwortenbogen als PDF.",
        href: "/pdfquiz",
        icon: "ph:file-pdf",
        group: groups[0],
        inNavbar: true,
    },
    {
        name: "Durchsuchen",
        desc: "Fragenkatalog nach Fragen durchsuchen",
        href: "/search",
        icon: "carbon:catalog",
        group: groups[1],
        inNavbar: false,
    },
    {
        name: "Statistik",
        desc: "Informationen über Fragenkatalog",
        href: "/quizstats",
        icon: "material-symbols:query-stats",
        group: groups[1],
        inNavbar: false,
    },
    {
        name: "Verlauf",
        desc: "Historie der beantworteten Fragen",
        href: "/history",
        icon: "material-symbols:history",
        group: groups[1],
        inNavbar: false,
    }
].map(c => ({...c, href: base + c.href}));

export const pageGroups = pages.reduce(cardReducer, []);

/**
 * @param {any[]} acc
 * @param {{ group: any; }} page
 */
function cardReducer(acc, page) {
    if(acc.some(g => g.name === page.group)) {
        let group = acc.find(g => g.name === page.group);
        if(group)
            group.pages = [...group.pages, page];
    } else {
        acc = [...acc, {name: page.group, pages: [page]}];
    }
    return acc;
}