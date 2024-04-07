import{s as _e,a as $,e as d,t as k,l as ve,f,g as y,c as u,b as v,m as Q,d as w,o as i,i as ee,h as r,p as pe,n as xe}from"../chunks/scheduler.Niau2b56.js";import{S as be,i as ke,t as te,a as ae,c as ce,b as de,m as ue,d as fe}from"../chunks/index.GoLXg0II.js";import{e as le}from"../chunks/each.D6YF6ztN.js";import{s as we}from"../chunks/helper.CMGnaNZv.js";import{m as Fe}from"../chunks/data.DjoZ6nhe.js";import{I as he}from"../chunks/Icon.DhrcX_6o.js";import{b as $e}from"../chunks/paths.B50lJnOX.js";function oe(h,e,a){const t=h.slice();return t[1]=e[a],t}function ye(h){let e,a;return e=new he({props:{class:"text-error",icon:"material-symbols:error"}}),{c(){ce(e.$$.fragment)},l(t){de(e.$$.fragment,t)},m(t,p){ue(e,t,p),a=!0},i(t){a||(te(e.$$.fragment,t),a=!0)},o(t){ae(e.$$.fragment,t),a=!1},d(t){fe(e,t)}}}function De(h){let e,a;return e=new he({props:{class:"text-success",icon:"material-symbols:check-circle"}}),{c(){ce(e.$$.fragment)},l(t){de(e.$$.fragment,t)},m(t,p){ue(e,t,p),a=!0},i(t){a||(te(e.$$.fragment,t),a=!0)},o(t){ae(e.$$.fragment,t),a=!1},d(t){fe(e,t)}}}function ie(h){let e,a,t=h[1].name+"",p,D,l,x=h[1].desc+"",V,z;return{c(){e=d("a"),a=d("h2"),p=k(t),D=$(),l=d("p"),V=k(x),z=$(),this.h()},l(m){e=u(m,"A",{href:!0,class:!0});var g=v(e);a=u(g,"H2",{class:!0});var _=v(a);p=w(_,t),_.forEach(f),D=y(g),l=u(g,"P",{});var P=v(l);V=w(P,x),P.forEach(f),z=y(g),g.forEach(f),this.h()},h(){i(a,"class","text-xl text-primary"),i(e,"href",h[1].href),i(e,"class","btn flex flex-col flex-nowrap h-full w-full p-2")},m(m,g){ee(m,e,g),r(e,a),r(a,p),r(e,D),r(e,l),r(l,V),r(e,z)},p:xe,d(m){m&&f(e)}}}function ze(h){let e,a,t,p="HFLÜ-Trainer",D,l,x,V="Trainer zum Vorbereiten auf die hessische Feuerwehrleistungsübung.",z,m,g,_,P="hessischen Landesfeuerwehrschule",W,C,j,re=Fe.date+"",G,K,T,N,b,R,F,ne="LocalStorage",U,E,J,q,B,M,S,L;const me=[De,ye],O=[];function ge(s,I){return typeof window<"u"&&we("localStorage")?0:1}q=ge(),B=O[q]=me[q](h);let A=le(h[0]),o=[];for(let s=0;s<A.length;s+=1)o[s]=ie(oe(h,A,s));return{c(){e=$(),a=d("div"),t=d("h1"),t.textContent=p,D=$(),l=d("div"),x=d("div"),x.textContent=V,z=$(),m=d("div"),g=k(`
        Die Fragen stammen aus dem Fragenkatalog der `),_=d("a"),_.textContent=P,W=k(`.
        `),C=d("div"),j=k("Stand: "),G=k(re),K=$(),T=d("div"),N=$(),b=d("div"),R=k("Dieser Trainer verwendet statische Seiten und benutzt wenn möglich den "),F=d("a"),F.textContent=ne,U=k(` des
            `),E=d("span"),J=k(`Browsers.
                `),B.c(),M=$(),S=d("div");for(let s=0;s<o.length;s+=1)o[s].c();this.h()},l(s){ve("svelte-kfxyv2",document.head).forEach(f),e=y(s),a=u(s,"DIV",{});var n=v(a);t=u(n,"H1",{class:!0,"data-svelte-h":!0}),Q(t)!=="svelte-1xd8i0s"&&(t.textContent=p),D=y(n),l=u(n,"DIV",{class:!0});var c=v(l);x=u(c,"DIV",{class:!0,"data-svelte-h":!0}),Q(x)!=="svelte-11s08bg"&&(x.textContent=V),z=y(c),m=u(c,"DIV",{class:!0}),v(m).forEach(f),g=w(c,`
        Die Fragen stammen aus dem Fragenkatalog der `),_=u(c,"A",{class:!0,href:!0,"data-svelte-h":!0}),Q(_)!=="svelte-1c2jll4"&&(_.textContent=P),W=w(c,`.
        `),C=u(c,"DIV",{class:!0});var X=v(C);j=w(X,"Stand: "),G=w(X,re),X.forEach(f),K=y(c),T=u(c,"DIV",{class:!0}),v(T).forEach(f),N=y(c),b=u(c,"DIV",{class:!0});var H=v(b);R=w(H,"Dieser Trainer verwendet statische Seiten und benutzt wenn möglich den "),F=u(H,"A",{class:!0,href:!0,"data-svelte-h":!0}),Q(F)!=="svelte-pcvgdy"&&(F.textContent=ne),U=w(H,` des
            `),E=u(H,"SPAN",{class:!0});var Y=v(E);J=w(Y,`Browsers.
                `),B.l(Y),Y.forEach(f),H.forEach(f),c.forEach(f),M=y(n),S=u(n,"DIV",{class:!0});var se=v(S);for(let Z=0;Z<o.length;Z+=1)o[Z].l(se);se.forEach(f),n.forEach(f),this.h()},h(){document.title="Startseite - HFLÜ-Trainer",i(t,"class","text-3xl text-center font-semibold"),i(x,"class","font-semibold"),i(m,"class","divider"),i(_,"class","link link-primary"),i(_,"href","https://hlfs.hessen.de"),i(C,"class","text-sm"),i(T,"class","divider"),i(F,"class","link link-primary"),i(F,"href","https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"),i(E,"class","inline-flex items-center gap-2"),i(b,"class","text-sm"),i(l,"class","mt-4 p-4 text-center text-lg bg-base-200 rounded-md"),i(S,"class","grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2")},m(s,I){ee(s,e,I),ee(s,a,I),r(a,t),r(a,D),r(a,l),r(l,x),r(l,z),r(l,m),r(l,g),r(l,_),r(l,W),r(l,C),r(C,j),r(C,G),r(l,K),r(l,T),r(l,N),r(l,b),r(b,R),r(b,F),r(b,U),r(b,E),r(E,J),O[q].m(E,null),r(a,M),r(a,S);for(let n=0;n<o.length;n+=1)o[n]&&o[n].m(S,null);L=!0},p(s,[I]){if(I&1){A=le(s[0]);let n;for(n=0;n<A.length;n+=1){const c=oe(s,A,n);o[n]?o[n].p(c,I):(o[n]=ie(c),o[n].c(),o[n].m(S,null))}for(;n<o.length;n+=1)o[n].d(1);o.length=A.length}},i(s){L||(te(B),L=!0)},o(s){ae(B),L=!1},d(s){s&&(f(e),f(a)),O[q].d(),pe(o,s)}}}function Ce(h){return[[{name:"Training",desc:"Beantworte Fragen aus dem Fragenkatalog nach Wahl.",href:"/training"},{name:"Quiz",desc:"Beantworte zufällige Fragen aus dem Fragenkatalog.",href:"/quiz"},{name:"ADR-Quiz",desc:"Beantworte Fragen zu Gefahrgütern und deren Kennzeichnung.",href:"/adrquiz"},{name:"PDF-Quiz",desc:"Erstelle Fragen- und Antwortenbogen als PDF.",href:"/pdfquiz"},{name:"Durchsuchen",desc:"Fragenkatalog nach Fragen durchsuchen",href:"/search"},{name:"Statistik",desc:"Informationen über Fragenkatalog",href:"/quizstats"},{name:"Verlauf",desc:"Historie der beantworteten Fragen",href:"/history"}].map(a=>({...a,href:$e+a.href}))]}class qe extends be{constructor(e){super(),ke(this,e,Ce,ze,_e,{})}}export{qe as component};