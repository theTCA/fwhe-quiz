import{s as ie,a as I,e as q,l as ae,f as h,g as z,c as $,b as B,m as S,o as w,i as P,h as p,k as R,t as X,d as Y,j as ue,q as N,u as fe,v as ce,r as oe,n as re}from"../chunks/scheduler.Dvs1iJHW.js";import{S as _e,i as me,c as U,b as j,m as x,a as D,e as Z,t as C,d as F,g as ee,f as de}from"../chunks/index.DXS40F_h.js";import{b as pe}from"../chunks/paths.BRdlBB8j.js";import{P as he}from"../chunks/public.DSIcp1HN.js";import{B as be,Q as ge}from"../chunks/QuestionDisplay.CTqWbjcJ.js";import{Q as ve}from"../chunks/Question.BxMy1L2f.js";import{Q as ke}from"../chunks/QuestionHelp.DoRy-nGj.js";import{q as te,e as T,f as se}from"../chunks/stores.CMvTHF_c.js";import{a as ne}from"../chunks/helper.CMGnaNZv.js";function qe(r){let e,s,t;function l(n){r[6](n)}let o={question:r[0]};return r[1]!==void 0&&(o.answer=r[1]),e=new ve({props:o}),fe.push(()=>de(e,"answer",l)),{c(){U(e.$$.fragment)},l(n){j(e.$$.fragment,n)},m(n,u){x(e,n,u),t=!0},p(n,u){const m={};u&1&&(m.question=n[0]),!s&&u&2&&(s=!0,m.answer=n[1],ce(()=>s=!1)),e.$set(m)},i(n){t||(C(e.$$.fragment,n),t=!0)},o(n){D(e.$$.fragment,n),t=!1},d(n){F(e,n)}}}function $e(r){let e,s;return e=new ge({props:{question:r[0],answer:r[1]}}),{c(){U(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,l){x(e,t,l),s=!0},p(t,l){const o={};l&1&&(o.question=t[0]),l&2&&(o.answer=t[1]),e.$set(o)},i(t){s||(C(e.$$.fragment,t),s=!0)},o(t){D(e.$$.fragment,t),s=!1},d(t){F(e,t)}}}function we(r){let e,s="Wählen",t,l;return{c(){e=q("button"),e.textContent=s,this.h()},l(o){e=$(o,"BUTTON",{class:!0,"data-svelte-h":!0}),S(e)!=="svelte-yp6av2"&&(e.textContent=s),this.h()},h(){w(e,"class","btn btn-primary")},m(o,n){P(o,e,n),t||(l=oe(e,"click",r[5]),t=!0)},p:re,d(o){o&&h(e),t=!1,l()}}}function Ce(r){let e,s="Weiter",t,l;return{c(){e=q("button"),e.textContent=s,this.h()},l(o){e=$(o,"BUTTON",{class:!0,"data-svelte-h":!0}),S(e)!=="svelte-160a17b"&&(e.textContent=s),this.h()},h(){w(e,"class","btn btn-primary")},m(o,n){P(o,e,n),t||(l=oe(e,"click",r[4]),t=!0)},p:re,d(o){o&&h(e),t=!1,l()}}}function le(r){let e,s,t,l,o,n,u,m;return u=new ke({props:{question:r[0]}}),{c(){e=q("div"),s=q("div"),t=X(`in Folge richtig:\r
            `),l=q("span"),o=X(r[3]),n=I(),U(u.$$.fragment),this.h()},l(i){e=$(i,"DIV",{class:!0});var f=B(e);s=$(f,"DIV",{class:!0});var c=B(s);t=Y(c,`in Folge richtig:\r
            `),l=$(c,"SPAN",{class:!0});var d=B(l);o=Y(d,r[3]),d.forEach(h),c.forEach(h),f.forEach(h),n=z(i),j(u.$$.fragment,i),this.h()},h(){w(l,"class","font-semibold"),w(s,"class","text-sm text-center mb-4"),w(e,"class","grid grid-cols-2")},m(i,f){P(i,e,f),p(e,s),p(s,t),p(s,l),p(l,o),P(i,n,f),x(u,i,f),m=!0},p(i,f){(!m||f&8)&&ue(o,i[3]);const c={};f&1&&(c.question=i[0]),u.$set(c)},i(i){m||(C(u.$$.fragment,i),m=!0)},o(i){D(u.$$.fragment,i),m=!1},d(i){i&&(h(e),h(n)),F(u,i)}}}function ye(r){let e,s,t,l,o="Endlosquiz",n,u,m,i,f,c,d,g,y,L="Ergebnisse",O,W,V;document.title="Endlosquiz - "+he,u=new be({props:{class:"absolute right-2 lg:right-0",question:r[0]}});const M=[$e,qe],Q=[];function G(a,b){return a[2]?0:1}f=G(r),c=Q[f]=M[f](r);function J(a,b){return a[2]?Ce:we}let A=J(r),v=A(r),_=r[2]&&le(r);return{c(){e=I(),s=q("div"),t=q("div"),l=q("h1"),l.textContent=o,n=I(),U(u.$$.fragment),m=I(),i=q("div"),c.c(),d=I(),g=q("div"),y=q("a"),y.textContent=L,O=I(),v.c(),W=I(),_&&_.c(),this.h()},l(a){ae("svelte-6cenkn",document.head).forEach(h),e=z(a),s=$(a,"DIV",{});var k=B(s);t=$(k,"DIV",{class:!0});var E=B(t);l=$(E,"H1",{class:!0,"data-svelte-h":!0}),S(l)!=="svelte-1pbwgef"&&(l.textContent=o),n=z(E),j(u.$$.fragment,E),E.forEach(h),m=z(k),i=$(k,"DIV",{class:!0});var K=B(i);c.l(K),K.forEach(h),d=z(k),g=$(k,"DIV",{class:!0});var H=B(g);y=$(H,"A",{class:!0,href:!0,"data-svelte-h":!0}),S(y)!=="svelte-10y0hi6"&&(y.textContent=L),O=z(H),v.l(H),H.forEach(h),W=z(k),_&&_.l(k),k.forEach(h),this.h()},h(){w(l,"class","text-3xl flex-1 text-center font-semibold mb-2"),w(t,"class","relative flex justify-between w-full"),w(i,"class","mb-2"),w(y,"class","btn btn-outline"),w(y,"href",pe+"/history"),w(g,"class","grid grid-cols-2 gap-2 mb-4")},m(a,b){P(a,e,b),P(a,s,b),p(s,t),p(t,l),p(t,n),x(u,t,null),p(s,m),p(s,i),Q[f].m(i,null),p(s,d),p(s,g),p(g,y),p(g,O),v.m(g,null),p(s,W),_&&_.m(s,null),V=!0},p(a,[b]){const k={};b&1&&(k.question=a[0]),u.$set(k);let E=f;f=G(a),f===E?Q[f].p(a,b):(ee(),D(Q[E],1,1,()=>{Q[E]=null}),Z(),c=Q[f],c?c.p(a,b):(c=Q[f]=M[f](a),c.c()),C(c,1),c.m(i,null)),A===(A=J(a))&&v?v.p(a,b):(v.d(1),v=A(a),v&&(v.c(),v.m(g,null))),a[2]?_?(_.p(a,b),b&4&&C(_,1)):(_=le(a),_.c(),C(_,1),_.m(s,null)):_&&(ee(),D(_,1,1,()=>{_=null}),Z())},i(a){V||(C(u.$$.fragment,a),C(c),C(_),V=!0)},o(a){D(u.$$.fragment,a),D(c),D(_),V=!1},d(a){a&&(h(e),h(s)),F(u),Q[f].d(),v.d(),_&&_.d()}}}function Qe(r,e,s){let t,l;R(r,T,d=>s(7,t=d)),R(r,te,d=>s(8,l=d)),t.length===0&&N(T,t=[...ne(se)],t);let o=t.at(0),n="",u=!1,m=0;function i(){s(2,u=!1),t.length<=0&&N(T,t=[...ne(se)],t),s(0,o=t.at(0)),s(1,n="")}function f(){N(te,l=[{question:o,answer:n,date:new Date,type:"endless"},...l],l);let d=o.choices.find(g=>g.answer);d&&d.text===n?s(3,m+=1):s(3,m=0),s(2,u=!0),N(T,t=[...t.slice(1)],t)}function c(d){n=d,s(1,n)}return[o,n,u,m,i,f,c]}class Ne extends _e{constructor(e){super(),me(this,e,Qe,ye,ie,{})}}export{Ne as component};
