import{s as F,a as q,e as v,h as G,d as m,c as C,b as k,f as x,o as j,i as p,j as E,k as g,m as J,q as Q,n as B,p as H,t as K,g as M,l as O,r as R}from"../chunks/scheduler.CNkPwobW.js";import{S as W,i as X,b as $,e as P,t as b,g as D,c as Y,a as Z,m as ee,d as te}from"../chunks/index.RwQZZxsy.js";import{e as I}from"../chunks/each.D6YF6ztN.js";import{b as A}from"../chunks/paths.D-6-MloR.js";import{P as le}from"../chunks/public.C2OzITeI.js";import{b as L}from"../chunks/stores.B5uCne11.js";import{I as oe}from"../chunks/Icon.BaWJvdsO.js";function N(f,e,n){const l=f.slice();return l[3]=e[n],l}function S(f,e,n){const l=f.slice();return l[6]=e[n],l}function ne(f){let e,n="Keine Einträge.";return{c(){e=v("div"),e.textContent=n,this.h()},l(l){e=k(l,"DIV",{class:!0,"data-svelte-h":!0}),j(e)!=="svelte-dlkm9c"&&(e.textContent=n),this.h()},h(){p(e,"class","text-center")},m(l,a){E(l,e,a)},p:B,i:B,o:B,d(l){l&&m(e)}}}function se(f){let e,n,l=I(f[0].sort(U).reduce(T,[])),a=[];for(let t=0;t<l.length;t+=1)a[t]=z(N(f,l,t));const _=t=>$(a[t],1,1,()=>{a[t]=null});return{c(){e=v("div");for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){e=k(t,"DIV",{class:!0});var r=x(e);for(let s=0;s<a.length;s+=1)a[s].l(r);r.forEach(m),this.h()},h(){p(e,"class","flex flex-col gap-2")},m(t,r){E(t,e,r);for(let s=0;s<a.length;s+=1)a[s]&&a[s].m(e,null);n=!0},p(t,r){if(r&3){l=I(t[0].sort(U).reduce(T,[]));let s;for(s=0;s<l.length;s+=1){const c=N(t,l,s);a[s]?(a[s].p(c,r),b(a[s],1)):(a[s]=z(c),a[s].c(),b(a[s],1),a[s].m(e,null))}for(D(),s=l.length;s<a.length;s+=1)_(s);P()}},i(t){if(!n){for(let r=0;r<l.length;r+=1)b(a[r]);n=!0}},o(t){a=a.filter(Boolean);for(let r=0;r<a.length;r+=1)$(a[r]);n=!1},d(t){t&&m(e),H(a,t)}}}function w(f){let e,n,l,a,_,t=f[6].question+"",r,s,c,d,u;l=new oe({props:{class:"w-5 h-5",icon:"ep:remove-filled"}});function i(){return f[2](f[6])}return{c(){e=v("div"),n=v("button"),Y(l.$$.fragment),a=q(),_=v("a"),r=K(t),this.h()},l(o){e=k(o,"DIV",{class:!0});var h=x(e);n=k(h,"BUTTON",{class:!0});var V=x(n);Z(l.$$.fragment,V),V.forEach(m),a=C(h),_=k(h,"A",{class:!0,target:!0,href:!0});var y=x(_);r=M(y,t),y.forEach(m),h.forEach(m),this.h()},h(){p(n,"class","text-error"),p(_,"class","flex-1"),p(_,"target","_blank"),p(_,"href",s=A+"/search#"+f[6].id),p(e,"class","pl-2 flex items-center gap-1")},m(o,h){E(o,e,h),g(e,n),ee(l,n,null),g(e,a),g(e,_),g(_,r),c=!0,d||(u=R(n,"click",i),d=!0)},p(o,h){f=o,(!c||h&1)&&t!==(t=f[6].question+"")&&O(r,t),(!c||h&1&&s!==(s=A+"/search#"+f[6].id))&&p(_,"href",s)},i(o){c||(b(l.$$.fragment,o),c=!0)},o(o){$(l.$$.fragment,o),c=!1},d(o){o&&m(e),te(l),d=!1,u()}}}function z(f){let e,n,l=f[3].catalog+"",a,_,t,r,s=I(f[3].questions),c=[];for(let u=0;u<s.length;u+=1)c[u]=w(S(f,s,u));const d=u=>$(c[u],1,1,()=>{c[u]=null});return{c(){e=v("div"),n=v("span"),a=K(l),_=q();for(let u=0;u<c.length;u+=1)c[u].c();t=q(),this.h()},l(u){e=k(u,"DIV",{});var i=x(e);n=k(i,"SPAN",{class:!0});var o=x(n);a=M(o,l),o.forEach(m),_=C(i);for(let h=0;h<c.length;h+=1)c[h].l(i);t=C(i),i.forEach(m),this.h()},h(){p(n,"class","font-semibold")},m(u,i){E(u,e,i),g(e,n),g(n,a),g(e,_);for(let o=0;o<c.length;o+=1)c[o]&&c[o].m(e,null);g(e,t),r=!0},p(u,i){if((!r||i&1)&&l!==(l=u[3].catalog+"")&&O(a,l),i&3){s=I(u[3].questions);let o;for(o=0;o<s.length;o+=1){const h=S(u,s,o);c[o]?(c[o].p(h,i),b(c[o],1)):(c[o]=w(h),c[o].c(),b(c[o],1),c[o].m(e,t))}for(D(),o=s.length;o<c.length;o+=1)d(o);P()}},i(u){if(!r){for(let i=0;i<s.length;i+=1)b(c[i]);r=!0}},o(u){c=c.filter(Boolean);for(let i=0;i<c.length;i+=1)$(c[i]);r=!1},d(u){u&&m(e),H(c,u)}}}function ae(f){let e,n,l,a="Lesezeichen",_,t,r,s;document.title="Lesezeichen - "+le;const c=[se,ne],d=[];function u(i,o){return i[0].length>0?0:1}return t=u(f),r=d[t]=c[t](f),{c(){e=q(),n=v("div"),l=v("h1"),l.textContent=a,_=q(),r.c(),this.h()},l(i){G("svelte-t3lnxm",document.head).forEach(m),e=C(i),n=k(i,"DIV",{});var h=x(n);l=k(h,"H1",{class:!0,"data-svelte-h":!0}),j(l)!=="svelte-u1h6an"&&(l.textContent=a),_=C(h),r.l(h),h.forEach(m),this.h()},h(){p(l,"class","text-3xl text-center font-semibold mb-2")},m(i,o){E(i,e,o),E(i,n,o),g(n,l),g(n,_),d[t].m(n,null),s=!0},p(i,[o]){let h=t;t=u(i),t===h?d[t].p(i,o):(D(),$(d[h],1,1,()=>{d[h]=null}),P(),r=d[t],r?r.p(i,o):(r=d[t]=c[t](i),r.c()),b(r,1),r.m(n,null))},i(i){s||(b(r),s=!0)},o(i){$(r),s=!1},d(i){i&&(m(e),m(n)),d[t].d()}}}function T(f,e){let n=f.find(l=>l.catalog===e.catalog);return n?n.questions=[...n.questions,e]:e.catalog&&(f=[...f,{catalog:e.catalog,questions:[e]}]),f}const U=(f,e)=>f.id>e.id;function re(f,e,n){let l;J(f,L,t=>n(0,l=t));function a(t){Q(L,l=l.filter(r=>r.id!==t),l)}return[l,a,t=>a(t.id)]}class me extends W{constructor(e){super(),X(this,e,re,ae,F,{})}}export{me as component};
