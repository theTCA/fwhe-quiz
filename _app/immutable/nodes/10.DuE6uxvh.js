import{s as be,e as k,c as $,b as w,f as _,o as d,i as N,p as $e,I as Ce,a as R,t as z,g as A,d as K,h as b,r as X,j as ne,n as se,l as qe,m as Z,k as ue,J as Ee,q as le,u as we,v as Ie}from"../chunks/scheduler.Niau2b56.js";import{S as ve,i as ke,t as q,g as F,e as J,a as S,c as G,b as L,m as W,d as M,f as De}from"../chunks/index.GoLXg0II.js";import{t as re,c as te,f as ye}from"../chunks/stores.DC3zV9ml.js";import{c as ce}from"../chunks/data.DjoZ6nhe.js";import{B as Ve,Q as Se,a as Te}from"../chunks/QuestionDisplay.Dg4vDtGR.js";import{e as fe,P as Pe}from"../chunks/public.DSIcp1HN.js";import{I as oe}from"../chunks/Icon.DhrcX_6o.js";import{a as he}from"../chunks/helper.CMGnaNZv.js";import{Q as Be}from"../chunks/QuestionHelp.BYcYgXqo.js";function _e(o,e,t){const n=o.slice();return n[6]=e[t],n}function Oe(o){let e,t,n,s,l;t=new oe({props:{icon:"carbon:play-filled-alt"}});function r(){return o[3](o[6])}return{c(){e=k("button"),G(t.$$.fragment),this.h()},l(i){e=$(i,"BUTTON",{class:!0});var a=w(e);L(t.$$.fragment,a),a.forEach(_),this.h()},h(){d(e,"class","btn btn-primary btn-outline btn-square")},m(i,a){N(i,e,a),W(t,e,null),n=!0,s||(l=X(e,"click",r),s=!0)},p(i,a){o=i},i(i){n||(q(t.$$.fragment,i),n=!0)},o(i){S(t.$$.fragment,i),n=!1},d(i){i&&_(e),M(t),s=!1,l()}}}function Qe(o){let e,t,n;return t=new oe({props:{class:"btn-square p-2.5",icon:"mdi:check"}}),{c(){e=k("div"),G(t.$$.fragment),this.h()},l(s){e=$(s,"DIV",{class:!0});var l=w(e);L(t.$$.fragment,l),l.forEach(_),this.h()},h(){d(e,"class","text-success")},m(s,l){N(s,e,l),W(t,e,null),n=!0},p:se,i(s){n||(q(t.$$.fragment,s),n=!0)},o(s){S(t.$$.fragment,s),n=!1},d(s){s&&_(e),M(t)}}}function Ne(o){let e,t,n;return{c(){e=k("progress"),this.h()},l(s){e=$(s,"PROGRESS",{class:!0,max:!0}),w(e).forEach(_),this.h()},h(){d(e,"class","progress"),e.value=t=o[6].questions.length,d(e,"max",n=o[6].length)},m(s,l){N(s,e,l)},p(s,l){l&1&&t!==(t=s[6].questions.length)&&(e.value=t),l&1&&n!==(n=s[6].length)&&d(e,"max",n)},d(s){s&&_(e)}}}function Re(o){let e,t,n;return{c(){e=k("progress"),this.h()},l(s){e=$(s,"PROGRESS",{class:!0,max:!0}),w(e).forEach(_),this.h()},h(){d(e,"class","progress progress-success"),e.value=t=o[6].questions.length,d(e,"max",n=o[6].length)},m(s,l){N(s,e,l)},p(s,l){l&1&&t!==(t=s[6].questions.length)&&(e.value=t),l&1&&n!==(n=s[6].length)&&d(e,"max",n)},d(s){s&&_(e)}}}function me(o){let e,t,n,s,l,r,i=o[6].name+"",a,f,m,E,g,T,v,P,I;const j=[Qe,Oe],B=[];function Q(h,y){return h[6].questions.length===h[6].length?0:1}t=Q(o),n=B[t]=j[t](o);function O(h,y){return h[6].questions.length===h[6].length?Re:Ne}let u=O(o),c=u(o);g=new oe({props:{icon:"material-symbols:refresh"}});function p(){return o[4](o[6])}return{c(){e=k("div"),n.c(),s=R(),l=k("div"),r=k("h3"),a=z(i),f=R(),c.c(),m=R(),E=k("button"),G(g.$$.fragment),T=R(),this.h()},l(h){e=$(h,"DIV",{class:!0});var y=w(e);n.l(y),s=A(y),l=$(y,"DIV",{class:!0});var H=w(l);r=$(H,"H3",{class:!0});var U=w(r);a=K(U,i),U.forEach(_),f=A(H),c.l(H),H.forEach(_),m=A(y),E=$(y,"BUTTON",{class:!0});var D=w(E);L(g.$$.fragment,D),D.forEach(_),T=A(y),y.forEach(_),this.h()},h(){d(r,"class","font-semibold text-left break-words min-w-0"),d(l,"class","flex-1"),d(E,"class","btn btn-ghost text-primary"),d(e,"class","bg-base-200 p-2 rounded-md flex flex-row items-center gap-2")},m(h,y){N(h,e,y),B[t].m(e,null),b(e,s),b(e,l),b(l,r),b(r,a),b(l,f),c.m(l,null),b(e,m),b(e,E),W(g,E,null),b(e,T),v=!0,P||(I=X(E,"click",p),P=!0)},p(h,y){o=h;let H=t;t=Q(o),t===H?B[t].p(o,y):(F(),S(B[H],1,1,()=>{B[H]=null}),J(),n=B[t],n?n.p(o,y):(n=B[t]=j[t](o),n.c()),q(n,1),n.m(e,s)),(!v||y&1)&&i!==(i=o[6].name+"")&&ne(a,i),u===(u=O(o))&&c?c.p(o,y):(c.d(1),c=u(o),c&&(c.c(),c.m(l,null)))},i(h){v||(q(n),q(g.$$.fragment,h),v=!0)},o(h){S(n),S(g.$$.fragment,h),v=!1},d(h){h&&_(e),B[t].d(),c.d(),M(g),P=!1,I()}}}function Ae(o){let e,t,n=fe(o[0]),s=[];for(let r=0;r<n.length;r+=1)s[r]=me(_e(o,n,r));const l=r=>S(s[r],1,1,()=>{s[r]=null});return{c(){e=k("div");for(let r=0;r<s.length;r+=1)s[r].c();this.h()},l(r){e=$(r,"DIV",{class:!0});var i=w(e);for(let a=0;a<s.length;a+=1)s[a].l(i);i.forEach(_),this.h()},h(){d(e,"class","grid grid-cols-1 lg:grid-cols-3 gap-2")},m(r,i){N(r,e,i);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(e,null);t=!0},p(r,[i]){if(i&7){n=fe(r[0]);let a;for(a=0;a<n.length;a+=1){const f=_e(r,n,a);s[a]?(s[a].p(f,i),q(s[a],1)):(s[a]=me(f),s[a].c(),q(s[a],1),s[a].m(e,null))}for(F(),a=n.length;a<s.length;a+=1)l(a);J()}},i(r){if(!t){for(let i=0;i<n.length;i+=1)q(s[i]);t=!0}},o(r){s=s.filter(Boolean);for(let i=0;i<s.length;i+=1)S(s[i]);t=!1},d(r){r&&_(e),$e(s,r)}}}function Ue(o,e,t){let{chapters:n}=e;const s=Ce();function l(f){s("select",{name:f})}function r(f){s("reset",{name:f})}const i=f=>l(f.name),a=f=>r(f.name);return o.$$set=f=>{"chapters"in f&&t(0,n=f.chapters)},[n,l,r,i,a]}class He extends ve{constructor(e){super(),ke(this,e,Ue,Ae,be,{chapters:0})}}function je(o){let e,t,n,s,l=o[4].name+"",r,i,a,f,m,E,g,T,v,P,I,j="Zurück",B,Q,O,u,c,p=o[1]&&pe(o),h=o[1]&&de(o);function y(C,V){return C[3]?Je:C[2]===""?Fe:Me}let H=y(o),U=H(o),D=o[1]&&o[3]&&ge(o);return{c(){e=k("div"),t=k("div"),n=k("div"),s=k("h2"),r=z(l),i=R(),p&&p.c(),a=R(),f=k("div"),m=k("progress"),T=R(),h&&h.c(),v=R(),P=k("div"),I=k("button"),I.textContent=j,B=R(),U.c(),Q=R(),D&&D.c(),this.h()},l(C){e=$(C,"DIV",{});var V=w(e);t=$(V,"DIV",{class:!0});var Y=w(t);n=$(Y,"DIV",{class:!0});var x=w(n);s=$(x,"H2",{class:!0});var ae=w(s);r=K(ae,l),ae.forEach(_),i=A(x),p&&p.l(x),x.forEach(_),a=A(Y),f=$(Y,"DIV",{class:!0});var ie=w(f);m=$(ie,"PROGRESS",{class:!0,max:!0}),w(m).forEach(_),ie.forEach(_),Y.forEach(_),T=A(V),h&&h.l(V),v=A(V),P=$(V,"DIV",{class:!0});var ee=w(P);I=$(ee,"BUTTON",{class:!0,"data-svelte-h":!0}),Z(I)!=="svelte-1120u75"&&(I.textContent=j),B=A(ee),U.l(ee),ee.forEach(_),Q=A(V),D&&D.l(V),V.forEach(_),this.h()},h(){d(s,"class","text-sm flex-1 text-center text-primary font-semibold mb-2"),d(n,"class","relative flex justify-between items-center w-full"),d(m,"class","progress progress-primary"),m.value=E=o[4].questions.length,d(m,"max",g=o[4].length),d(f,"class","w-[80%] mx-auto"),d(t,"class","mb-3"),d(I,"class","btn btn-error btn-outline"),d(P,"class","grid grid-cols-2 gap-2")},m(C,V){N(C,e,V),b(e,t),b(t,n),b(n,s),b(s,r),b(n,i),p&&p.m(n,null),b(t,a),b(t,f),b(f,m),b(e,T),h&&h.m(e,null),b(e,v),b(e,P),b(P,I),b(P,B),U.m(P,null),b(e,Q),D&&D.m(e,null),O=!0,u||(c=X(I,"click",o[9]),u=!0)},p(C,V){(!O||V&16)&&l!==(l=C[4].name+"")&&ne(r,l),C[1]?p?(p.p(C,V),V&2&&q(p,1)):(p=pe(C),p.c(),q(p,1),p.m(n,null)):p&&(F(),S(p,1,1,()=>{p=null}),J()),(!O||V&16&&E!==(E=C[4].questions.length))&&(m.value=E),(!O||V&16&&g!==(g=C[4].length))&&d(m,"max",g),C[1]?h?(h.p(C,V),V&2&&q(h,1)):(h=de(C),h.c(),q(h,1),h.m(e,v)):h&&(F(),S(h,1,1,()=>{h=null}),J()),H===(H=y(C))&&U?U.p(C,V):(U.d(1),U=H(C),U&&(U.c(),U.m(P,null))),C[1]&&C[3]?D?(D.p(C,V),V&10&&q(D,1)):(D=ge(C),D.c(),q(D,1),D.m(e,null)):D&&(F(),S(D,1,1,()=>{D=null}),J())},i(C){O||(q(p),q(h),q(D),O=!0)},o(C){S(p),S(h),S(D),O=!1},d(C){C&&_(e),p&&p.d(),h&&h.d(),U.d(),D&&D.d(),u=!1,c()}}}function Ge(o){let e,t,n="Fortschritt",s,l,r,i,a,f,m=o[0].length+"",E,g,T,v,P,I,j="Abschnitte",B,Q,O;return Q=new He({props:{chapters:o[0]}}),Q.$on("select",o[10]),Q.$on("reset",o[11]),{c(){e=k("div"),t=k("h2"),t.textContent=n,s=R(),l=k("div"),r=k("span"),i=z(o[6]),a=z(`\r
            von\r
            `),f=k("span"),E=z(m),g=z(`\r
            Abschnitten abgeschlossen`),T=R(),v=k("progress"),P=R(),I=k("div"),I.textContent=j,B=R(),G(Q.$$.fragment),this.h()},l(u){e=$(u,"DIV",{class:!0});var c=w(e);t=$(c,"H2",{class:!0,"data-svelte-h":!0}),Z(t)!=="svelte-1bdup3j"&&(t.textContent=n),s=A(c),l=$(c,"DIV",{class:!0});var p=w(l);r=$(p,"SPAN",{class:!0});var h=w(r);i=K(h,o[6]),h.forEach(_),a=K(p,`\r
            von\r
            `),f=$(p,"SPAN",{class:!0});var y=w(f);E=K(y,m),y.forEach(_),g=K(p,`\r
            Abschnitten abgeschlossen`),p.forEach(_),T=A(c),v=$(c,"PROGRESS",{class:!0,max:!0}),w(v).forEach(_),c.forEach(_),P=A(u),I=$(u,"DIV",{class:!0,"data-svelte-h":!0}),Z(I)!=="svelte-e7sjom"&&(I.textContent=j),B=A(u),L(Q.$$.fragment,u),this.h()},h(){d(t,"class","text-lg font-semibold"),d(r,"class","font-bold"),d(f,"class","font-bold"),d(l,"class","text-sm"),d(v,"class","progress progress-primary"),v.value=o[5],d(v,"max",ye.length),d(e,"class","mb-2"),d(I,"class","divider font-bold")},m(u,c){N(u,e,c),b(e,t),b(e,s),b(e,l),b(l,r),b(r,i),b(l,a),b(l,f),b(f,E),b(l,g),b(e,T),b(e,v),N(u,P,c),N(u,I,c),N(u,B,c),W(Q,u,c),O=!0},p(u,c){(!O||c&64)&&ne(i,u[6]),(!O||c&1)&&m!==(m=u[0].length+"")&&ne(E,m),(!O||c&32)&&(v.value=u[5]);const p={};c&1&&(p.chapters=u[0]),Q.$set(p)},i(u){O||(q(Q.$$.fragment,u),O=!0)},o(u){S(Q.$$.fragment,u),O=!1},d(u){u&&(_(e),_(P),_(I),_(B)),M(Q,u)}}}function pe(o){let e,t;return e=new Ve({props:{class:"absolute right-2 lg:right-0",question:o[1]}}),{c(){G(e.$$.fragment)},l(n){L(e.$$.fragment,n)},m(n,s){W(e,n,s),t=!0},p(n,s){const l={};s&2&&(l.question=n[1]),e.$set(l)},i(n){t||(q(e.$$.fragment,n),t=!0)},o(n){S(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function de(o){let e,t,n,s;const l=[We,Le],r=[];function i(a,f){return a[3]?0:1}return t=i(o),n=r[t]=l[t](o),{c(){e=k("div"),n.c(),this.h()},l(a){e=$(a,"DIV",{class:!0});var f=w(e);n.l(f),f.forEach(_),this.h()},h(){d(e,"class","mb-2")},m(a,f){N(a,e,f),r[t].m(e,null),s=!0},p(a,f){let m=t;t=i(a),t===m?r[t].p(a,f):(F(),S(r[m],1,1,()=>{r[m]=null}),J(),n=r[t],n?n.p(a,f):(n=r[t]=l[t](a),n.c()),q(n,1),n.m(e,null))},i(a){s||(q(n),s=!0)},o(a){S(n),s=!1},d(a){a&&_(e),r[t].d()}}}function Le(o){let e,t,n;function s(r){o[12](r)}let l={question:o[1],showCatalog:!1};return o[2]!==void 0&&(l.answer=o[2]),e=new Se({props:l}),we.push(()=>De(e,"answer",s)),{c(){G(e.$$.fragment)},l(r){L(e.$$.fragment,r)},m(r,i){W(e,r,i),n=!0},p(r,i){const a={};i&2&&(a.question=r[1]),!t&&i&4&&(t=!0,a.answer=r[2],Ie(()=>t=!1)),e.$set(a)},i(r){n||(q(e.$$.fragment,r),n=!0)},o(r){S(e.$$.fragment,r),n=!1},d(r){M(e,r)}}}function We(o){let e,t;return e=new Te({props:{question:o[1],answer:o[2],showCatalog:!1}}),{c(){G(e.$$.fragment)},l(n){L(e.$$.fragment,n)},m(n,s){W(e,n,s),t=!0},p(n,s){const l={};s&2&&(l.question=n[1]),s&4&&(l.answer=n[2]),e.$set(l)},i(n){t||(q(e.$$.fragment,n),t=!0)},o(n){S(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function Me(o){let e,t="Wählen",n,s;return{c(){e=k("button"),e.textContent=t,this.h()},l(l){e=$(l,"BUTTON",{class:!0,"data-svelte-h":!0}),Z(e)!=="svelte-yp6av2"&&(e.textContent=t),this.h()},h(){d(e,"class","btn btn-primary")},m(l,r){N(l,e,r),n||(s=X(e,"click",o[7]),n=!0)},p:se,d(l){l&&_(e),n=!1,s()}}}function Fe(o){let e,t="Wählen",n,s;return{c(){e=k("button"),e.textContent=t,this.h()},l(l){e=$(l,"BUTTON",{class:!0,"data-svelte-h":!0}),Z(e)!=="svelte-7i55ch"&&(e.textContent=t),this.h()},h(){d(e,"class","btn btn-primary btn-outline")},m(l,r){N(l,e,r),n||(s=X(e,"click",o[7]),n=!0)},p:se,d(l){l&&_(e),n=!1,s()}}}function Je(o){let e,t="Weiter",n,s;return{c(){e=k("button"),e.textContent=t,this.h()},l(l){e=$(l,"BUTTON",{class:!0,"data-svelte-h":!0}),Z(e)!=="svelte-l40w4u"&&(e.textContent=t),this.h()},h(){d(e,"class","btn btn-success")},m(l,r){N(l,e,r),n||(s=X(e,"click",o[8]),n=!0)},p:se,d(l){l&&_(e),n=!1,s()}}}function ge(o){let e,t,n;return t=new Be({props:{question:o[1]}}),{c(){e=k("div"),G(t.$$.fragment),this.h()},l(s){e=$(s,"DIV",{class:!0});var l=w(e);L(t.$$.fragment,l),l.forEach(_),this.h()},h(){d(e,"class","mt-3")},m(s,l){N(s,e,l),W(t,e,null),n=!0},p(s,l){const r={};l&2&&(r.question=s[1]),t.$set(r)},i(s){n||(q(t.$$.fragment,s),n=!0)},o(s){S(t.$$.fragment,s),n=!1},d(s){s&&_(e),M(t)}}}function Ze(o){let e,t,n,s="Training",l,r,i,a;document.title="Training - "+Pe;const f=[Ge,je],m=[];function E(g,T){return g[4]?1:0}return r=E(o),i=m[r]=f[r](o),{c(){e=R(),t=k("div"),n=k("h1"),n.textContent=s,l=R(),i.c(),this.h()},l(g){qe("svelte-1p7uwad",document.head).forEach(_),e=A(g),t=$(g,"DIV",{});var v=w(t);n=$(v,"H1",{class:!0,"data-svelte-h":!0}),Z(n)!=="svelte-yrvv02"&&(n.textContent=s),l=A(v),i.l(v),v.forEach(_),this.h()},h(){d(n,"class","text-3xl text-center font-semibold mb-2")},m(g,T){N(g,e,T),N(g,t,T),b(t,n),b(t,l),m[r].m(t,null),a=!0},p(g,[T]){let v=r;r=E(g),r===v?m[r].p(g,T):(F(),S(m[v],1,1,()=>{m[v]=null}),J(),i=m[r],i?i.p(g,T):(i=m[r]=f[r](g),i.c()),q(i,1),i.m(t,null))},i(g){a||(q(i),a=!0)},o(g){S(i),a=!1},d(g){g&&(_(e),_(t)),m[r].d()}}}function ze(o,e,t){let n,s,l,r,i;ue(o,te,u=>t(0,r=u)),ue(o,re,u=>t(14,i=u)),r.length<=0&&le(te,r=ce.map(u=>({name:u.name,questions:[],length:u.questions.length})),r);let a=[],f,m="",E=!1;Ee(()=>{i&&I(new CustomEvent("",{detail:{name:i}}))});function g(){if(t(3,E=!0),!f)return;let u=f.choices.find(c=>c.answer);u&&l&&a&&(u.text===m?(r.find(c=>c.name===(l==null?void 0:l.name)).questions=[...l.questions,f.id],te.set(r)):a=[...a,f]),t(4,l)}function T(){!a||a.length<=0||(a=[...a.slice(1)],a.length>0?(t(1,f=a==null?void 0:a.at(0)),t(2,m=""),t(3,E=!1)):v())}function v(){t(4,l=null),t(2,m=""),t(3,E=!1),a=[],t(1,f=void 0),le(re,i="",i)}function P(){l&&(l.questions.length===l.length&&B(l.name),a=Q(l),t(1,f=a==null?void 0:a.at(0)))}function I(u){if(!u.detail.name){t(4,l=null);return}let c=r.find(p=>p.name===u.detail.name);if(!c){t(4,l=null);return}t(4,l=c),le(re,i=l==null?void 0:l.name,i),P()}function j(u){u.detail.name&&B(u.detail.name)}function B(u){let c=r.find(p=>p.name===u);c&&(c.questions=[],te.set(r))}function Q(u){var p;if(!u)return null;let c=(p=ce.find(h=>h.name===u.name))==null?void 0:p.questions;return!c||(c==null?void 0:c.length)<=0?null:(c=c.filter(h=>!u.questions.includes(h.id)).map(h=>({...h,choices:he(h.choices)})),he(c))}function O(u){m=u,t(2,m)}return o.$$.update=()=>{o.$$.dirty&1&&t(6,n=r.reduce((u,c)=>c.questions.length===c.length?u+1:u,0)),o.$$.dirty&1&&t(5,s=r.reduce((u,c)=>u+c.questions.length,0))},t(4,l=null),[r,f,m,E,l,s,n,g,T,v,I,j,O]}class rt extends ve{constructor(e){super(),ke(this,e,ze,Ze,be,{})}}export{rt as component};
