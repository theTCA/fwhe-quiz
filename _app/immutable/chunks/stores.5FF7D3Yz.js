import{w as e}from"./index.gPVbpMZe.js";import{s as o}from"./helper.CMGnaNZv.js";import{c as l}from"./data.BiDvi6Wg.js";const r=l.map(t=>t.questions.map(s=>({...s,catalog:t.name}))).flat();function a(t,s){if(!o("localStorage"))return s;let n=localStorage.getItem(t);return n?JSON.parse(n):s}function i(t,s){o("localStorage")&&localStorage.setItem(t,JSON.stringify(s))}function h(){u.set([]),c.set([]),m.set([]),p.set(""),b.set([])}const u=e(a("quizQuestions",[]).map(t=>r.find(s=>s.id===t)));u.subscribe(t=>i("quizQuestions",t.map(s=>s.id)));const c=e(a("quizHistory",[]).map(t=>({question:r.find(s=>s.id===t.id),answer:t.answer,date:new Date(t.date)})));c.subscribe(t=>i("quizHistory",t.map(s=>({id:s.question.id,answer:s.answer,date:s.date}))));const m=e(a("trainingChapters",[]));m.subscribe(t=>i("trainingChapters",t));const p=e(a("trainingLastChapter",""));p.subscribe(t=>i("trainingLastChapter",t));const b=e(a("bookmarks",[]).map(t=>r.find(s=>s.id===t)));b.subscribe(t=>i("bookmarks",t.map(s=>s.id)));const d=e(a("theme",""));d.subscribe(t=>i("theme",t));const g=e(a("version",0));g.subscribe(t=>i("version",t));export{u as a,b,m as c,d,h as e,r as f,c as q,p as t,g as v};
