import{s as Z,e as g,c as v,b as S,f as b,o as x,i as C,n as D,p as J,t as A,a as $,d as T,g as q,h,m as O,j as L,a7 as ce,x as ee,r as K,l as ue,E as te,v as pe,w as me}from"../chunks/scheduler.tNOD27qj.js";import{S as B,i as U,c as F,b as R,m as V,t as y,a as w,d as X,g as Q,e as H,f as he}from"../chunks/index.BQUs_Z8c.js";import{e as P}from"../chunks/each.D6YF6ztN.js";import{I as de}from"../chunks/Icon.D6bRUyv0.js";import{a as N}from"../chunks/helper.CMGnaNZv.js";const be=[{number:"2",description:"Entweichen von Gas durch Druck oder durch chemische Reaktion"},{number:"3",description:"Entzündbarkeit von flüssigen Stoffen (Dämpfen) und Gasen oder selbsterhitzungsfähiger flüssiger Stoff"},{number:"4",description:"Entzündbarkeit von festen Stoffen oder selbsterhitzungsfähiger fester Stoff"},{number:"5",description:"Oxidierende (brandfördernde) Wirkung"},{number:"6",description:"Giftigkeit oder Ansteckungsgefahr"},{number:"7",description:"Radioaktivität"},{number:"8",description:"Ätzwirkung"},{number:"9",description:"an 1. Stelle: Umweltgefährdender Stoff; Verschiedene gefährliche Stoffe, an 2. oder 3. Stelle: Gefahr einer spontanen heftigen Reaktion"},{number:"0",description:"keine Zusatzgefahr"},{number:"X",description:"Reagiert auf gefährliche Weise mit Wasser (der Zahl vorangestellt)"}],j=[{number:"20",description:"reaktionsträges Gas",examples:["1981","3297","1983","3338","2422","1021","1013","1078","1015","3159"],type:"gaseous"},{number:"22",description:"tiefgekühltes Gas",examples:["1951","1977","2187","1913","1970","1963","3158","3136","2591"],type:"gaseous"},{number:"223",description:"tiefgekühltes brennbares Gas",examples:["1966","1961","1972","3312","3138","1038"],type:"gaseous"},{number:"225",description:"tiefgekühltes brandförderndes Gas",examples:["2201","3311","1003","1073"],type:"gaseous"},{number:"23",description:"brennbares Gas",examples:["1012","1912","1011","3354","1957","1036","3252","1057","3468","2044"],type:"gaseous"},{number:"236",description:"brennbares Gas, giftig",type:"gaseous",examples:[]},{number:"239",description:"brennbares Gas, das spontan zu heftiger Reaktion führen kann",examples:["1959","1085","2200","1081","1060","1087","1086","1860","1010","1041"],type:"gaseous"},{number:"25",description:"brandförderndes Gas",examples:["2451","1072","1950","1014","3156","3157","1950","1070"],type:"gaseous"},{number:"26",description:"giftiges Gas",examples:["1062","1955","3502","3169","2191","3162","1582","1967","1950","1581"],type:"gaseous"},{number:"265",description:"giftiges Gas, brandfördernd",examples:["1975","3306","1950","3310","3083","3303","1067","2901","1660","1017"],type:"gaseous"},{number:"268",description:"giftiges Gas, ätzend",examples:["1069","1589","1076","3308","1048","3057","2197","1005","1950","2420"],type:"gaseous"},{number:"28",description:"ätzendes Gas",examples:["3503","1950"],type:"gaseous"},{number:"30",description:"entzündbarer flüssiger Stoff (Flammpunkt von 23 °C bis einschl. 61 °C) oder entzündbarer flüssiger Stoff oder fester Stoff in geschmolzenem Zustand mit Flammpunkt über 61 °C, auf oder über seinen Flammpunkt erwärmt oder selbsterhitzungsfähiger flüssiger Stoff",examples:["1306","2850","1987","2286","2614","1999","1149","2707","1866","3295"],type:"liquid"},{number:"323",description:"entzündbarer flüssiger Stoff, der mit Wasser reagiert und entzündbare Gase bildet",examples:["3207","3148"],type:"liquid"},{number:"X323",description:"entzündbarer flüssiger Stoff, der mit Wasser gefährlich reagiert und entzündbare Gase bildet (Wasser darf nur im Einverständnis mit Sachverständigem verwendet werden)",examples:["1928","3399","3482","3399","3399","3398"],type:"liquid"},{number:"33",description:"leicht entzündbarer flüssiger Stoff (Flammpunkt unter 23 °C)",examples:["1108","1173","2536","1170","3065","2749","2377","1216","2391","2338"],type:"liquid"},{number:"333",description:"selbstentzündlicher (pyrophorer) flüssiger Stoff",examples:["2845","3194","1380","3392","3391"],type:"liquid"},{number:"X333",description:"selbstentzündlicher (pyrophorer) flüssiger Stoff, der mit Wasser gefährlich reagiert (Wasser darf nur im Einverständnis mit Sachverständigem verwendet werden)",examples:["2003","3052","1370","3394","3076","1366","3049","3051","3393","3053"],type:"liquid"},{number:"336",description:"leicht entzündbarer flüssiger Stoff, giftig",examples:["2772","2622","2776","2411","1100","1093","2787","1992","3350","2483"],type:"liquid"},{number:"338",description:"leicht entzündbarer flüssiger Stoff, ätzend",examples:["2535","1106","1296","1289","2924","2733","1154","3469","1160","2359"],type:"liquid"},{number:"X338",description:"leicht entzündbarer flüssiger Stoff, ätzend, der mit Wasser gefährlich reagiert (Wasser darf nur im Einverständnis mit Sachverständigem verwendet werden)",examples:["1183","1298","1162","2988","2985","1196","1717","1295","1242","1250"],type:"liquid"},{number:"339",description:"leicht entzündbarer flüssiger Stoff, der spontan zu heftiger Reaktion führen kann",examples:["1919","1218","1301","1302","1917","2277","1246","2352","2251","1167"],type:"liquid"},{number:"36",description:"entzündbarer flüssiger Stoff (Flammpunkt von 23 °C bis einschl. 61 °C), schwach giftig, oder selbsterhitzungsfähiger flüssiger Stoff, giftig",examples:["3494","2478","1992","3187","2841","1988","1986","3248","3184","2310"],type:"liquid"},{number:"362",description:"entzündbarer flüssiger Stoff, giftig, der mit Wasser reagiert und entzündbare Gase bildet",examples:["3130"],type:"liquid"},{number:"X362",description:"entzündbarer flüssiger Stoff, giftig, der mit Wasser gefährlich reagiert und entzündbare Gase bildet (Wasser darf nur im Einverständnis mit Sachverständigem verwendet werden)",type:"liquid",examples:[]},{number:"38",description:"entzündbarer flüssiger Stoff (Flammpunkt von 23 °C bis einschl. 61 °C), schwach ätzend, oder selbsterhitzungsfähiger flüssiger Stoff, ätzend",examples:["2610","1289","1198","2924","2529","2260","2684","3188","2733","2526"],type:"liquid"},{number:"382",description:"entzündbarer flüssiger Stoff, ätzend, der mit Wasser reagiert und entzündbare Gase bildet",examples:["3129","2965"],type:"liquid"},{number:"X382",description:"entzündbarer flüssiger Stoff, ätzend, der mit Wasser gefährlich reagiert und entzündbare Gase bildet (Wasser darf nur im Einverständnis mit Sachverständigem verwendet werden)",type:"liquid",examples:[]},{number:"39",description:"entzündbarer flüssiger Stoff, der spontan zu heftiger Reaktion führen kann",examples:["2227","2055","2618","2527","2283","2607","2348"],type:"liquid"},{number:"40",description:"entzündbarer oder selbsterhitzungsfähiger fester Stoff",examples:["3531","1343","1361","1379","1337","1312","1386","1334","1378","1385"],type:"solid"},{number:"423",description:"fester Stoff, der mit Wasser reagiert und entzündbare Gase bildet",examples:["2624","1401","1398","1394","1436","2830","1400","1409","1419","3078"],type:"solid"},{number:"X423",description:"entzündbarer fester Stoff, der mit Wasser gefährlich reagiert und entzündbare Gase bildet (Wasser darf nur im Einverständnis mit Sachverständigen verwendet werden)",examples:["1422","3397","3395","1410","1423","1426","3395","3402","1392","3395"],type:"solid"},{number:"43",description:"selbstentzündlicher (pyrophorer) fester Stoff",examples:["1383","3200","1855","1854"],type:"solid"},{number:"44",description:"entzündbarer fester Stoff, der sich bei erhöhter Temperatur in geschmolzenem Zustand befindet",examples:["2448","2304","3176"],type:"solid"},{number:"446",description:"entzündbarer fester Stoff, giftig, der sich bei erhöhter Temperatur in geschmolzenem Zustand befindet",examples:["2447"],type:"solid"},{number:"46",description:"entzündbarer oder selbsterhitzungsfähiger fester Stoff, giftig",examples:["1868","3128","2926","1321","3191","1381","1348","3179","1320","1571"],type:"solid"},{number:"462",description:"fester Stoff, giftig, der mit Wasser reagiert und entzündbare Gase bildet",examples:["1408","3134","1395"],type:"solid"},{number:"X462",description:"fester Stoff, giftig, der mit Wasser gefährlich reagiert und giftige Gase bildet (Wasser darf nur im Einverständnis mit Sachverständigen verwendet werden)",examples:["2011","2012","1433","2013","1432","1360","1397","1714"],type:"solid"},{number:"48",description:"entzündbarer oder selbsterhitzungsfähiger fester Stoff, ätzend",examples:["2925","3180","3126","3205","1431","3192","3206"],type:"solid"},{number:"482",description:"fester Stoff, ätzend, der mit Wasser reagiert und entzündbare Gase bildet",examples:["3131"],type:"solid"},{number:"X482",description:"fester Stoff, ätzend, der mit Wasser gefährlich reagiert und ätzende Gase bildet (Wasser darf nur im Einverständnis mit Sachverständigen verwendet werden)",type:"solid",examples:[]},{number:"50",description:"brandfördernder Stoff",examples:["3375","1942","1488","3215","1455","3378","1466","3375","3375","1503"],type:"oxidizing"},{number:"539",description:"entzündbares organisches Peroxid",examples:["3104","3102","3110","3109","3103","3108","3106","3105","3107","3101"],type:"oxidizing"},{number:"55",description:"stark brandfördernder Stoff",examples:["1491","3139","1504"],type:"oxidizing"},{number:"556",description:"stark brandfördernder Stoff, giftig",examples:["3099"],type:"oxidizing"},{number:"558",description:"stark brandfördernder Stoff, ätzend",examples:["1873","3098"],type:"oxidizing"},{number:"559",description:"stark brandfördernder Stoff, der spontan zu heftiger Reaktion führen kann",examples:["2015","1510"],type:"oxidizing"},{number:"56",description:"brandfördernder Stoff, giftig",examples:["1469","3099","1446","1500","2741","1449","1448","3087","1872","3406"],type:"oxidizing"},{number:"568",description:"brandfördernder Stoff, giftig, ätzend",examples:["2495","1746","1745"],type:"oxidizing"},{number:"58",description:"brandfördernder Stoff, ätzend",examples:["3085","1463","2014","3485","3098","1511","3149"],type:"oxidizing"},{number:"59",description:"brandfördernder Stoff, der spontan zu heftiger Reaktion führen kann",examples:["2426"],type:"oxidizing"},{number:"60",description:"giftiger oder schwach giftiger Stoff",examples:["1597","1657","2936","2781","1556","1572","3444","2662","2753","1884"],type:"toxic"},{number:"606",description:"ansteckungsgefährlicher Stoff",examples:["2900","2814","3291","2900","3373"],type:"toxic"},{number:"623",description:"giftiger flüssiger Stoff, der mit Wasser reagiert und entzündbare Gase bildet",examples:["3386","3490","3123","3385","3491"],type:"toxic"},{number:"63",description:"giftiger Stoff, entzündbar (Flammpunkt von 23 °C bis 61 °C)",examples:["3019","3025","3275","2903","3351","3279","2993","3009","3005","1916"],type:"toxic"},{number:"638",description:"giftiger Stoff, entzündbar (Flammpunkt von 23 °C bis 61 °C), ätzend",examples:["2744","3362","2743","3073","2742"],type:"toxic"},{number:"639",description:"giftiger Stoff, entzündbar (Flammpunkt von 23 °C bis 61 °C), der spontan zu heftiger Reaktion führen kann",examples:["1545","1251"],type:"toxic"},{number:"64",description:"giftiger fester Stoff, entzündbar oder selbsterhitzungsfähig",examples:["1567","3124","2930","2930"],type:"toxic"},{number:"642",description:"giftiger fester Stoff, der mit Wasser reagiert und entzündbare Gase bildet",examples:["3125","3048"],type:"toxic"},{number:"65",description:"giftiger Stoff, brandfördernd",examples:["3086","2727","3122"],type:"toxic"},{number:"66",description:"sehr giftiger Stoff",examples:["2779","1575","2026","1580","2317","3467","1557","3448","3413","2646"],type:"toxic"},{number:"663",description:"sehr giftiger Stoff, entzündbar (Flammpunkt nicht über 61 °C)",examples:["1244","2606","2487","3023","1051","3489","2295","3294","2903","2477"],type:"toxic"},{number:"664",description:"sehr giftiger fester Stoff, entzündbar oder selbsterhitzungsfähig",examples:["2930","3535"],type:"toxic"},{number:"665",description:"sehr giftiger Stoff, brandfördernd",examples:["3387","3388","3122"],type:"toxic"},{number:"668",description:"sehr giftiger Stoff, ätzend",examples:["1809","1722","3390","2928","3389","1889","2740","3246","2927","1595"],type:"toxic"},{number:"669",description:"sehr giftiger Stoff, der spontan zu heftiger Reaktion führen kann",examples:["1541"],type:"toxic"},{number:"68",description:"giftiger Stoff, ätzend",examples:["2927","2076","2748","3277","2746","1751","1737","3290","2017","3455"],type:"toxic"},{number:"69",description:"giftiger oder schwach giftiger Stoff, der spontan zu heftiger Reaktion führen kann",examples:["2522","2075"],type:"toxic"},{number:"70",description:"radioaktiver Stoff",examples:["3323","3326","2908","3332","3324","3328","3327","3322","2910","3331"],type:"radioactive"},{number:"768",description:"radioaktiver Stoff, giftig, ätzend",type:"radioactive",examples:[]},{number:"78",description:"radioaktiver Stoff, ätzend",examples:["2977","2978"],type:"radioactive"},{number:"80",description:"ätzender oder schwach ätzender Stoff",examples:["1773","2579","1908","2798","2682","1757","1775","2496","1807","2739"],type:"corrosive"},{number:"X80",description:"ätzender oder schwach ätzender Stoff, der mit Wasser gefährlich reagiert (Wasser darf nur im Einvernehmen mit Sachverständigen verwendet werden)",examples:["1753","1730","1766","1837","2434","1784","1808","1799","2987","1827"],type:"corrosive"},{number:"823",description:"ätzender flüssiger Stoff, der mit Wasser reagiert und entzündbare Gase bildet",examples:["3094"],type:"corrosive"},{number:"83",description:"ätzender oder schwach ätzender Stoff, entzündbar (Flammpunkt von 23 °C bis 61 °C)",examples:["1715","2248","2734","3470","2619","1779","2051","2789","2685","2826"],type:"corrosive"},{number:"X83",description:"ätzender oder schwach ätzender Stoff, entzündbar (Flammpunkt von 23 °C bis 61 °C), der mit Wasser gefährlich reagiert (Wasser darf nur mit Einverständnis eines Sachverständigen verwendet werden)",examples:["1747","1816","1767","2986"],type:"corrosive"},{number:"836",description:"ätzender oder schwach ätzender Stoff, entzündbar (Flammpunkt von 23 °C bis 61 °C), giftig",type:"corrosive",examples:[]},{number:"839",description:"ätzender oder schwach ätzender Stoff, entzündbar (Flammpunkt von 23 °C bis 61 °C), der spontan zu heftiger Reaktion führen kann",examples:["2218"],type:"corrosive"},{number:"X839",description:"ätzender oder schwach ätzender Stoff, entzündbar (Flammpunkt von 23 °C bis 61 °C), der spontan zu heftiger Reaktion führen kann und mit Wasser gefährlich reagiert (Wasser darf nur im Einvernehmen mit Sachverständigen verwendet werden)",examples:["1724"],type:"corrosive"},{number:"84",description:"ätzender fester Stoff, entzündbar oder selbsterhitzungsfähig",examples:["2921","3301","3095"],type:"corrosive"},{number:"842",description:"ätzender fester Stoff, der mit Wasser reagiert und entzündbare Gase bildet",examples:["3096"],type:"corrosive"},{number:"85",description:"ätzender oder schwach ätzender Stoff, brandfördernd",examples:["1802","3084"],type:"corrosive"},{number:"856",description:"ätzender oder schwach ätzender Stoff, brandfördernd und giftig",examples:["2032"],type:"corrosive"},{number:"86",description:"ätzender oder schwach ätzender Stoff, giftig",examples:["3421","2817","2923","2683","2030","1811","2809","1732","3471","1761"],type:"corrosive"},{number:"88",description:"stark ätzender Stoff",examples:["2801","2240","1759","1739","1760","2430","1905","1777","2699","1903"],type:"corrosive"},{number:"X88",description:"stark ätzender Stoff, der mit Wasser gefährlich reagiert (Wasser darf nur im Einvernehmen mit Sachverständigen verwendet werden)",examples:["2444","1828","1829","2692","1758","1834","1836"],type:"corrosive"},{number:"883",description:"stark ätzender Stoff, entzündbar (Flammpunkt von 23 °C bis 61 °C)",examples:["2734","2401","2920","2054","2604"],type:"corrosive"},{number:"884",description:"stark ätzender fester Stoff, entzündbar oder selbsterhitzungsfähig",examples:["2921"],type:"corrosive"},{number:"885",description:"stark ätzender Stoff, brandfördernd",examples:["1826","1796","2031","3093"],type:"corrosive"},{number:"886",description:"stark ätzender Stoff, giftig",examples:["2922","2029","2923","1052","1790","1786","1790","1744","3484"],type:"corrosive"},{number:"X886",description:"stark ätzender Stoff, giftig, der mit Wasser gefährlich reagiert (Wasser darf nur im Einvernehmen mit Sachverständigen verwendet werden)",examples:["2879","1831"],type:"corrosive"},{number:"89",description:"ätzender oder schwach ätzender Stoff, der spontan zu heftiger Reaktion führen kann",examples:["2531"],type:"corrosive"},{number:"90",description:"umweltgefährdender Stoff oder verschiedene gefährliche Stoffe",examples:["1990","2969","3245","2212","2990","3090","3152","3077","3082","3151"],type:"other"},{number:"99",description:"verschiedene gefährliche Stoffe in erwärmtem Zustand",examples:["3257","3258","3268","3257"],type:"other"}];function ge(o,e,t){const r=o.slice();return r[0]=e[t],r}function ve(o){var u,c;let e,t,r=((u=o[0])==null?void 0:u.number)+"",n,a,i,s=((c=o[0])==null?void 0:c.description)+"",l,d;return{c(){e=g("div"),t=g("h4"),n=A(r),a=$(),i=g("div"),l=A(s),d=$(),this.h()},l(p){e=v(p,"DIV",{class:!0});var f=S(e);t=v(f,"H4",{class:!0});var m=S(t);n=T(m,r),m.forEach(b),a=q(f),i=v(f,"DIV",{});var _=S(i);l=T(_,s),_.forEach(b),d=q(f),f.forEach(b),this.h()},h(){x(t,"class","font-bold"),x(e,"class","flex flex-row text-sm gap-1")},m(p,f){C(p,e,f),h(e,t),h(t,n),h(e,a),h(e,i),h(i,l),h(e,d)},p:D,d(p){p&&b(e)}}}function xe(o){let e,t=P(be),r=[];for(let n=0;n<t.length;n+=1)r[n]=ve(ge(o,t,n));return{c(){e=g("div");for(let n=0;n<r.length;n+=1)r[n].c();this.h()},l(n){e=v(n,"DIV",{class:!0});var a=S(e);for(let i=0;i<r.length;i+=1)r[i].l(a);a.forEach(b),this.h()},h(){x(e,"class","flex flex-col gap-2")},m(n,a){C(n,e,a);for(let i=0;i<r.length;i+=1)r[i]&&r[i].m(e,null)},p:D,i:D,o:D,d(n){n&&b(e),J(r,n)}}}class _e extends B{constructor(e){super(),U(this,e,null,xe,Z,{})}}function ze(o){let e,t,r="Welche Beschreibung passt zu dieser Gefahrentafel?",n,a,i,s=o[0].number+"",l,d,u,c=o[0].example+"",p;return{c(){e=g("div"),t=g("h2"),t.textContent=r,n=$(),a=g("div"),i=g("span"),l=A(s),d=$(),u=g("span"),p=A(c),this.h()},l(f){e=v(f,"DIV",{class:!0});var m=S(e);t=v(m,"H2",{class:!0,"data-svelte-h":!0}),O(t)!=="svelte-1kz5ytu"&&(t.textContent=r),n=q(m),a=v(m,"DIV",{class:!0});var _=S(a);i=v(_,"SPAN",{class:!0});var W=S(i);l=T(W,s),W.forEach(b),d=q(_),u=v(_,"SPAN",{class:!0});var z=S(u);p=T(z,c),z.forEach(b),_.forEach(b),m.forEach(b),this.h()},h(){x(t,"class","text-base lg:text-lg font-semibold text-center"),x(i,"class","border-b-2 border-black"),x(u,"class","border-t-2 border-black"),x(a,"class","flex flex-col text-center bg-orange-500 border-4 border-black text-black text-lg font-bold w-24 mx-auto rounded-md"),x(e,"class","flex flex-col gap-2")},m(f,m){C(f,e,m),h(e,t),h(e,n),h(e,a),h(a,i),h(i,l),h(a,d),h(a,u),h(u,p)},p(f,[m]){m&1&&s!==(s=f[0].number+"")&&L(l,s),m&1&&c!==(c=f[0].example+"")&&L(p,c)},i:D,o:D,d(f){f&&b(e)}}}function ke(o,e,t){let{question:r}=e;return o.$$set=n=>{"question"in n&&t(0,r=n.question)},[r]}class fe extends B{constructor(e){super(),U(this,e,ke,ze,Z,{question:0})}}function re(o,e,t){const r=o.slice();return r[4]=e[t],r}function ne(o){let e,t,r,n=!1,a,i,s=o[4].text+"",l,d,u,c,p;return u=ce(o[3][0]),{c(){e=g("label"),t=g("input"),a=$(),i=g("div"),l=A(s),d=$(),this.h()},l(f){e=v(f,"LABEL",{class:!0});var m=S(e);t=v(m,"INPUT",{class:!0,type:!0}),a=q(m),i=v(m,"DIV",{class:!0});var _=S(i);l=T(_,s),_.forEach(b),d=q(m),m.forEach(b),this.h()},h(){x(t,"class","radio radio-primary"),x(t,"type","radio"),t.__value=r=o[4].text,ee(t,t.__value),x(i,"class","text-sm lg:text-base"),x(e,"class","flex items-center gap-2 px-1.5 py-3 cursor-pointer border-2 border-base-200 rounded-md"),u.p(t)},m(f,m){C(f,e,m),h(e,t),t.checked=t.__value===o[0],h(e,a),h(e,i),h(i,l),h(e,d),c||(p=K(t,"change",o[2]),c=!0)},p(f,m){m&2&&r!==(r=f[4].text)&&(t.__value=r,ee(t,t.__value),n=!0),(n||m&3)&&(t.checked=t.__value===f[0]),m&2&&s!==(s=f[4].text+"")&&L(l,s)},d(f){f&&b(e),u.r(),c=!1,p()}}}function ye(o){let e,t,r,n,a;t=new fe({props:{question:o[1]}});let i=P(o[1].choices),s=[];for(let l=0;l<i.length;l+=1)s[l]=ne(re(o,i,l));return{c(){e=g("div"),F(t.$$.fragment),r=$(),n=g("div");for(let l=0;l<s.length;l+=1)s[l].c();this.h()},l(l){e=v(l,"DIV",{class:!0});var d=S(e);R(t.$$.fragment,d),r=q(d),n=v(d,"DIV",{class:!0});var u=S(n);for(let c=0;c<s.length;c+=1)s[c].l(u);u.forEach(b),d.forEach(b),this.h()},h(){x(n,"class","flex flex-col gap-3"),x(e,"class","flex flex-col gap-2")},m(l,d){C(l,e,d),V(t,e,null),h(e,r),h(e,n);for(let u=0;u<s.length;u+=1)s[u]&&s[u].m(n,null);a=!0},p(l,[d]){const u={};if(d&2&&(u.question=l[1]),t.$set(u),d&3){i=P(l[1].choices);let c;for(c=0;c<i.length;c+=1){const p=re(l,i,c);s[c]?s[c].p(p,d):(s[c]=ne(p),s[c].c(),s[c].m(n,null))}for(;c<s.length;c+=1)s[c].d(1);s.length=i.length}},i(l){a||(y(t.$$.fragment,l),a=!0)},o(l){w(t.$$.fragment,l),a=!1},d(l){l&&b(e),X(t),J(s,l)}}}function Se(o,e,t){let{question:r}=e,{answer:n=""}=e;const a=[[]];function i(){n=this.__value,t(0,n)}return o.$$set=s=>{"question"in s&&t(1,r=s.question),"answer"in s&&t(0,n=s.answer)},[n,r,i,a]}class we extends B{constructor(e){super(),U(this,e,Se,ye,Z,{question:1,answer:0})}}function ie(o,e,t){const r=o.slice();return r[2]=e[t],r}function $e(o){let e;return{c(){e=g("span"),this.h()},l(t){e=v(t,"SPAN",{class:!0}),S(e).forEach(b),this.h()},h(){x(e,"class","h-6 w-6 border border-primary rounded-full")},m(t,r){C(t,e,r)},i:D,o:D,d(t){t&&b(e)}}}function qe(o){let e,t;return e=new de({props:{class:"h-6 w-6 text-error border border-primary rounded-full",icon:"carbon:close-filled"}}),{c(){F(e.$$.fragment)},l(r){R(e.$$.fragment,r)},m(r,n){V(e,r,n),t=!0},i(r){t||(y(e.$$.fragment,r),t=!0)},o(r){w(e.$$.fragment,r),t=!1},d(r){X(e,r)}}}function We(o){let e,t;return e=new de({props:{class:"h-6 w-6 text-success border border-primary rounded-full",icon:"carbon:checkmark-filled"}}),{c(){F(e.$$.fragment)},l(r){R(e.$$.fragment,r)},m(r,n){V(e,r,n),t=!0},i(r){t||(y(e.$$.fragment,r),t=!0)},o(r){w(e.$$.fragment,r),t=!1},d(r){X(e,r)}}}function se(o){let e,t,r,n,a,i=o[2].text+"",s,l,d;const u=[We,qe,$e],c=[];function p(f,m){return f[2].answer?0:f[1]===f[2].text?1:2}return t=p(o),r=c[t]=u[t](o),{c(){e=g("div"),r.c(),n=$(),a=g("div"),s=A(i),l=$(),this.h()},l(f){e=v(f,"DIV",{class:!0});var m=S(e);r.l(m),n=q(m),a=v(m,"DIV",{class:!0});var _=S(a);s=T(_,i),_.forEach(b),l=q(m),m.forEach(b),this.h()},h(){x(a,"class","flex-1 text-sm lg:text-base"),x(e,"class","flex items-center gap-2 px-1.5 py-3 border-2 border-base-200 rounded-md")},m(f,m){C(f,e,m),c[t].m(e,null),h(e,n),h(e,a),h(a,s),h(e,l),d=!0},p(f,m){let _=t;t=p(f),t!==_&&(Q(),w(c[_],1,1,()=>{c[_]=null}),H(),r=c[t],r||(r=c[t]=u[t](f),r.c()),y(r,1),r.m(e,n)),(!d||m&1)&&i!==(i=f[2].text+"")&&L(s,i)},i(f){d||(y(r),d=!0)},o(f){w(r),d=!1},d(f){f&&b(e),c[t].d()}}}function Ce(o){let e,t,r,n,a;t=new fe({props:{question:o[0]}});let i=P(o[0].choices),s=[];for(let d=0;d<i.length;d+=1)s[d]=se(ie(o,i,d));const l=d=>w(s[d],1,1,()=>{s[d]=null});return{c(){e=g("div"),F(t.$$.fragment),r=$(),n=g("div");for(let d=0;d<s.length;d+=1)s[d].c();this.h()},l(d){e=v(d,"DIV",{class:!0});var u=S(e);R(t.$$.fragment,u),r=q(u),n=v(u,"DIV",{class:!0});var c=S(n);for(let p=0;p<s.length;p+=1)s[p].l(c);c.forEach(b),u.forEach(b),this.h()},h(){x(n,"class","flex flex-col gap-3"),x(e,"class","flex flex-col gap-2")},m(d,u){C(d,e,u),V(t,e,null),h(e,r),h(e,n);for(let c=0;c<s.length;c+=1)s[c]&&s[c].m(n,null);a=!0},p(d,[u]){const c={};if(u&1&&(c.question=d[0]),t.$set(c),u&3){i=P(d[0].choices);let p;for(p=0;p<i.length;p+=1){const f=ie(d,i,p);s[p]?(s[p].p(f,u),y(s[p],1)):(s[p]=se(f),s[p].c(),y(s[p],1),s[p].m(n,null))}for(Q(),p=i.length;p<s.length;p+=1)l(p);H()}},i(d){if(!a){y(t.$$.fragment,d);for(let u=0;u<i.length;u+=1)y(s[u]);a=!0}},o(d){w(t.$$.fragment,d),s=s.filter(Boolean);for(let u=0;u<s.length;u+=1)w(s[u]);a=!1},d(d){d&&b(e),X(t),J(s,d)}}}function Ee(o,e,t){let{question:r}=e,{answer:n}=e;return o.$$set=a=>{"question"in a&&t(0,r=a.question),"answer"in a&&t(1,n=a.answer)},[r,n]}class Ge extends B{constructor(e){super(),U(this,e,Ee,Ce,Z,{question:0,answer:1})}}function ae(o){let e,t,r,n;const a=[Ie,De],i=[];function s(l,d){return l[1]?0:1}return e=s(o),t=i[e]=a[e](o),{c(){t.c(),r=te()},l(l){t.l(l),r=te()},m(l,d){i[e].m(l,d),C(l,r,d),n=!0},p(l,d){let u=e;e=s(l),e===u?i[e].p(l,d):(Q(),w(i[u],1,1,()=>{i[u]=null}),H(),t=i[e],t?t.p(l,d):(t=i[e]=a[e](l),t.c()),y(t,1),t.m(r.parentNode,r))},i(l){n||(y(t),n=!0)},o(l){w(t),n=!1},d(l){l&&b(r),i[e].d(l)}}}function De(o){let e,t,r;function n(i){o[6](i)}let a={question:o[2]};return o[0]!==void 0&&(a.answer=o[0]),e=new we({props:a}),pe.push(()=>he(e,"answer",n)),{c(){F(e.$$.fragment)},l(i){R(e.$$.fragment,i)},m(i,s){V(e,i,s),r=!0},p(i,s){const l={};s&4&&(l.question=i[2]),!t&&s&1&&(t=!0,l.answer=i[0],me(()=>t=!1)),e.$set(l)},i(i){r||(y(e.$$.fragment,i),r=!0)},o(i){w(e.$$.fragment,i),r=!1},d(i){X(e,i)}}}function Ie(o){let e,t;return e=new Ge({props:{question:o[2],answer:o[0]}}),{c(){F(e.$$.fragment)},l(r){R(e.$$.fragment,r)},m(r,n){V(e,r,n),t=!0},p(r,n){const a={};n&4&&(a.question=r[2]),n&1&&(a.answer=r[0]),e.$set(a)},i(r){t||(y(e.$$.fragment,r),t=!0)},o(r){w(e.$$.fragment,r),t=!1},d(r){X(e,r)}}}function Fe(o){let e,t="Wählen",r,n;return{c(){e=g("button"),e.textContent=t,this.h()},l(a){e=v(a,"BUTTON",{class:!0,"data-svelte-h":!0}),O(e)!=="svelte-12kpvid"&&(e.textContent=t),this.h()},h(){x(e,"class","btn btn-primary btn-block lg:w-1/2")},m(a,i){C(a,e,i),r||(n=K(e,"click",o[4]),r=!0)},p:D,d(a){a&&b(e),r=!1,n()}}}function Re(o){let e,t="Weiter",r,n;return{c(){e=g("button"),e.textContent=t,this.h()},l(a){e=v(a,"BUTTON",{class:!0,"data-svelte-h":!0}),O(e)!=="svelte-86puo6"&&(e.textContent=t),this.h()},h(){x(e,"class","btn btn-primary btn-block lg:w-1/2")},m(a,i){C(a,e,i),r||(n=K(e,"click",o[3]),r=!0)},p:D,d(a){a&&b(e),r=!1,n()}}}function oe(o){let e,t;return e=new _e({}),{c(){F(e.$$.fragment)},l(r){R(e.$$.fragment,r)},m(r,n){V(e,r,n),t=!0},i(r){t||(y(e.$$.fragment,r),t=!0)},o(r){w(e.$$.fragment,r),t=!1},d(r){X(e,r)}}}function Ve(o){var M,Y;let e,t,r,n="ADR-Quiz",a,i,s,l,d,u,c=o[1]&&o[0]!==((Y=(M=o[2])==null?void 0:M.choices.find(le))==null?void 0:Y.text),p,f=o[2]&&ae(o);function m(k,G){return k[1]?Re:Fe}let _=m(o),W=_(o),z=c&&oe();return{c(){e=$(),t=g("div"),r=g("h1"),r.textContent=n,a=$(),f&&f.c(),i=$(),s=g("div"),l=g("div"),d=$(),W.c(),u=$(),z&&z.c(),this.h()},l(k){ue("svelte-gx5uad",document.head).forEach(b),e=q(k),t=v(k,"DIV",{});var E=S(t);r=v(E,"H1",{class:!0,"data-svelte-h":!0}),O(r)!=="svelte-1bxn5r7"&&(r.textContent=n),a=q(E),f&&f.l(E),i=q(E),s=v(E,"DIV",{class:!0});var I=S(s);l=v(I,"DIV",{}),S(l).forEach(b),d=q(I),W.l(I),I.forEach(b),u=q(E),z&&z.l(E),E.forEach(b),this.h()},h(){document.title="ADR-Quiz - HFLÜ-Trainer",x(r,"class","text-3xl text-center font-semibold mb-2"),x(s,"class","flex justify-center m-4")},m(k,G){C(k,e,G),C(k,t,G),h(t,r),h(t,a),f&&f.m(t,null),h(t,i),h(t,s),h(s,l),h(s,d),W.m(s,null),h(t,u),z&&z.m(t,null),p=!0},p(k,[G]){var E,I;k[2]?f?(f.p(k,G),G&4&&y(f,1)):(f=ae(k),f.c(),y(f,1),f.m(t,i)):f&&(Q(),w(f,1,1,()=>{f=null}),H()),_===(_=m(k))&&W?W.p(k,G):(W.d(1),W=_(k),W&&(W.c(),W.m(s,null))),G&7&&(c=k[1]&&k[0]!==((I=(E=k[2])==null?void 0:E.choices.find(le))==null?void 0:I.text)),c?z?G&7&&y(z,1):(z=oe(),z.c(),y(z,1),z.m(t,null)):z&&(Q(),w(z,1,1,()=>{z=null}),H())},i(k){p||(y(f),y(z),p=!0)},o(k){w(f),w(z),p=!1},d(k){k&&(b(e),b(t)),f&&f.d(),W.d(),z&&z.d()}}}const le=o=>o.answer;function Xe(o,e,t){let r,n=N(j).filter(c=>c.examples.length>0).map(s),a="",i=!1;function s(c){const p=N(j.filter(f=>f.number!==c.number));return{number:c.number,choices:N([{text:c.description,answer:!0},{text:p.at(0).description,answer:!1},{text:p.at(1).description,answer:!1}]),example:N(c.examples).at(0)}}function l(){t(1,i=!1),t(0,a=""),n.length>0?t(5,n=[...n.slice(1)]):t(5,n=N(j).filter(c=>c.examples.length>0).map(s))}function d(){t(1,i=!0)}function u(c){a=c,t(0,a)}return o.$$.update=()=>{o.$$.dirty&32&&t(2,r=n.at(0))},[a,i,r,l,d,n,u]}class Pe extends B{constructor(e){super(),U(this,e,Xe,Ve,Z,{})}}export{Pe as component};
