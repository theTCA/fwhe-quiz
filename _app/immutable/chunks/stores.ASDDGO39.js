import{w as a}from"./index.Cmzgk_Fq.js";import{s as n}from"./helper.CMGnaNZv.js";import{f as o}from"./data.DNw_nuqQ.js";function r(t,i){if(!n("localStorage"))return i;let s=localStorage.getItem(t);return s?JSON.parse(s):i}function e(t,i){n("localStorage")&&localStorage.setItem(t,JSON.stringify(i))}const u=a(r("quizQuestions",[]).map(t=>o.find(i=>i.id===t)));u.subscribe(t=>e("quizQuestions",t.map(i=>i.id)));const p=a(r("quizHistory",[]).map(t=>({question:o.find(i=>i.id===t.id),answer:t.answer,date:new Date(t.date)})));p.subscribe(t=>e("quizHistory",t.map(i=>({id:i.question.id,answer:i.answer,date:i.date}))));const c=a(r("trainingChapters",[]));c.subscribe(t=>e("trainingChapters",t));const d=a(r("trainingLastChapter",""));d.subscribe(t=>e("trainingLastChapter",t));export{u as a,c as b,p as q,d as t};
