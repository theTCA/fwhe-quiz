import{w as s}from"./index.CNj_-9Qs.js";import{s as o}from"./helper.CMGnaNZv.js";import{c as u}from"./data.DjoZ6nhe.js";const e=u.map(t=>t.questions.map(a=>({...a,catalog:t.name}))).flat();function i(t,a){if(!o("localStorage"))return a;let n=localStorage.getItem(t);return n?JSON.parse(n):a}function r(t,a){o("localStorage")&&localStorage.setItem(t,JSON.stringify(a))}const m=s(i("quizQuestions",[]).map(t=>e.find(a=>a.id===t)));m.subscribe(t=>r("quizQuestions",t.map(a=>a.id)));const c=s(i("quizHistory",[]).map(t=>({question:e.find(a=>a.id===t.id),answer:t.answer,date:new Date(t.date)})));c.subscribe(t=>r("quizHistory",t.map(a=>({id:a.question.id,answer:a.answer,date:a.date}))));const p=s(i("trainingChapters",[]));p.subscribe(t=>r("trainingChapters",t));const d=s(i("trainingLastChapter",""));d.subscribe(t=>r("trainingLastChapter",t));const g=s(i("bookmarks",[]).map(t=>e.find(a=>a.id===t)));g.subscribe(t=>r("bookmarks",t.map(a=>a.id)));export{m as a,g as b,p as c,e as f,c as q,d as t};