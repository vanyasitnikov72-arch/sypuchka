import{s as We,g as De,p as pt}from"./index-BdBexX1n.js";const d=96,y=144,F=8,lt=26,It=(t,e)=>e*d+t,Q={spread:3,minCells:0,maxSpan:24,tilt:{slope:.3,bend:12}};function ma(t,e,s){if(!Q.tilt)return s-e<Q.maxSpan;const a=new Float64Array(d),n=new Uint16Array(d);for(const M of t){const p=M%d;a[p]+=(M-p)/d,n[p]++}let r=0,i=0,l=0,c=0,o=0;const f=new Float64Array(d);for(let M=0;M<d;M++){if(!n[M])return!1;f[M]=a[M]/n[M],r++,i+=M,l+=f[M],c+=M*M,o+=M*f[M]}const u=(r*o-i*l)/(r*c-i*i),h=(l-u*i)/r;if(Math.abs(u)>Q.tilt.slope)return!1;let $=0;for(let M=0;M<d;M++)$=Math.max($,Math.abs(f[M]-(u*M+h)));return $<=Q.tilt.bend}function Ot(){return{grid:new Uint8Array(d*y),shade:new Uint8Array(d*y),flash:new Uint8Array(d*y)}}function Ne(t,e,s){const{grid:a,shade:n,flash:r}=t;let i=0;for(let l=y-2;l>=0;l--)for(let c=0;c<d;c++){const o=s?d-1-c:c,f=l*d+o,u=a[f];if(!u||r[f])continue;let h=f+d;if(a[h]){let $=-1;const M=e()<.5?-1:1;for(let p=1;p<=Q.spread&&$<0;p++)for(const m of[M,-M]){const g=o+m*p;if(g<0||g>=d)continue;let V=!0;for(let C=1;C<p;C++)if(a[f+m*C]){V=!1;break}if(V&&!a[h+m*p]){$=h+m*p;break}}if($<0)continue;h=$}a[h]=u,n[h]=n[f],a[f]=0,i++}return i}function Ma(t){const{grid:e,flash:s}=t,a=new Uint8Array(d*y),n=[],r=[];for(let i=0;i<y;i++){const l=i*d,c=e[l];if(!c||a[l]||s[l])continue;const o=[];let f=!1,u=i,h=i;for(r.push(l),a[l]=1;r.length;){const $=r.pop();o.push($);const M=$%d;M===d-1&&(f=!0);const p=($-M)/d;p<u&&(u=p),p>h&&(h=p);const m=[M>0?$-1:-1,M<d-1?$+1:-1,$-d,$+d,M>0?$-d-1:-1,M<d-1?$-d+1:-1,M>0?$+d-1:-1,M<d-1?$+d+1:-1];for(const g of m)g<0||g>=d*y||a[g]||e[g]!==c||s[g]||(a[g]=1,r.push(g))}f&&o.length>=Q.minCells&&ma(o,u,h)&&n.push(o)}return n}function ga(t,e=.6){const{grid:s,flash:a}=t,n=new Uint8Array(d*y),r=[],i=[],l=[];for(let c=0;c<d*y;c++){const o=s[c];if(!o||n[c]||a[c])continue;const f=[];let u=d,h=-1,$=y,M=-1,p=0,m=0;for(l.push(c),n[c]=1;l.length;){const P=l.pop();f.push(P);const H=P%d,X=(P-H)/d;(H<u||H===u&&X>p)&&(u=H,p=X),(H>h||H===h&&X>m)&&(h=H,m=X),X<$&&($=X),X>M&&(M=X);const Xt=[H>0?P-1:-1,H<d-1?P+1:-1,P-d,P+d,H>0?P-d-1:-1,H<d-1?P-d+1:-1,H>0?P+d-1:-1,H<d-1?P+d+1:-1];for(const J of Xt)J<0||J>=d*y||n[J]||s[J]!==o||a[J]||(n[J]=1,l.push(J))}const g={color:o,cells:f,minX:u,maxX:h,minY:$,maxY:M,leftY:p,rightY:m},V=u===0&&h===d-1,C=Q.tilt?M-$<=(h-u)*Q.tilt.slope+Q.tilt.bend*2:M-$<Q.maxSpan;V&&!C?i.push(g):!V&&C&&h-u+1>=d*e&&r.push(g)}return{almost:r,uneven:i}}const $t=255,ya=(t,e)=>e.some(s=>t.shade[s]===$t);function va(t,e,s,a,n=0,r=2){const i=e*d;t.grid.copyWithin(0,i),t.shade.copyWithin(0,i),t.flash.copyWithin(0,i);const l=y-e,c=[],o=d/r;for(let p=0;p<r;p++){const m=6+Math.floor(a()*6),g=Math.floor(p*o)+6,V=Math.floor((p+1)*o)-6-m,C=g+Math.floor(a()*Math.max(1,V-g+1));c.push([C,C+m-1])}const f=new Set;for(const[p,m]of c)for(let g=Math.max(0,p-1);g<=Math.min(d-1,m+1);g++)f.add(t.grid[(l-1)*d+g]);const u=Array.from({length:s},(p,m)=>m+1).filter(p=>!f.has(p)),h=u.length?u[Math.floor(a()*u.length)]:1+Math.floor(a()*s),$=()=>{const p=1+Math.floor(a()*(s-1));return p>=h?p+1:p},M=c.map($);for(let p=l;p<y;p++)for(let m=0;m<d;m++){const g=p*d+m,V=c.findIndex(([C,P])=>m>=C-(p&1)&&m<=P+(p>>1&1));t.grid[g]=V<0?h:M[V],t.shade[g]=Math.floor(a()*$t),t.flash[g]=0}n&&a()<n&&(t.shade[l*d+4+Math.floor(a()*(d-8))]=$t)}const Ut=t=>Math.max(4,8-Math.floor(t/15)),xa=3;function ba(t){for(let e=0;e<lt*d;e++)if(t.grid[e]&&!t.flash[e])return!0;return!1}const cs=[[[0,0]],[[0,0],[1,0]],[[0,0],[1,0],[2,0]],[[0,0],[1,0],[2,0],[3,0]],[[0,0],[1,0],[0,1],[1,1]],[[0,0],[1,0],[2,0],[1,1]],[[0,0],[0,1],[0,2],[1,2]],[[1,0],[1,1],[1,2],[0,2]],[[1,0],[2,0],[0,1],[1,1]],[[0,0],[1,0],[1,1],[2,1]],[[0,0],[1,0],[0,1]],[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]]],Cs=()=>({shape:[[0,0],[1,0]],color:1,fire:!0});function wa(t){for(let e=0;e<d*y;e++)if(t.grid[e]&&!t.flash[e])return Math.floor(e/d);return y}function Es(t,e){const s=new Set(e.cells.map(([n])=>e.x+n)),a=[];for(let n=Math.max(0,e.y);n<y;n++)for(const r of s)t.grid[It(r,n)]&&a.push(It(r,n));return a}function mt(t){return{w:Math.max(...t.map(([e])=>e))+1,h:Math.max(...t.map(([,e])=>e))+1}}function js(t){const{h:e}=mt(t),s=t.map(([a,n])=>[e-1-n,a]);return mt(s).h>3?null:s}function Ye(t,e){let s=cs[Math.floor(t()*cs.length)];for(let a=Math.floor(t()*4);a>0;a--)s=js(s)??s;return{shape:s,color:1+Math.floor(t()*e)}}function La(t){const e=[];for(const[s,a]of t)for(let n=0;n<F;n++)for(let r=0;r<F;r++)e.push([s*F+r,a*F+n]);return e}function ka(t,e){const s={...e};for(;Fs(t,s);)s.y++;return s.y}function Oe(t,e){const{h:s}=mt(t.shape);return{piece:t,cells:La(t.shape),x:e,y:lt-s*F-1,vy:.6}}function Fs(t,e){for(const[s,a]of e.cells){const n=e.y+a+1;if(n>=y||n>=0&&t.grid[It(e.x+s,n)])return!1}return!0}const Qa=t=>t?Math.max(3,Math.round(10/Math.abs(t))):0;function Sa(t,e,s){for(const[a,n]of e.cells){const r=e.x+a+s,i=e.y+n;if(r<0||r>=d||i>=0&&t.grid[It(r,i)])return!1}return!0}function Rs(t,e,s){if(!Fs(t,e))return!1;e.y++,e.fell=(e.fell??0)+1;const a=Qa(s);if(a&&e.fell%a===0){const n=Math.sign(s);Sa(t,e,n)&&(e.x+=n)}return!0}function Vs(t,e,s){for(const[a,n]of e.cells){const r=e.y+n;if(r<0)continue;const i=It(e.x+a,r);t.grid[i]=e.piece.color,t.shade[i]=Math.floor(s()*$t)}}const qs="sand.muted";let k=null,yt=De(qs)==="1";const Aa=()=>yt;function Ha(){yt=!yt,We(qs,yt?"1":"0")}function ft(){if(!k){const t=window.AudioContext??window.webkitAudioContext;if(!t)return;k=new t}k.state==="suspended"&&k.resume()}function ds(){k?.state==="running"&&k.suspend()}function fs(){k?.state==="suspended"&&k.resume()}function j(t,e,s,a,n=0,r){if(!k||yt)return;const i=k.currentTime+n,l=k.createOscillator(),c=k.createGain();l.type=s,l.frequency.setValueAtTime(t,i),r&&l.frequency.exponentialRampToValueAtTime(r,i+e),c.gain.setValueAtTime(1e-4,i),c.gain.exponentialRampToValueAtTime(a,i+.01),c.gain.exponentialRampToValueAtTime(1e-4,i+e),l.connect(c).connect(k.destination),l.start(i),l.stop(i+e+.02)}function O(t,e,s,a=0){if(!k||yt)return;const n=k.currentTime+a,r=Math.floor(k.sampleRate*t),i=k.createBuffer(1,r,k.sampleRate),l=i.getChannelData(0);for(let u=0;u<r;u++)l[u]=(Math.random()*2-1)*(Math.random()<.3?1:.3);const c=k.createBufferSource();c.buffer=i;const o=k.createBiquadFilter();o.type="bandpass",o.frequency.value=s,o.Q.value=.8;const f=k.createGain();f.gain.setValueAtTime(1e-4,n),f.gain.exponentialRampToValueAtTime(e,n+t*.15),f.gain.exponentialRampToValueAtTime(1e-4,n+t),c.connect(o).connect(f).connect(k.destination),c.start(n),c.stop(n+t+.02)}let jt=null,Ft=null;function Za(t,e=260){if(!k)return;if(!jt){const a=k.sampleRate*2,n=k.createBuffer(1,a,k.sampleRate),r=n.getChannelData(0);for(let l=0;l<a;l++)r[l]=Math.random()*2-1;const i=k.createBufferSource();i.buffer=n,i.loop=!0,Ft=k.createBiquadFilter(),Ft.type="bandpass",Ft.Q.value=.9,jt=k.createGain(),jt.gain.value=0,i.connect(Ft).connect(jt).connect(k.destination),i.start()}const s=k.currentTime;jt.gain.setTargetAtTime(yt?0:t*t*.22,s,.5),Ft.frequency.setTargetAtTime(e+t*e*2,s,.8)}const Rt=[261.63,293.66,329.63,349.23,392,440,493.88,523.25,587.33,659.25,698.46,783.99,880,987.77,1046.5],L={pick:()=>j(520,.05,"sine",.05),mend:()=>{[523.25,659.25,783.99,1046.5].forEach((t,e)=>j(t,.16,"triangle",.05,e*.08)),O(.4,.04,3200)},refill:()=>{O(.3,.05,2600),j(660,.08,"triangle",.04,.02),j(880,.08,"triangle",.04,.11),j(1175,.12,"triangle",.035,.2)},rotate:()=>j(700,.05,"triangle",.06),drop:()=>{O(.45,.16,1800),j(120,.12,"sine",.12,0,70)},clear:t=>{const e=Math.min(t-1,Rt.length-3);O(.6,.12,900),j(Rt[e],.35,"triangle",.14),j(Rt[e+2],.35,"triangle",.1,.06),t>=3&&j(Rt[e]*2,.4,"sine",.06,.12)},over:()=>{j(392,.3,"triangle",.1),j(311,.3,"triangle",.1,.2),j(233,.6,"triangle",.1,.4)},thunder:()=>{O(1.8,.35,120),j(48,1.4,"sine",.3,0,32),O(.9,.2,260,.25)},fire:()=>{O(.9,.22,900),O(.5,.12,2400,.1),j(90,.7,"sawtooth",.05,0,60)},rise:()=>{j(70,.6,"sine",.25,0,50),j(105,.5,"triangle",.08,.05,80),O(.7,.2,500)},crack:()=>{for(let t=0;t<4;t++)O(.05,.4,3500+t*600,t*.06);j(1900,.08,"square",.04,.05)},shatter:()=>{O(.5,.35,4200);for(let t=0;t<9;t++)j(2200+Math.random()*2600,.25+Math.random()*.3,"sine",.05,t*.045);O(1.4,.18,900,.15)},record:()=>[0,2,4,7,9,11].forEach((t,e)=>j(Rt[t+3],.25,"triangle",.1,e*.08))},D=(t,e=!1)=>`<svg class="ic" viewBox="0 0 32 32" fill="${e?"currentColor":"none"}" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t}</svg>`,Ta={soundOn:D('<path d="M5 12.5h4.5L16 7v18l-6.5-5.5H5Z" fill="currentColor"/><path d="M20.5 11.5a6.5 6.5 0 0 1 0 9M24 8a11 11 0 0 1 0 16"/>'),soundOff:D('<path d="M5 12.5h4.5L16 7v18l-6.5-5.5H5Z" fill="currentColor"/><path d="M21 12.5l7 7M28 12.5l-7 7"/>'),rotate:D('<path d="M24.5 11.5A9.5 9.5 0 1 0 25.5 18"/><path d="M25.5 5.5v6.5H19"/>'),chevron:D('<path d="M19.5 7 10.5 16l9 9"/>'),lock:D('<rect x="7" y="14" width="18" height="13" rx="3"/><path d="M11 14v-4a5 5 0 0 1 10 0v4"/>'),snow:D('<path d="M16 3v26M4.7 9.5l22.6 13M4.7 22.5l22.6-13M12 5l4 4 4-4M12 27l4-4 4 4M4 13.5l5.5-1.5L8 6.5M28 18.5l-5.5 1.5 1.5 5.5M4 18.5l5.5 1.5L8 25.5M28 13.5 22.5 12 24 6.5"/>'),pearl:D('<path d="M4 20c2-8 22-8 24 0-3 6-21 6-24 0Z"/><circle cx="16" cy="14" r="5.5" fill="currentColor" stroke="none"/><circle cx="14.2" cy="12.2" r="1.6" fill="#fff" stroke="none"/>'),leaf:D('<path d="M6 26C6 13 14 6 27 5c0 13-7 21-21 21Z" fill="currentColor" stroke="none"/><path d="M7 25 20 12" stroke="#0b2a1a"/>'),ad:D('<rect x="4" y="7" width="24" height="18" rx="4"/><path d="M14 12v8l6-4Z" fill="currentColor"/>'),home:D('<path d="M5 15 16 5l11 10"/><path d="M8 13v13h6v-7h4v7h6V13"/>'),help:D('<circle cx="16" cy="16" r="12"/><path d="M12.2 12.5a4 4 0 1 1 5.6 3.7c-1.2.6-1.8 1.4-1.8 2.8"/><circle cx="16" cy="23" r="0.6" fill="currentColor"/>'),moon:D('<path d="M20 4.5a11.5 11.5 0 1 0 7.5 18A9.5 9.5 0 0 1 20 4.5Z" fill="currentColor" stroke="none"/>'),sun:D('<circle cx="16" cy="16" r="6.5" fill="currentColor" stroke="none"/><path d="M16 3v3.5M16 25.5V29M3 16h3.5M25.5 16H29M6.8 6.8l2.5 2.5M22.7 22.7l2.5 2.5M6.8 25.2l2.5-2.5M22.7 9.3l2.5-2.5"/>')};function G(t){return Ta[t]??""}const $e=t=>`<svg viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden="true">${t}</svg>`;function Ca(){const t=[8,34,60,140,166,192].map(e=>`<circle class="rivet" cx="${e}" cy="-1" r="2.2"/>`).join("");return $e(`
    <defs>
      <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffe2a0"/><stop offset=".45" stop-color="#c8902f"/><stop offset="1" stop-color="#6e4a17"/>
      </linearGradient>
    </defs>
    <rect class="brass" x="-6" y="-8" width="212" height="13" rx="4" fill="url(#brass)"/>
    <path class="engrave" d="M-2 3 H202"/>
    ${t}
    <g transform="translate(100 -1.5)">
      <ellipse class="brass" rx="9" ry="7.5" fill="url(#brass)"/>
      <circle class="gem" r="3.4"/>
      <path class="brass-wing" d="M-9 0 Q-22 -6 -30 0 Q-22 -2 -9 3 Z M9 0 Q22 -6 30 0 Q22 -2 9 3 Z" fill="url(#brass)"/>
    </g>
    <path class="brass" fill="url(#brass)" d="M-7 270 Q-7 307 22 307 H178 Q207 307 207 270 L200 270 Q200 299 178 299 H22 Q0 299 0 270 Z"/>
    <path class="brass" fill="url(#brass)" d="M-7 262 h8 v14 h-8 Z M199 262 h8 v14 h-8 Z"/>
    <circle class="rivet" cx="-3" cy="269" r="2"/><circle class="rivet" cx="203" cy="269" r="2"/>
    <path class="engrave" d="M30 303 H170"/>`)}function Ea(){const t=[10,24,36,58,76,98,120,138,156,172,190].map((s,a)=>{const n=9+a*5%4*5+(a%4===2?8:0),r=2.6+a%3;return`<path class="ice" d="M${s-r} 3 Q${s-r*.3} ${3+n*.6} ${s} ${3+n} Q${s+r*.3} ${3+n*.6} ${s+r} 3Z"/>`}).join(""),e=(s,a,n)=>`<g class="frost" transform="translate(${s} ${a})">${[0,60,120].map(r=>`<path transform="rotate(${r})" d="M${-n} 0 H${n} M${n*.5} 0 l${n*.25} ${-n*.25} M${n*.5} 0 l${n*.25} ${n*.25} M${-n*.5} 0 l${-n*.25} ${-n*.25} M${-n*.5} 0 l${-n*.25} ${n*.25}"/>`).join("")}</g>`;return $e(`
    <rect class="ice-rim" x="-5" y="-5" width="210" height="9" rx="3"/>
    ${t}
    <path class="snow" d="M-8 -1 Q-8 -9 4 -8 Q12 -13 26 -9 Q40 -13 54 -8 Q70 -12 84 -7 Q100 -12 118 -7 Q136 -12 150 -7 Q168 -11 182 -7 Q196 -11 205 -5 Q210 0 205 3 H-5 Q-9 2 -8 -1 Z"/>
    <path class="snow-shade" d="M-6 1 Q40 -4 100 0 Q160 -4 204 1 L205 3 H-5Z"/>
    ${e(12,272,9)}${e(188,276,8)}${e(8,248,5)}${e(192,252,5)}${e(26,288,4)}
    <path class="snow" d="M-10 302 Q-10 290 4 292 Q14 299 40 300 H160 Q186 299 196 292 Q210 290 210 302 Q210 307 196 307 H4 Q-10 307 -10 302 Z"/>
  `)}function ja(){const t=[30,72,128,170].map(a=>`<path class="node" d="M${a} -7 V5"/>`).join(""),e=(a,n,r,i=1)=>`<g transform="translate(${a} ${n}) rotate(${r}) scale(${i})"><path class="leaf" d="M0 0 Q7 -7 16 0 Q7 7 0 0Z"/><path class="leaf-vein" d="M1 0 H14"/></g>`,s=(a,n,r)=>`<g class="flower" transform="translate(${a} ${n}) scale(${r})">${[0,72,144,216,288].map(i=>`<ellipse transform="rotate(${i}) translate(0 -5)" rx="3.2" ry="5"/>`).join("")}<circle class="core" r="2.4"/></g>`;return $e(`
    <rect class="bamboo" x="-8" y="-7" width="216" height="12" rx="6"/>
    <path class="bamboo-hi" d="M-4 -4 H204"/>
    ${t}
    <path class="lash" d="M0 -6 l3 10 M3 -6 l3 10 M6 -6 l3 10 M191 -6 l3 10 M194 -6 l3 10 M197 -6 l3 10"/>
    <path class="vine" d="M6 -4 C-10 30 8 60 -3 100 S6 170 -2 220 S4 262 -4 290"/>
    <path class="vine" d="M180 -2 C196 20 204 40 202 70 S194 110 203 140"/>
    ${e(-2,18,150)}${e(2,44,20)}${e(-3,78,160,1.1)}${e(0,112,30)}${e(-2,150,170,.9)}${e(1,186,20,1.1)}${e(-2,228,160)}${e(-1,262,25,.9)}
    ${e(196,24,30)}${e(203,56,190,1.1)}${e(200,92,20,.9)}${e(203,128,200)}
    ${e(40,-6,-150,1.2)}${e(150,-6,-30,1.1)}
    ${s(10,-4,1.3)}${s(-3,134,.9)}${s(200,10,1)}
    <path class="moss" d="M-10 303 Q-8 293 6 295 Q12 288 24 295 Q40 299 60 300 H140 Q162 299 176 295 Q188 288 194 295 Q208 293 210 303 Q208 307 194 307 H6 Q-10 307 -10 303Z"/>
    <path class="fern" d="M14 296 Q8 280 -4 276 M14 296 Q20 280 30 278 M188 296 Q194 282 206 278 M188 296 Q182 282 172 280"/>
  `)}function Fa(){const t=(n,r)=>`<g class="bolt" transform="translate(${n} ${r})"><path d="M-3 -1.7 L0 -3.4 L3 -1.7 V1.7 L0 3.4 L-3 1.7Z"/><circle r="1"/></g>`,e=(n,r,i)=>`<g class="barnacle" transform="translate(${n} ${r})"><path d="M${-i} 0 L${-i*.5} ${-i*1.1} H${i*.5} L${i} 0Z"/><ellipse class="hole" cy="${-i*1.05}" rx="${i*.4}" ry="${i*.18}"/></g>`,s=[[10,0],[14,1.6],[188,.8],[185,2.6],[12,3.4],[190,4.2]].map(([n,r],i)=>`<circle class="bubble" cx="${n}" cy="292" r="${1.6+i%3*.7}" style="animation-delay:${-r}s"/>`).join(""),a=(n,r,i,l)=>`<path class="sweed" style="animation-delay:${-l*.8}s" d="M${n} 300 q${i*8} ${-r*.3} 0 ${-r*.55} q${-i*8} ${-r*.25} ${i*3} ${-r*.45} q${i*2} ${r*.5} ${-i*6} ${r}Z"/>`;return $e(`
    <defs>
      <linearGradient id="copper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a6e3cf"/><stop offset=".45" stop-color="#3f9c86"/><stop offset="1" stop-color="#1c4a43"/>
      </linearGradient>
    </defs>
    <rect class="copper" x="-7" y="-8" width="214" height="13" rx="5" fill="url(#copper)"/>
    <path class="patina" d="M20 -5 q6 3 14 0 M120 -4 q8 3 18 -1 M70 2 q5 -2 10 0"/>
    ${[6,46,100,154,194].map(n=>t(n,-1.5)).join("")}
    ${e(26,-7,3.2)}${e(33,-7,2.4)}${e(168,-7,2.8)}${e(175,-7,3.4)}
    <g class="scallop" transform="translate(74 -7) rotate(-8)"><path d="M0 2 L-9 -4 Q0 -14 9 -4 Z"/><path class="ribs" d="M0 2 L-6 -8 M0 2 L-2 -10 M0 2 L2 -10 M0 2 L6 -8"/></g>
    ${s}
    <path class="starfish" transform="translate(16 236) rotate(18) scale(1.15)" d="M0 -10 Q2 -3 9.5 -3.1 Q3.5 1.5 5.9 8.1 Q0 4 -5.9 8.1 Q-3.5 1.5 -9.5 -3.1 Q-2 -3 0 -10Z"/>
    ${a(184,58,-1,0)}${a(193,76,-1,1)}${a(176,40,1,2)}
    <path class="copper" fill="url(#copper)" d="M-7 270 Q-7 307 22 307 H178 Q207 307 207 270 L200 270 Q200 299 178 299 H22 Q0 299 0 270 Z"/>
    ${t(-3,274)}${t(203,274)}${e(40,300,2.6)}${e(150,301,3)}
    <!-- кракен близко: щупальца обхватывают стакан снизу, их основания уходят в темноту -->
    <defs>
      <linearGradient id="gripFade" gradientUnits="userSpaceOnUse" x1="0" y1="240" x2="0" y2="322">
        <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/>
      </linearGradient>
      <mask id="gripMask" maskUnits="userSpaceOnUse" x="-80" y="-80" width="360" height="460"><rect x="-80" y="-80" width="360" height="460" fill="url(#gripFade)"/></mask>
    </defs>
    <g class="grip" mask="url(#gripMask)"><g transform="translate(-16 326) rotate(8)">${ne(170,22,1.6)}</g></g>
    <g class="grip right" mask="url(#gripMask)"><g transform="translate(216 326) rotate(-8) scale(-1 1)">${ne(140,20,1.8)}</g></g>
  `)}function ne(t,e,s,a=.93){const r=[],i=[],l=[];let c=0,o=0,f=-Math.PI/2;const u=t/40,h=s>=0?1:-1;for(let p=0;p<=40;p++){const m=p/40,g=e*(1-m*a),V=Math.cos(f+Math.PI/2),C=Math.sin(f+Math.PI/2);r.push(`${(c-V*g/2).toFixed(1)} ${(o-C*g/2).toFixed(1)}`),i.push(`${(c+V*g/2).toFixed(1)} ${(o+C*g/2).toFixed(1)}`),p%3===1&&p<37&&l.push(`<circle class="sucker" cx="${(c+V*g*.3*h).toFixed(1)}" cy="${(o+C*g*.3*h).toFixed(1)}" r="${(g*.15).toFixed(1)}"/>`),c+=Math.cos(f)*u,o+=Math.sin(f)*u,f+=s*m*m*.32}const $=(e*(1-a)/2).toFixed(1),M=i.pop();return`<path class="t-body" d="M${r.join(" L")} A${$} ${$} 0 0 1 ${M} L${i.reverse().join(" L")}Z"/>${l.join("")}`}function Ra(){const t=(e,s,a,n,r,i,l,c)=>`<g class="c-arm ${l}" style="animation-delay:${c*.14}s"><g transform="translate(${e} ${s}) rotate(${a})">${ne(n,r,i,.8)}</g></g>`;return`<svg class="crush" viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden="true">
    ${t(-420,236,90,660,50,-.18,"l",0)}${t(620,156,-90,650,46,-.16,"r",1)}${t(-420,84,90,650,42,.16,"l",2)}
  </svg>`}const Va={desert:Ca,winter:Ea,jungle:ja,sea:Fa},Bs=t=>Va[t]();let I,nt,ve=null,xe=null,gt=0,q=0;function qa(t){const e=["","",""];for(let s=0;s<t;s++){const a=Math.random()*100,n=Math.random()*62,r=Math.random()<.15?1.6:Math.random()<.5?1.1:.7;e[s%3]+=`<circle cx="${a.toFixed(2)}%" cy="${n.toFixed(2)}%" r="${r}"/>`}return e.map((s,a)=>`<svg class="bd-stars s${a}" width="100%" height="100%" aria-hidden="true">${s}</svg>`).join("")}const Ba={desert:{pts:[[8,10],[14,6],[12,16],[20,14],[28,18],[36,22],[43,28],[48,36],[50,44],[56,49],[64,50],[71,46],[73,39],[69,34]],lines:[[1,3],[0,3],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13]]},winter:{pts:[[8,18],[20,14],[31,16],[40,22],[44,34],[58,36],[60,24]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},jungle:{pts:[[40,6],[38,46],[22,24],[56,22],[47,32],[62,10],[70,18]],lines:[[0,1],[2,3],[4,3]]},sea:{pts:[[6,30],[13,25],[21,29],[29,27],[37,33],[46,31],[54,35],[62,29],[69,22],[74,14],[66,13],[63,21]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,7]]}};function Pa(t){const e=Ba[t];return`<svg class="bd-const" viewBox="0 0 80 56" aria-hidden="true">
    <path class="c-lines" d="${e.lines.map(([a,n])=>`M${e.pts[a].join(" ")} L${e.pts[n].join(" ")}`).join(" ")}" pathLength="1"/>
    ${e.pts.map(([a,n],r)=>`<circle cx="${a}" cy="${n}" r="${r===0?1.5:1}" style="--i:${(r/(e.pts.length-1)).toFixed(3)}"/>`).join("")}
  </svg>`}const Ga='<path d="M-14 -6c0-4 2-6 5-6 1-4 3-6 5-6 2 0 3 2 4 4 1-3 3-4 5-4s3 2 3 5c2 0 3-2 4-4l2 1c-1 3-2 5-4 6V0h-2v-5h-2V0H4v-4c-3 1-7 1-10 0V0h-2v-4h-2V0h-2v-5c-2-1-3-1-4 0Z"/>',be=t=>`<g transform="translate(0 ${-t})">
  <rect x="-3" y="0" width="6" height="${t}" rx="3"/>
  <path d="M-3 ${t*.45}h-5a3 3 0 0 1-3-3v-${t*.2}a2.5 2.5 0 0 1 5 0v${t*.12}h3Z"/>
  <path d="M3 ${t*.6}h5a3 3 0 0 0 3-3v-${t*.18}a2.5 2.5 0 0 0-5 0v${t*.1}h-3Z"/>
</g>`,hs="M-60 165 C40 145 120 132 220 142 S420 122 560 118 S800 140 900 145 S1020 132 1080 130",we=t=>`<g class="camel">${Ga}
  <animateMotion dur="200s" begin="${t}s" repeatCount="indefinite" rotate="auto"><mpath href="#ridge"/></animateMotion></g>`,Ia=`<svg viewBox="-20 -20 40 40" aria-hidden="true"><g fill="none" stroke-width="1.6" stroke-linecap="round">
  <circle r="15"/><path d="M-12 -6C-4 -14 8 -10 12 2M-14 4C-6 12 8 14 13 -2M-6 -13C2 -6 0 6 -8 12M6 -13C10 -2 4 10 -2 14M-15 -1h30M0 -15v30"/>
</g></svg>`,us=['<circle cx="10" cy="10" r="4.5"/><path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3"/>','<path d="M2 10 Q10 3 18 10 Q10 17 2 10Z"/><circle cx="10" cy="10" r="2" class="g-fill"/><path d="M8 15 L6 19M12 15 l3 3"/>','<path d="M3 15 Q6 6 12 7 L17 5 L14 9 Q15 15 9 16 Z"/><path d="M8 16 L7 19M11 16 L12 19"/>','<path d="M1 7 L5 3 L9 7 L13 3 L17 7M1 14 L5 10 L9 14 L13 10 L17 14"/>','<circle cx="10" cy="5.5" r="3.5"/><path d="M10 9v10M5 12h10"/>','<ellipse cx="10" cy="11" rx="4.5" ry="6"/><path d="M10 5v12M5.5 9 L2 7M5.5 13 L2 15M14.5 9 L18 7M14.5 13 L18 15M8 5 L7 2M12 5 L13 2"/>','<path d="M10 2 Q4 8 9 18 M10 2 Q16 8 11 18 M10 4v15"/>','<path d="M2 16 Q6 10 10 14 Q14 18 17 10 L18 5 L15 7"/>','<path d="M2 18 L10 3 L18 18Z"/><path d="M6 12 L14 12"/>','<path d="M4 18 V8 Q4 3 9 3 Q14 3 14 8 V10 M14 10 h3 M8 18 V9 M11 18 V8"/>'];function ps(t){const s=Array.from({length:12},(n,r)=>{const i=r%2,l=Math.floor(r/2),c=us[(r*7+(t?3:0))%us.length];return`<g class="glyph${r%3?" still":""}" transform="translate(${16+i*26} ${78+l*28})" style="animation-delay:${(-(r*.7)%7).toFixed(1)}s">${c}</g>`}).join(""),a=(n,r,i,l)=>Array.from({length:i},(c,o)=>`<rect class="grain" x="${n+o*3%3-1}" y="${r}" width="1.6" height="${2+o%2}" style="animation-delay:${(-(o/i)*l).toFixed(2)}s;animation-duration:${l}s"/>`).join("");return`<svg class="tablet${t?" right":""}" viewBox="0 0 80 300" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
    <g class="t-swing">
      <path class="t-rope" d="M22 -4 V44 M58 -4 V44"/>
      <circle class="t-ring" cx="22" cy="48" r="4"/><circle class="t-ring" cx="58" cy="48" r="4"/>
      <path class="t-stone" d="M6 52 H74 V226 L66 236 L71 244 L62 256 H14 Q6 256 6 246 Z"/>
      <path class="t-side" d="M74 52 H78 V222 L70 236 L74 244 L66 256 H62 L71 244 L66 236 L74 226 Z"/>
      <path class="t-frame" d="M12 60 H68 V224 L62 232 V248 H12 Z"/>
      <path class="t-crack" d="M24 168 L32 182 L28 194 L36 210 M32 182 L42 186"/>
      <circle class="t-disc" cx="40" cy="68" r="5"/><path class="t-wing" d="M34 68 Q26 63 18 68 Q26 66 34 70 M46 68 Q54 63 62 68 Q54 66 46 70"/>
      <g class="glyphs">${s}</g>
      <path class="t-sand" d="M6 53 Q14 44 26 49 Q36 42 48 48 Q60 43 74 53 Z"/>
      <path class="t-sand" d="M14 256 Q22 252 32 255 L30 257 H14Z"/>
      <g class="trickle">${a(6,54,4,1.8)}${a(68,246,5,1.5)}${a(30,257,3,2)}</g>
    </g>
  </svg>`}function $s(t){const s=[6,18,27,40,52,61,74,88,99,112,126,138].map((a,n)=>{const r=26+n*37%7*11+(n%3===0?30:0),i=4+n%3*1.6,l=n%4===1?`<circle class="drip" cx="${a}" cy="${12+r}" r="1.8" style="animation-delay:${(-n*1.3).toFixed(1)}s"/>`:"";return`<path class="ice" d="M${a-i} 12 Q${a-i*.3} ${12+r*.6} ${a} ${12+r} Q${a+i*.3} ${12+r*.6} ${a+i} 12Z"/><path class="ice-shine" d="M${a-i*.4} 14 L${a-.3} ${10+r*.8}"/>${l}`}).join("");return`<svg class="icicles${t?" right":""}" viewBox="0 0 150 160" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
    ${s}
    <path class="i-snow" d="M-4 0 H154 V8 Q146 16 136 12 Q124 18 112 12 Q100 18 86 12 Q72 19 58 12 Q44 18 30 12 Q16 17 4 12 Q-2 14 -4 10 Z"/>
    <path class="i-branch" d="M-4 22 Q30 18 70 30 M24 21 L36 12 M44 24 L58 16 M30 22 L40 32 M52 26 L62 36"/>
    <path class="i-snow" d="M-4 18 Q20 12 50 20 Q60 22 72 27 Q50 26 30 23 Q10 22 -4 24Z"/>
  </svg>`}function Wa(){return`
    <svg class="bd-dunes" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path id="ridge" d="${hs}" fill="none" stroke="none"/>
      <path class="d-far" d="${hs} V300 H-60Z"/>
      <g class="caravan">${we(0)}${we(-6)}${we(-12)}</g>
      <path class="d-mid" d="M-60 215 C100 170 260 195 420 178 S700 150 820 182 S960 205 1080 188 V300 H-60Z"/>
      <path class="d-near" d="M-60 258 C180 232 320 262 500 245 S800 222 1080 252 V300 H-60Z"/>
      <g class="d-cacti">
        <g transform="translate(150 246)">${be(34)}</g>
        <g transform="translate(860 238)">${be(26)}</g>
        <g transform="translate(905 243)">${be(16)}</g>
      </g>
    </svg>
    ${ps(!1)}${ps(!0)}
    <div class="bd-critter" id="bd-critter">${Ia}</div>`}const ms=(t,e,s)=>{const a=s*.5,n=r=>{const i=e-s+r*s*.28,l=a*(.45+r*.28),c=i+s*.42;return`<path class="p-dark" d="M${t} ${i} L${t-l} ${c} H${t} Z"/><path class="p-lit" d="M${t} ${i} L${t+l} ${c} H${t} Z"/><path class="snowcap" d="M${t} ${i} L${t-l*.6} ${i+s*.22} Q${t-l*.2} ${i+s*.17} ${t} ${i+s*.2} Q${t+l*.25} ${i+s*.15} ${t+l*.6} ${i+s*.22} Z"/><path class="snowcap" d="M${t-l} ${c} Q${t-l*.5} ${c-s*.05} ${t-l*.2} ${c} Z"/>`};return`<g class="pine"><rect class="p-trunk" x="${t-2.5}" y="${e-6}" width="5" height="8"/>${n(0)}${n(1)}${n(2)}</g>`},Ms=(t,e,s)=>Array.from({length:t},()=>{const a=Math.random()*1e3,n=e+Math.random()*(s-e);return`<circle class="glint" cx="${a.toFixed(0)}" cy="${n.toFixed(0)}" r="${(.8+Math.random()*1.2).toFixed(1)}" style="animation-delay:${(-Math.random()*5).toFixed(2)}s;animation-duration:${(2.5+Math.random()*3).toFixed(1)}s"/>`}).join("");function Da(){const t=[70,130,190,300,360,660,720,880,950].map((a,n)=>ms(a,152+n%3*4,40+n%4*6)).join(""),e=[40,120,860,930,985].map((a,n)=>ms(a,262+n%2*6,70+n%3*12)).join(""),s=Array.from({length:9},(a,n)=>`<rect x="${830+n*14}" y="${212-n%2}" width="3" height="14" rx="1"/>`).join("");return`
    <div class="bd-north"><i></i><i></i><i></i></div>
    <svg class="bd-dunes" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id="cabinGlow"><stop offset="0" stop-color="#ffcf6e" stop-opacity=".55"/><stop offset="1" stop-color="#ffcf6e" stop-opacity="0"/></radialGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7f9fc8"/><stop offset="1" stop-color="#2f4466"/></linearGradient>
      </defs>
      <!-- горы со снежными вершинами -->
      <path class="w-mount" d="M-60 150 L60 92 L130 120 L230 62 L330 118 L420 84 L520 128 L640 70 L760 118 L850 90 L960 126 L1080 100 V300 H-60Z"/>
      <path class="w-peak" d="M230 62 L208 76 L222 74 L232 82 L244 74 L256 78 Z M640 70 L616 86 L632 82 L642 92 L652 82 L668 88 Z M60 92 L44 102 L58 100 L66 106 L76 100 Z M850 90 L834 100 L848 98 L856 104 L866 98 Z"/>
      <path class="d-far" d="M-60 170 C80 140 200 150 320 138 S560 120 680 140 S900 160 1080 136 V300 H-60Z"/>
      <!-- замёрзшее озеро с отражением луны -->
      <ellipse cx="300" cy="186" rx="150" ry="12" fill="url(#lake)" class="w-lake"/>
      <ellipse class="lake-shine" cx="330" cy="184" rx="36" ry="2.2"/>
      <g class="d-trees">${t}</g>
      <!-- избушка: тёплый свет на снегу, забор, снеговик -->
      <ellipse cx="790" cy="204" rx="90" ry="18" fill="url(#cabinGlow)" class="c-glow"/>
      <g class="cabin" transform="translate(790 196)">
        <path class="c-wall" d="M-34 0 V-30 H34 V0Z"/>
        ${[-24,-16,-8].map(a=>`<path class="c-log" d="M-34 ${a} H34"/>`).join("")}
        <path class="c-roof" d="M-44 -28 L0 -58 L44 -28 Z"/>
        <path class="snowcap" d="M-46 -27 L0 -60 L46 -27 L40 -24 L0 -52 L-40 -24 Z"/>
        <rect class="c-chim" x="18" y="-58" width="9" height="18"/>
        <rect class="snowcap" x="17" y="-60" width="11" height="4" rx="2"/>
        <rect class="c-win" x="-16" y="-22" width="14" height="12" rx="1"/>
        <rect class="c-win" x="6" y="-22" width="14" height="12" rx="1"/>
        <path class="c-frame" d="M-9 -22 V-10 M-16 -16 H-2 M13 -22 V-10 M6 -16 H20"/>
        <path class="snowcap" d="M-36 0 Q0 -4 36 0 L40 4 H-40 Z"/>
        <g class="puffs"><circle cx="22" cy="-64" r="6"/><circle cx="22" cy="-64" r="6"/><circle cx="22" cy="-64" r="6"/></g>
      </g>
      <g class="fence">${s}<rect x="828" y="216" width="116" height="2.5" rx="1"/></g>
      <g class="snowman" transform="translate(690 210)">
        <circle cy="-6" r="9"/><circle cy="-20" r="6.5"/><circle cy="-30" r="4.6"/>
        <path class="nose" d="M0 -30 L7 -29 L0 -28 Z"/><rect class="hat" x="-4" y="-40" width="8" height="6"/><rect class="hat" x="-6" y="-35" width="12" height="2"/>
        <path class="arm" d="M-6 -21 L-16 -27 M6 -21 L16 -28"/>
      </g>
      <path class="d-mid" d="M-60 222 C120 196 260 210 420 198 S720 180 840 204 S980 214 1080 200 V300 H-60Z"/>
      <g class="glints">${Ms(8,206,250)}</g>
      <path class="d-near" d="M-60 262 C200 240 360 266 520 252 S820 236 1080 258 V300 H-60Z"/>
      <g class="glints">${Ms(6,256,296)}</g>
      <g class="d-trees near">${e}</g>
    </svg>
    ${$s(!1)}${$s(!0)}`}const Kt=(t,e,s,a)=>{const n=t+a,r=e-s,i=[-160,-128,-96,-64,-32,-2,180,-112].map(c=>{const o=c*Math.PI/180,f=n+Math.cos(o)*s*.6,u=r+Math.sin(o)*s*.32+s*.16,h=(n+f)/2,$=r-s*.16;return`<path d="M${n} ${r} Q${h} ${$} ${f} ${u}" />`}).join(""),l=Array.from({length:6},(c,o)=>{const f=(o+1)/7,u=t+a*.2*f*2*(1-f)+a*f*f,h=e-s*f;return`<path class="ring" d="M${u-3.5} ${h} h7"/>`}).join("");return`<g class="palm"><path class="trunk" d="M${t} ${e} Q${t+a*.2} ${e-s*.6} ${n} ${r}"/>${l}<g class="leaves">${i}</g>
    <circle class="coco" cx="${n-3}" cy="${r+4}" r="3"/><circle class="coco" cx="${n+3}" cy="${r+5}" r="3"/></g>`};function Le(t,e,s){let a=`M-60 ${t}`;for(let n=-60;n<=1080;n+=40){const r=e*(.5+.5*Math.sin(n*.013+s)*Math.cos(n*.031+s*2));a+=` Q${n+20} ${t-r-e*.6} ${n+40} ${t-r*.3}`}return`${a} V300 H-60Z`}const gs=(t,e,s)=>Array.from({length:t},()=>{const a=Math.random()*1e3,n=e+Math.random()*(s-e);return`<circle class="bloom ${Math.random()<.5?"b-pink":"b-cyan"}" cx="${a.toFixed(0)}" cy="${n.toFixed(0)}" r="${(1.6+Math.random()*1.6).toFixed(1)}" style="animation-delay:${(-Math.random()*4).toFixed(2)}s"/>`}).join(""),ys=(t,e,s,a)=>`<g class="monstera" transform="translate(${t} ${e}) rotate(${a}) scale(${s})">
  <path d="M0 0 C-40 -10 -70 -50 -60 -90 C-50 -120 -10 -130 10 -110 C40 -130 80 -110 76 -70 C72 -30 40 -6 0 0Z"/>
  <path class="m-cut" d="M-30 -40 L-56 -52 M-24 -66 L-50 -86 M30 -40 L60 -46 M30 -66 L64 -78 M2 -90 L4 -112"/>
  <path class="m-vein" d="M0 0 C4 -40 6 -80 8 -108"/>
</g>`,Na=`<g class="fall" transform="translate(46 0)">
  <defs>
    <linearGradient id="fallBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d8f3ff" stop-opacity=".95"/><stop offset=".55" stop-color="#9fd6ea" stop-opacity=".75"/><stop offset="1" stop-color="#cfeef6" stop-opacity=".1"/>
    </linearGradient>
    <filter id="fallMist" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>
  <path class="fall-wet" d="M612 74 L648 74 L664 168 L596 168 Z"/>
  <path class="fall-body" d="M618 73 Q630 70 642 73 L654 162 Q630 168 606 162 Z" fill="url(#fallBody)"/>
  ${[[621,609],[626,619],[630,630],[634,641],[639,651]].map(([t,e],s)=>`<path class="stream" d="M${t} 74 Q${(t+e)/2+(s-2)} 118 ${e} 162" style="animation-delay:${(-s*.23).toFixed(2)}s"/>`).join("")}
  <path class="fall-lip" d="M614 74 Q630 66 646 74 Q630 71 614 74Z"/>
  <g class="fall-mist" filter="url(#fallMist)">
    <circle cx="612" cy="164" r="10"/><circle cx="630" cy="168" r="13"/><circle cx="648" cy="164" r="10"/><circle cx="622" cy="156" r="7"/><circle cx="640" cy="156" r="7"/>
  </g>
</g>`,Ya=`<svg class="tornado" viewBox="0 0 100 200" aria-hidden="true"><g>
  ${Array.from({length:9},(t,e)=>{const s=16+e*20,a=44-e*4.4;return`<ellipse cx="${50+Math.sin(e)*3}" cy="${s}" rx="${a}" ry="${6-e*.4}" style="animation-delay:${(-e*.12).toFixed(2)}s"/>`}).join("")}
</g></svg>`,Oa='<svg viewBox="-20 -10 40 20" aria-hidden="true"><path class="wings" d="M-18 -2 Q-9 -10 0 0 Q9 -10 18 -2 Q9 -4 0 3 Q-9 -4 -18 -2Z"/></svg>';function Ua(){return`
    <div class="rays"><i></i><i></i><i></i></div>
    <svg class="bd-dunes" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe8d8" stop-opacity="0"/><stop offset=".6" stop-color="#bfe8d8" stop-opacity=".22"/><stop offset="1" stop-color="#bfe8d8" stop-opacity="0"/></linearGradient>
      </defs>
      <!-- столовые горы-тепуи; с обрыва падает водопад -->
      <path class="j-tepui" d="M-60 130 L40 128 L60 70 L210 66 L232 124 L420 120 L440 92 L560 88 L590 70 L700 72 L716 126 L1080 118 V300 H-60Z"/>
      ${Na}
      <rect class="mist" x="-60" y="112" width="1140" height="60" fill="url(#mist)"/>
      <path class="d-far" d="${Le(160,30,1)}"/>
      <rect class="mist m2" x="-60" y="168" width="1140" height="50" fill="url(#mist)"/>
      <path class="d-mid" d="${Le(212,34,4)}"/>
      <g class="blooms">${gs(8,200,240)}</g>
      <path class="d-near" d="${Le(260,26,7)}"/>
      <g class="blooms">${gs(6,252,290)}</g>
      <g class="palms">${Kt(110,262,120,26)}${Kt(170,270,90,-18)}${Kt(880,260,110,-28)}${Kt(950,268,80,14)}</g>
      <g class="fronds">${ys(30,312,1.1,18)}${ys(980,316,1.15,-24)}</g>
    </svg>
    ${Ya}
    <svg class="vines" viewBox="0 0 200 400" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
      <path d="M20 0 C30 80 10 160 34 260 S30 340 40 400"/><path d="M70 0 C80 60 60 120 78 190"/><path d="M120 0 C126 40 112 80 126 120"/>
      ${[[24,70],[16,150],[34,230],[76,60],[66,130],[122,60],[30,310],[80,170]].map(([t,e])=>`<ellipse class="leaf" cx="${t}" cy="${e}" rx="10" ry="5" transform="rotate(${t*7%60-30} ${t} ${e})"/>`).join("")}
      <circle class="bloom b-pink" cx="36" cy="262" r="4"/><circle class="bloom b-cyan" cx="72" cy="120" r="3.4"/>
    </svg>
    <svg class="vines right" viewBox="0 0 200 400" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
      <path d="M30 0 C40 70 20 150 44 220"/><path d="M90 0 C96 50 84 100 96 150"/>
      ${[[36,60],[26,140],[92,70],[40,200]].map(([t,e])=>`<ellipse class="leaf" cx="${t}" cy="${e}" rx="10" ry="5" transform="rotate(${t*5%60-30} ${t} ${e})"/>`).join("")}
      <circle class="bloom b-pink" cx="44" cy="222" r="4"/>
    </svg>
    <div class="bd-critter bird" id="bd-critter">${Oa}</div>`}const Jt=(t,e,s,a="c-pink")=>`<g class="coral ${a}" transform="translate(${t} ${e}) scale(${s})">
  <path d="M0 0 V-22 M0 -10 L-10 -22 L-12 -34 M-10 -22 L-3 -31 M0 -22 L5 -36 M0 -15 L12 -26 L16 -38 M12 -26 L7 -35"/>
</g>`,ke=(t,e,s)=>`<g class="coral c-fan" transform="translate(${t} ${e}) scale(${s})">
  <path class="fan" d="M0 0 Q-30 -18 -26 -48 Q0 -66 26 -48 Q30 -18 0 0Z"/>
  <path class="fan-veins" d="M0 0 L-19 -44 M0 0 L-7 -55 M0 0 L7 -55 M0 0 L19 -44 M-22 -32 Q0 -40 22 -32 M-15 -16 Q0 -22 15 -16"/>
</g>`,Qe=(t,e,s)=>{let a=`M${-s*.8} ${-s*.2}`;for(let r=0;r<8;r++)a+=` q${s*.1} ${r%2?5:-5} ${s*.2} 0`;let n=`M${-s*.55} ${-s*.5}`;for(let r=0;r<5;r++)n+=` q${s*.11} ${r%2?-4:4} ${s*.22} 0`;return`<g class="coral c-brain" transform="translate(${t} ${e})"><path d="M${-s} 0 A${s} ${s*.8} 0 0 1 ${s} 0Z"/><path class="brain-lines" d="${a} ${n}"/></g>`},vs=(t,e)=>[[-8,26],[0,36],[9,22]].map(([s,a])=>`<g class="coral c-tube"><rect x="${t+s-4}" y="${e-a}" width="8" height="${a}" rx="4"/><ellipse class="tube-hole" cx="${t+s}" cy="${e-a+2}" rx="2.6" ry="1.4"/></g>`).join(""),Se=(t,e,s)=>{const a=[-60,-40,-20,0,20,40,60].map((n,r)=>{const i=(n-90)*Math.PI/180,l=Math.cos(i)*16,c=Math.sin(i)*18;return`<path d="M0 0 Q${l*.3+(r%2?3:-3)} ${c*.6} ${l.toFixed(1)} ${c.toFixed(1)}"/><circle class="tip" cx="${l.toFixed(1)}" cy="${c.toFixed(1)}" r="1.6"/>`}).join("");return`<g class="anemone" transform="translate(${t} ${e}) scale(${s})"><g class="arms" style="animation-delay:${(-t%5).toFixed(1)}s">${a}</g><ellipse class="foot" cx="0" cy="1" rx="7" ry="3"/></g>`},xs=(t,e,s,a)=>{let n=`M${t} ${e}`;for(let i=1;i<=6;i++)n+=` Q${t+(i%2?10:-10)} ${e-s/6*(i-.5)} ${t} ${e-s/6*i}`;const r=[.3,.55,.8].map((i,l)=>{const c=e-s*i,o=l%2?1:-1;return`<path class="blade" d="M${t} ${c} q${o*14} -6 ${o*18} -18 q${-o*8} 8 ${-o*18} 18Z"/>`}).join("");return`<g class="kelp" style="animation-delay:${(-a*1.3).toFixed(1)}s;animation-duration:${(6+a%3).toFixed(0)}s"><path class="stem" d="${n}"/>${r}</g>`},je=(t,e,s,a)=>`<path class="starfish" transform="translate(${t} ${e}) rotate(${a}) scale(${s})"
  d="M0 -10 Q2 -3 9.5 -3.1 Q3.5 1.5 5.9 8.1 Q0 4 -5.9 8.1 Q-3.5 1.5 -9.5 -3.1 Q-2 -3 0 -10Z"/>`,Ae=(t,e,s)=>`<g class="shell" transform="translate(${t} ${e}) scale(${s})">
  <path d="M0 0 L-9 -6 Q0 -16 9 -6 Z"/><path class="ribs" d="M0 0 L-6 -10 M0 0 L-2 -12 M0 0 L2 -12 M0 0 L6 -10"/></g>`,_a=`<g class="wreck" transform="translate(150 150) rotate(-8)">
  <path class="hull" d="M-80 -6 Q-70 22 -30 24 H50 Q78 20 92 -10 L70 -12 L64 -4 H-50 L-62 -16 Z"/>
  <path class="deck" d="M-50 -4 H64 L70 -12"/>
  ${[-36,-18,0,18,36].map(t=>`<circle class="port" cx="${t}" cy="8" r="3"/>`).join("")}
  <path class="mast" d="M-10 -4 L-16 -64 M-28 -44 L4 -48 M30 -4 L40 -36"/>
  <path class="rag" d="M-14 -46 Q-4 -40 2 -46 L0 -30 Q-8 -26 -14 -32Z"/>
</g>`,za=`<g class="anchor" transform="translate(830 262) rotate(18)">
  <circle class="ring" cx="0" cy="-58" r="6"/><path d="M0 -52 V0 M-14 -44 H14 M-24 -12 Q-22 6 0 6 Q22 6 24 -12 M-24 -12 l-6 4 M24 -12 l6 4"/>
</g>`,Xa=`<g class="chest" transform="translate(905 270)">
  <ellipse class="chest-glow" cx="0" cy="-16" rx="26" ry="14"/>
  <rect class="box" x="-16" y="-14" width="32" height="18" rx="2"/>
  <path class="lid" d="M-17 -15 Q0 -30 17 -15 L15 -20 Q0 -34 -15 -20Z"/>
  <path class="band" d="M-6 -14 V4 M6 -14 V4"/><rect class="lock" x="-2.5" y="-12" width="5" height="6" rx="1"/>
</g>`,Ka=`<svg viewBox="-40 -24 80 48" aria-hidden="true">${[[0,0],[-16,-10],[-14,10],[-30,2],[-28,-16]].map(([t,e],s)=>`<g transform="translate(${t} ${e})"><path class="body" d="M8 0 Q2 -6 -6 -3 L-12 -6 L-10 0 L-12 6 L-6 3 Q2 6 8 0Z" style="animation-delay:${(-s*.13).toFixed(2)}s"/><circle class="eye" cx="4" cy="-1" r="0.9"/></g>`).join("")}</svg>`,bs=t=>`<div class="jelly ${t}"><svg viewBox="-20 -16 40 70" aria-hidden="true">
  <path class="bell" d="M-14 0 Q-14 -15 0 -15 Q14 -15 14 0 Q10 3 7 0 Q3 3 0 0 Q-3 3 -7 0 Q-10 3 -14 0Z"/>
  <path class="tent" d="M-9 1 Q-13 16 -8 30 T-9 50 M-3 2 Q-6 20 -2 34 T-4 52 M3 2 Q6 18 2 32 T4 48 M9 1 Q12 14 8 28 T10 44"/>
</svg></div>`,Ja=`<svg class="kraken-body" viewBox="0 0 300 360" aria-hidden="true">
    <defs>
      <radialGradient id="kdark"><stop offset="0" stop-color="#06020e" stop-opacity=".8"/><stop offset=".6" stop-color="#06020e" stop-opacity=".45"/><stop offset="1" stop-color="#06020e" stop-opacity="0"/></radialGradient>
      <linearGradient id="mantle" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0" class="m-top"/><stop offset=".55" class="m-mid"/><stop offset="1" class="m-bot"/>
      </linearGradient>
    </defs>
    <ellipse class="k-dark" cx="160" cy="250" rx="170" ry="150"/>
    <g class="k-rise">
      <path class="mantle" fill="url(#mantle)" d="M30 380 C14 280 24 170 80 96 C120 40 196 22 244 62 C292 104 300 210 282 380 Z"/>
      <path class="ridge" d="M120 60 C100 120 92 200 96 300 M190 40 C176 110 172 190 180 300"/>
      ${[[150,90,9],[214,120,7],[120,150,6],[250,180,8],[140,230,5],[230,270,6],[80,210,7]].map(([t,e,s])=>`<ellipse class="spot" cx="${t}" cy="${e}" rx="${s}" ry="${s*.7}"/>`).join("")}
      <g transform="translate(206 150) scale(0.66)">
        <ellipse class="eye-glow" rx="66" ry="36"/>
        <g class="lid"><g class="blink">
          <path class="eye-white" d="M-56 0 Q0 -34 56 0 Q0 34 -56 0Z"/>
          <circle class="iris" r="22"/>
          <g class="look"><ellipse class="pupil" rx="4" ry="18"/></g>
          <circle class="eye-hi" cx="-8" cy="-9" r="4"/>
        </g></g>
        <path class="brow" d="M-62 -10 Q0 -52 64 -8"/>
      </g>
    </g>
  </svg>`,tn=`<svg class="kraken" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    ${[[40,430,50,1.6,"k1"],[210,320,36,-1.8,"k2"],[800,340,38,1.9,"k3"],[965,440,52,-1.5,"k4"]].map(([t,e,s,a,n])=>`<g transform="translate(${t} 640)"><g class="rise ${n}"><g class="sway">${ne(e,s,a)}</g></g></g>`).join("")}
  </svg>`;function en(){return`<svg class="chain" viewBox="0 0 60 320" preserveAspectRatio="xMidYMin meet" aria-hidden="true"><g class="swing">
    ${Array.from({length:13},(e,s)=>s%2?`<rect class="link-side" x="27" y="${s*17-3}" width="6" height="22" rx="3"/>`:`<ellipse class="link" cx="30" cy="${s*17+8}" rx="7" ry="11"/>`).join("")}
    <g class="anchor-big" transform="translate(30 236)">
      <circle class="ring" cx="0" cy="0" r="7"/><path d="M0 7 V66 M-16 18 H16 M-26 50 Q-24 72 0 72 Q24 72 26 50 M-26 50 l-7 5 M26 50 l7 5"/>
      <path class="weed" d="M4 30 q10 8 4 20 q-6 10 2 22"/>
    </g>
  </g></svg>`}function sn(){let t="";for(let s=0;s<=8;s++)t+=`M${s*14} 0 Q${s*14+6} 120 ${30+s*8} 240 `;for(let s=0;s<=8;s++)t+=`M${s*14+14} 0 Q${s*14-4} 120 ${22+s*8} 240 `;const e=[[18,36],[96,52],[40,128],[84,170],[58,236]].map(([s,a])=>`<g class="float" transform="translate(${s} ${a})"><circle r="9"/><circle class="float-hi" cx="-3" cy="-3" r="3"/><path class="float-rope" d="M-9 0 H9 M0 -9 V9"/></g>`).join("");return`<svg class="net" viewBox="0 0 130 300" preserveAspectRatio="xMidYMin meet" aria-hidden="true"><g class="swing">
    <path class="net-rope" d="M-4 2 H134"/>
    <path class="mesh" d="${t}"/>
    ${e}
    ${je(66,96,1.4,20)}
  </g></svg>`}function an(){const t=[40,80,250,300,690,740,900,960].map((s,a)=>xs(s,200,70+a%3*14,a)).join(""),e=[16,70,950,990].map((s,a)=>xs(s,300,150+a%2*30,a+3)).join("");return`
    <div class="sea-surface"></div>
    <div class="rays"><i></i><i></i><i></i><i></i><i></i></div>
    ${Ja}
    <svg class="bd-dunes" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path class="s-rock" d="M-60 150 L20 122 L90 132 L150 104 L240 128 L330 116 L400 136 L520 128 L600 110 L680 132 L780 112 L860 126 L960 104 L1080 124 V300 H-60Z"/>
      ${_a}
      <path class="d-far" d="M-60 184 C80 160 220 172 360 160 S600 150 720 166 S920 178 1080 160 V300 H-60Z"/>
      <g class="kelps far">${t}</g>
      <path class="d-mid" d="M-60 226 C120 204 280 216 440 206 S720 192 860 210 S990 218 1080 206 V300 H-60Z"/>
      <g class="reef">
        ${ke(110,222,.85)}${Jt(170,220,1.2)}${Qe(220,222,20)}${vs(290,214)}
        ${ke(720,214,.9)}${Qe(770,214,16)}${Jt(820,216,1.1,"c-orange")}${vs(880,220)}
        ${Se(250,222,1.1)}${Se(745,214,.9)}
      </g>
      <path class="d-near" d="M-60 266 C180 246 340 270 520 256 S820 240 1080 262 V300 H-60Z"/>
      ${za}${Xa}
      <g class="reef near">
        ${Jt(60,272,1.5,"c-orange")}${ke(130,272,.95)}${Se(190,268,1.5)}${Qe(960,268,24)}${Jt(1010,270,1.4)}
        ${je(330,272,1.3,15)}${je(640,268,1.1,-25)}${Ae(400,276,1.2)}${Ae(590,274,1)}${Ae(700,280,1.3)}
      </g>
      <g class="kelps near">${e}</g>
    </svg>
    ${bs("j1")}${bs("j2")}
    ${tn}
    ${en()}${sn()}
    <div class="bd-critter fish" id="bd-critter">${Ka}</div>`}const nn={desert:Wa,winter:Da,jungle:Ua,sea:an};function on(t){return`
    <div class="bd-layer bd-night"></div>
    <div class="bd-layer bd-predawn"></div>
    <div class="bd-layer bd-dawn"></div>
    <div class="bd-starfield">${qa(110)}</div>
    ${Pa(t.id)}
    <div class="bd-clouds"><i></i><i></i><i></i></div>
    <div class="bd-aurora"></div>
    <div class="bd-moon"></div>
    <div class="bd-sun"></div>
    <div class="bd-shoot" id="bd-shoot"></div>
    <div class="bd-wall"></div>
    ${nn[t.id]()}
    <div class="bd-storm"></div>
    <div class="bd-flash"></div>
    <div class="bd-wind">${"<i></i>".repeat(14)}</div>
    <div class="bd-dust">${"<i></i>".repeat(10)}</div>`}function rn(t,e){I=t,Ps(e),Ds(),Ys()}function Ps(t){nt=t,I.className=`sky w-${t.id}`,I.innerHTML=on(t),document.documentElement.dataset.world=t.id;const e=document.getElementById("jar-deco");e&&(e.innerHTML=Bs(t.id)),I.querySelectorAll(".bd-wind i").forEach(s=>{s.style.top=`${20+Math.random()*75}%`,s.style.width=`${80+Math.random()*160}px`,s.style.animationDuration=`${.6+Math.random()*.9}s`,s.style.animationDelay=`${-Math.random()*2}s`}),I.querySelectorAll(".bd-dust i").forEach((s,a)=>{s.style.left=`${(a*9.7+Math.random()*8)%100}%`,s.style.top=`${30+Math.random()*60}%`,s.style.animationDelay=`${-Math.random()*16}s`,s.style.animationDuration=`${12+Math.random()*10}s`}),Gs(gt)}function Gs(t){gt=Math.max(0,Math.min(1.3,t)),I.style.setProperty("--p",gt.toFixed(3)),I.style.setProperty("--predawn",Math.max(0,1-Math.abs(gt-.65)/.45).toFixed(3)),I.style.setProperty("--dawn",Math.max(0,Math.min(1,(gt-.8)/.25)).toFixed(3)),I.style.setProperty("--night",Math.max(0,1-gt*1.1).toFixed(3))}function ln(t){const e=Math.round(Math.max(0,Math.min(1,t))*100)/100;if(e===q)return;q=e;const s=document.documentElement;s.style.setProperty("--storm",q.toFixed(2)),s.toggleAttribute("data-calm",q<.03)}let ot=null,He=!1,tt=[],te=0,Fe=null;function cn(t,e){Fe=e,ot=document.createElement("canvas"),ot.className="storm-fx",t.appendChild(ot);const s=()=>{ot.width=Math.ceil(innerWidth/2),ot.height=Math.ceil(innerHeight/2)};s(),addEventListener("resize",s);let a=0;const n=r=>{requestAnimationFrame(n),!(r-a<15)&&(a=r,dn())};requestAnimationFrame(n)}function dn(){if(!ot)return;const t=ot.getContext("2d"),e=ot.width,s=ot.height,a=nt.particles,n=Math.floor(q*q*(a==="rain"?380:a==="snow"?340:a==="ink"?140:460));if(!n&&!tt.length){He&&(t.clearRect(0,0,e,s),He=!1);return}for(He=!0,t.clearRect(0,0,e,s);tt.length<n;)tt.push({x:Math.random()*e,y:Math.random()*s,v:3+Math.random()*7,len:2+Math.random()*9,a:.25+Math.random()*.5,w:Math.random()*6.28,r:.5+Math.random()*1.3});tt.length>n&&(tt.length=n);const r=.5+q;if(t.beginPath(),a==="sand"){for(const o of tt)o.x+=o.v*r,o.w+=.05,o.y+=Math.sin(o.w)*.4+.2,o.x>e+10&&(o.x=-10,o.y=Math.random()*s),o.y>s&&(o.y=0),t.moveTo(o.x,o.y),t.lineTo(o.x-o.len*r,o.y-.5);t.strokeStyle=`rgba(232, 178, 120, ${(.5*q).toFixed(3)})`,t.lineWidth=.8,t.stroke()}else if(a==="snow"){for(const o of tt)o.x+=o.v*.55*r,o.w+=.07,o.y+=.75+Math.sin(o.w)*.7+o.v*.15,o.x>e+5&&(o.x=-5),o.y>s+5&&(o.y=-5,o.x=Math.random()*e),t.moveTo(o.x+o.r,o.y),t.arc(o.x,o.y,o.r,0,6.29);t.fillStyle=`rgba(240, 248, 255, ${(.75*q).toFixed(3)})`,t.fill()}else if(a==="ink"){for(const o of tt){if(o.len>8.5)continue;o.w+=.008,o.x+=Math.sin(o.w+o.v)*.3*r,o.y-=.12*r,o.y<-20&&(o.y=s+20,o.x=Math.random()*e);const f=7+o.r*9+Math.sin(o.w*3)*2;t.moveTo(o.x+f,o.y),t.arc(o.x,o.y,f,0,6.29)}t.fillStyle=`rgba(14, 6, 26, ${(.05*q).toFixed(3)})`,t.fill(),t.beginPath();for(const o of tt){if(o.len<=8.5)continue;o.y-=o.v*.45*r,o.w+=.12,o.x+=Math.sin(o.w)*.65,o.y<-5&&(o.y=s+5,o.x=Math.random()*e);const f=o.r*1.4;t.moveTo(o.x+f,o.y),t.arc(o.x,o.y,f,0,6.29)}t.strokeStyle=`rgba(205, 240, 255, ${(.55*q).toFixed(3)})`,t.lineWidth=.6,t.stroke()}else{for(const o of tt)o.y+=o.v*1.6*r,o.x+=o.v*.35*r,o.y>s+10&&(o.y=-10,o.x=Math.random()*e),o.x>e+10&&(o.x=-10),t.moveTo(o.x,o.y),t.lineTo(o.x-o.len*.3,o.y-o.len*1.4);t.strokeStyle=`rgba(180, 215, 255, ${(.4*q).toFixed(3)})`,t.lineWidth=.7,t.stroke()}const i=performance.now();if(nt.id==="sea"){if(q>.6&&i-te>4e3&&Math.random()<.01){te=i;const o=I.querySelector(".kraken-body");o?.classList.remove("flare"),o?.getBoundingClientRect(),o?.classList.add("flare"),Fe?.()}return}const l=nt.id==="jungle"?.02:nt.id==="desert"?.012:0,c=nt.id==="jungle"?.5:.75;if(q>c&&i-te>2200&&Math.random()<l){te=i;const o=I.querySelector(".bd-flash");o?.classList.remove("on"),o?.offsetWidth,o?.classList.add("on"),nt.id==="jungle"&&window.setTimeout(()=>Fe?.(),250+Math.random()*500)}}function Is(t){const e=I.querySelector(".bd-aurora");e.style.setProperty("--aurora",t),e.classList.remove("on"),e.offsetWidth,e.classList.add("on")}function Ws(){const t=I.querySelector("#bd-shoot");t.style.left=`${10+Math.random()*60}%`,t.style.top=`${4+Math.random()*22}%`,t.classList.remove("go"),t.offsetWidth,t.classList.add("go")}function Ds(){ve!==null&&window.clearTimeout(ve),ve=window.setTimeout(()=>{gt<.8&&q<.4&&!document.hidden&&Ws(),Ds()},12e3+Math.random()*18e3)}function Ns(){const t=I.querySelector("#bd-critter");if(!t)return;const e=nt.id==="jungle"||nt.id==="sea";t.style.setProperty("--dur",`${e?q>.3?4:11:q>.3?3:9}s`),t.style.setProperty("--size",`${26+Math.random()*22}px`),e?t.style.top=`${18+Math.random()*25}%`:t.style.bottom=`${3+Math.random()*9}%`,t.classList.remove("go"),t.offsetWidth,t.classList.add("go")}function Ys(){xe!==null&&window.clearTimeout(xe);const t=q>.3?2500+Math.random()*3e3:22e3+Math.random()*25e3;xe=window.setTimeout(()=>{document.hidden||Ns(),Ys()},t)}const ee=(t,e,s)=>`<svg class="wprev" viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id="pv-${t}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${e[0]}"/><stop offset="1" stop-color="${e[1]}"/></linearGradient></defs>
  <rect width="120" height="90" fill="url(#pv-${t})"/>${s}</svg>`,fn=(t,e="#fff")=>t.map(([s,a])=>`<circle cx="${s}" cy="${a}" r="0.8" fill="${e}"/>`).join(""),hn={desert:()=>ee("desert",["#140d30","#6a3458"],`
    ${fn([[12,10],[30,18],[52,8],[70,22],[96,12],[108,30]])}
    <circle cx="92" cy="22" r="8" fill="#fff4d6"/><circle cx="88" cy="19" r="7.5" fill="#1c1238"/>
    <path d="M0 58 C20 50 40 48 60 54 S100 46 120 52 V90 H0Z" fill="#3a2350"/>
    <path d="M14 51 h8 l2 -3 2 3 h4 v4 h-1 v-3 h-12 v3 h-1Z M36 49 h8 l2 -3 2 3 h4 v4 h-1 v-3 h-12 v3 h-1Z" fill="#1a1028"/>
    <path d="M0 70 C30 62 60 72 90 64 S115 66 120 66 V90 H0Z" fill="#2a1840"/>
    <path d="M100 74 v-12 a2 2 0 0 1 4 0 v12 M98 68 h-3 v-4 M106 66 h3 v-4" stroke="#140c20" stroke-width="2.4" fill="none" stroke-linecap="round"/>`),winter:()=>ee("winter",["#06102a","#2c4470"],`
    <path d="M0 22 Q30 10 60 20 T120 16" stroke="#5dffb0" stroke-width="7" fill="none" opacity=".45"/>
    <path d="M0 30 Q40 20 70 30 T120 26" stroke="#6ac8ff" stroke-width="4" fill="none" opacity=".35"/>
    <path d="M0 56 L22 38 L36 48 L58 30 L80 50 L98 40 L120 52 V90 H0Z" fill="#3e5480"/>
    <path d="M58 30 L52 36 L58 35 L63 38Z M22 38 L18 42 L23 41Z" fill="#e8f0fb"/>
    <path d="M0 66 C30 58 70 64 120 58 V90 H0Z" fill="#c9d6ea"/>
    ${[[14,70,16],[26,72,12],[104,68,18]].map(([t,e,s])=>`<path d="M${t} ${e-s} L${t-s/3} ${e} H${t+s/3}Z" fill="#12283a"/><path d="M${t} ${e-s} L${t-s/6} ${e-s/2} H${t+s/6}Z" fill="#e8f0fb"/>`).join("")}
    <path d="M62 66 V58 L70 52 L78 58 V66Z" fill="#3a2418"/><path d="M60 59 L70 50 L80 59" stroke="#e8f0fb" stroke-width="2" fill="none"/>
    <rect x="67" y="59" width="5" height="4" fill="#ffcf6e"/>
    <path d="M0 78 C40 72 80 80 120 74 V90 H0Z" fill="#e6eef9"/>`),jungle:()=>ee("jungle",["#041410","#1d4434"],`
    <path d="M60 60 V26 H96 L100 60Z" fill="#163a30"/>
    <path d="M74 27 h6 l2 34 h-10Z" fill="#bfe8f0" opacity=".85"/>
    <ellipse cx="77" cy="61" rx="10" ry="3" fill="#e0f6fa" opacity=".7"/>
    <path d="M0 64 Q10 52 20 60 Q30 50 40 60 Q52 50 62 62 Q74 54 86 62 Q98 52 108 60 Q114 54 120 60 V90 H0Z" fill="#0c2a1e"/>
    <path d="M0 76 Q14 66 28 74 Q44 64 58 76 Q74 68 90 76 Q104 66 120 74 V90 H0Z" fill="#06180f"/>
    <path d="M22 80 Q24 62 30 50" stroke="#04100a" stroke-width="2.5" fill="none"/>
    <path d="M30 50 Q22 46 14 52 M30 50 Q36 44 44 48 M30 50 Q28 42 22 40 M30 50 Q38 50 42 56" stroke="#04100a" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${[[48,40],[12,34],[100,44],[56,70],[110,70]].map(([t,e])=>`<circle cx="${t}" cy="${e}" r="1.4" fill="#c8ff7a"/>`).join("")}`),sea:()=>ee("sea",["#0e4a62","#05172a"],`
    <path d="M20 0 L34 0 L50 90 L30 90Z M70 0 L78 0 L92 90 L80 90Z" fill="#bff6ff" opacity=".1"/>
    <path d="M0 68 C30 60 70 70 120 62 V90 H0Z" fill="#1d4a5a"/>
    <path d="M0 80 C40 72 80 82 120 76 V90 H0Z" fill="#2c5e6a"/>
    <path d="M18 76 V64 M18 70 L12 62 M18 68 L24 60" stroke="#ff7a8a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M100 78 Q88 68 92 56 Q100 50 108 56 Q112 68 100 78Z" fill="#b46ae0" opacity=".85"/>
    <path d="M38 80 A9 7 0 0 1 56 80Z" fill="#e6c45a"/>
    <path d="M70 34 Q70 26 78 26 Q86 26 86 34 Z" fill="#ff9ad6" opacity=".7"/>
    <path d="M72 34 q-2 8 0 14 M76 34 q2 8 0 16 M80 34 q-2 8 0 12 M84 34 q2 6 0 10" stroke="#ffc8ec" stroke-width="0.8" fill="none" opacity=".7"/>
    ${[[30,40,1.8],[33,32,1.2],[60,50,1.5],[104,30,1.6]].map(([t,e,s])=>`<circle cx="${t}" cy="${e}" r="${s}" fill="none" stroke="#cdf4ff" stroke-width="0.6"/>`).join("")}`)},un=t=>hn[t](),Ze={slope:.3,bend:12},K=[{id:"desert",name:"Пустыня",palette:[[255,107,107],[255,201,74],[76,182,255],[95,217,154],[179,140,255],[255,146,64]],scene:[["Ночные дюны","#b48cff"],["Караван","#ffc94a"],["Песчаная буря","#ff8a5c"]],feature:{title:"Классика",icon:"sun",text:"Правила без сюрпризов — лучший мир, чтобы освоиться"},unlock:0,hazardText:"надвигается буря",particles:"sand",sand:"plain",windHz:260,breakText:"Песок до краёв",rule:{spread:3,wind:0,pearl:0,tilt:Ze},ruleText:""},{id:"winter",name:"Зима",palette:[[236,72,118],[64,196,140],[164,124,255],[110,214,255],[255,186,64],[255,168,212]],scene:[["Тайга","#7fe0a8"],["Северное сияние","#8fd0ff"],["Пурга","#e6f0ff"]],feature:{title:"Липкий снег",icon:"snow",text:"Песок хуже растекается, горки круче — зато и полосы засчитываются круче"},unlock:1e4,hazardText:"надвигается пурга",particles:"snow",sand:"sparkle",windHz:420,breakText:"Стакан не выдержал мороза",rule:{spread:2,wind:0,pearl:0,tilt:{slope:.45,bend:16}},ruleText:"Снег липкий: горки выходят круче — и полосы засчитываются круче"},{id:"jungle",name:"Джунгли",palette:[[255,104,214],[156,226,52],[36,208,196],[255,110,50],[255,226,72],[90,120,255]],scene:[["Водопады","#7fd8ff"],["Светлячки","#d4ff6a"],["Гроза с торнадо","#c79bff"]],feature:{title:"Ветер",icon:"leaf",text:"Сносит падающую фигуру вбок — столбик прицела покажет куда"},unlock:3e4,hazardText:"надвигается гроза",particles:"rain",sand:"wet",windHz:1400,breakText:"Стакан снесло грозой",rule:{spread:3,wind:2,pearl:0,tilt:Ze},ruleText:"Ветер сносит фигуру вбок — столбик прицела показывает куда"},{id:"sea",name:"Морское дно",palette:[[58,214,226],[255,122,150],[150,112,255],[255,206,84],[84,204,112],[255,140,70]],scene:[["Коралловый риф","#ff8fb0"],["Затонувший корабль","#ffd27a"],["Кракен","#c58bff"]],feature:{title:"Жемчужины",icon:"pearl",text:"Попадаются в прибывающем песке: полоса с жемчужиной — вдвое больше очков"},unlock:6e4,hazardText:"пробуждается кракен",particles:"ink",sand:"caustic",windHz:110,breakText:"Стакан раздавил кракен",rule:{spread:3,wind:0,pearl:.5,tilt:Ze},ruleText:"В прибывающем песке попадаются жемчужины: полоса с ней — вдвое больше очков"}],Ue=t=>K.find(e=>e.id===t)??K[0],_e="sand.total",Os="sand.world",oe=De,_t=(t,e)=>We(t,e),Tt=()=>Number(oe(_e))||0;function ze(t){const e=Tt(),s=e+t;return _t(_e,String(s)),K.filter(a=>a.unlock>e&&a.unlock<=s)}const St=t=>Tt()>=t.unlock,Xe=t=>`sand.best.${t}`;function Ke(t){const e=oe(Xe(t));return e!==null?Number(e)||0:t==="desert"&&Number(oe("sand.best"))||0}function Us(t,e){_t(Xe(t),String(e))}function pn(t){_t(Xe(t),"0")}function _s(){const t=Ue(oe(Os)??"desert");return St(t)?t:K[0]}function zs(t){_t(Os,t)}function ws(){const t=Math.max(...K.map(e=>e.unlock));Tt()<t&&_t(_e,String(t))}const Xs="sand.tutorial",$n=()=>De(Xs)==="1",mn=()=>We(Xs,"1"),Wt=["#ff6b6b","#ffc94a","#4cb6ff","#5fd99a"],Je='<path class="tj" d="M12 8 V130 Q12 142 24 142 H96 Q108 142 108 130 V8"/>';function ts(t,e,s=6){let a="";return t.forEach((n,r)=>{for(let i=0;i<n;i++){const l=12+r*s,c=140-(i+1)*s;a+=`<rect x="${l}" y="${c}" width="${s}" height="${s}" fill="${e(r,i)}"/>`}}),a}const Mn=t=>[[0,0],[8,0],[8,8],[8,16]].map(([e,s])=>`<rect x="${e}" y="${s}" width="8" height="8" rx="1" fill="${t}"/>`).join("");function gn(){return`<svg class="tpic" viewBox="0 0 120 150" aria-hidden="true">
    ${ts([3,4,4,3,3,2,2,3,4,4,5,5,4,3,3,4],(s,a)=>Wt[(s+a*3)%4])}
    <g class="t1-aim"><rect class="t-col" x="0" y="34" width="16" height="78"/><g class="t-piece">${Mn(Wt[0])}</g></g>
    <g class="t1-finger"><circle r="9" class="t-touch"/><circle r="3.5" class="t-dot"/></g>
    ${Je}
  </svg>`}function yn(){const t=[2,2,3,3,2,3,3,4,4,3,4,4,5,5,4,5],e=ts(t,(a,n)=>Wt[1+(a+n)%3]),s=t.map((a,n)=>`<rect x="${12+n*6}" y="${140-a*6-12}" width="6" height="12" fill="${Wt[0]}"/>`).join("");return`<svg class="tpic" viewBox="0 0 120 150" aria-hidden="true">
    ${e}
    <g class="t2-band">${s}</g>
    <path class="t2-arrows" d="M6 92 H18 M14 88 L18 92 L14 96 M114 80 H102 M106 76 L102 80 L106 84"/>
    <text class="t2-pop" x="60" y="62" text-anchor="middle">+120</text>
    ${Je}
  </svg>`}function vn(){return`<svg class="tpic" viewBox="0 0 120 150" aria-hidden="true">
    <defs><clipPath id="tjar"><path d="M12 8 V130 Q12 142 24 142 H96 Q108 142 108 130 V8Z"/></clipPath></defs>
    <g clip-path="url(#tjar)"><g class="t3-rise">${ts([8,9,9,10,9,8,8,9,10,10,9,9,8,9,10,9],(s,a)=>Wt[(s*2+a)%4])}</g></g>
    <path class="t3-danger" d="M12 30 H108"/>
    <path class="t3-up" d="M60 150 V136 M55 141 L60 136 L65 141"/>
    ${Je}
  </svg>`}const Vt=[{title:"Бросайте фигуры",text:"Выберите фигуру в лотке и ведите пальцем по стакану — светлый столбик покажет, куда она упадёт. Отпустите — и фигура рассыплется в песок.",pic:gn},{title:"Собирайте полосы",text:"Песок одного цвета от стенки до стенки осыпается — ровная полоса или пологая. Несколько полос подряд — комбо. Почти готовая полоса мерцает, а пунктир подскажет, куда её дотянуть.",pic:yn},{title:"Берегите стакан",text:"Время от времени снизу прибывает песок — точки под стаканом считают броски до него. Чем выше песок, тем ближе стихия. Дойдёт до пунктира — стакан разобьётся.",pic:vn}];function Ls(t,e,s,a){let n=0;t.className="overlay tutorial";const r=()=>{mn(),s()},i=()=>{const c=Vt[n],o=n===Vt.length-1;t.innerHTML=`<div class="card tcard">
      <button class="tskip" id="t-skip">Пропустить</button>
      <div class="tpic-wrap">${c.pic()}</div>
      <small class="tstep">${n+1} из ${Vt.length}</small>
      <h2>${c.title}</h2>
      <p class="muted">${c.text}</p>
      <div class="tdots">${Vt.map((h,$)=>`<i class="${$===n?"cur":""}"></i>`).join("")}</div>
      <div class="tnav">
        ${n>0?'<button class="btn ghost" id="t-back">Назад</button>':""}
        <button class="btn" id="t-next">${o?e:"Дальше"}</button>
      </div>
    </div>`,t.querySelector("#t-skip").addEventListener("click",r),t.querySelector("#t-back")?.addEventListener("click",()=>l(-1)),t.querySelector("#t-next").addEventListener("click",()=>o?r():l(1));const f=t.querySelector(".tcard");let u=null;f.addEventListener("pointerdown",h=>{u=h.clientX}),f.addEventListener("pointerup",h=>{if(u===null)return;const $=h.clientX-u;u=null,Math.abs($)>50&&l($<0?1:-1)})},l=c=>{const o=n+c;o<0||o>=Vt.length||(n=o,a?.(),i())};i()}function xn(t,e){let s="";for(let a=0;a<9;a++){const n=a/9*Math.PI*2+Math.random()*.5;let r=t,i=e,l=`M${r} ${i}`;const c=30+Math.random()*50;for(let o=0;o<5;o++){const f=c/5;r+=Math.cos(n+(Math.random()-.5)*.7)*f,i+=Math.sin(n+(Math.random()-.5)*.7)*f*1.5,l+=` L${r.toFixed(1)} ${i.toFixed(1)}`}s+=`<path d="${l}" style="animation-delay:${(a*.03).toFixed(2)}s"/>`}for(const a of[5,11])s+=`<path class="ring" d="M${t-a} ${e} a${a} ${a*1.5} 0 1 0 ${a*2} 0 a${a} ${a*1.5} 0 1 0 ${-a*2} 0"/>`;return`<svg class="cracks" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${s}</svg>`}function Ks(t,e){const s=30+Math.random()*40,a=18+Math.random()*30;t.insertAdjacentHTML("beforeend",xn(s,a));const n=e.toDataURL();return window.setTimeout(()=>{const r=[];for(let c=0;c<7;c++)r.push([c/7*100,0]);for(let c=0;c<7;c++)r.push([100,c/7*100]);for(let c=0;c<7;c++)r.push([100-c/7*100,100]);for(let c=0;c<7;c++)r.push([0,100-c/7*100]);const l=document.createElement("div");l.className="shards";for(let c=0;c<r.length;c++){const[o,f]=r[c],[u,h]=r[(c+1)%r.length],$=document.createElement("div");$.className="shard",$.style.backgroundImage=`url(${n})`,$.style.clipPath=`polygon(${s}% ${a}%, ${o}% ${f}%, ${u}% ${h}%)`,l.appendChild($);const M=(o+u)/2-s,p=(f+h)/2-a,m=Math.hypot(M,p)||1,g=34+Math.random()*46;$.animate([{transform:"translate(0,0) rotate(0deg)"},{transform:`translate(${M/m*g*1.25}px, ${p/m*g*1.25}px) rotate(${(Math.random()-.5)*50}deg)`,offset:.35},{transform:`translate(${M/m*g}px, ${p/m*g}px) rotate(${(Math.random()-.5)*40}deg)`}],{duration:1100+Math.random()*300,easing:"cubic-bezier(.2,.9,.3,1)",fill:"forwards",delay:Math.random()*120}),$.style.animationDelay=`${(-Math.random()*3).toFixed(2)}s`}t.appendChild(l),t.classList.add("broken")},650),2200}function bn(t,e,s){return t.insertAdjacentHTML("beforeend",s),t.animate([{transform:"scale(1, 1)"},{transform:"scale(1, 1)",offset:.45},{transform:"scale(0.93, 1.02)",offset:.6},{transform:"scale(0.97, 1.01)",offset:.72},{transform:"scale(0.88, 1.04)",offset:.9},{transform:"scale(0.9, 1.03)"}],{duration:1300,easing:"ease-in",fill:"forwards"}),window.setTimeout(()=>Ks(t,e),1250),3450}function wn(t){if(!t.classList.contains("broken"))return Re(t),0;const e=[...t.querySelectorAll(".shard")],s=620;return e.forEach((a,n)=>{const r=getComputedStyle(a).transform;a.getAnimations().forEach(i=>i.cancel()),a.style.animation="none",a.animate([{transform:r==="none"?"none":r},{transform:"translate(0,0) rotate(0deg)"}],{duration:s-120,delay:n%7*18,easing:"cubic-bezier(.6,0,.3,1.2)",fill:"forwards"})}),t.querySelector(".cracks")?.animate([{opacity:1},{opacity:0}],{duration:s,fill:"forwards"}),t.querySelector(".crush")?.remove(),t.getAnimations().forEach(a=>a.cancel()),window.setTimeout(()=>{Re(t),t.animate([{filter:"brightness(1.8)"},{filter:"brightness(1)"}],{duration:380,easing:"ease-out"})},s),s+120}function Re(t){t.querySelectorAll(".cracks, .shards, .crush").forEach(e=>e.remove()),t.getAnimations().forEach(e=>e.cancel()),t.classList.remove("broken")}let z=[[0,0,0],...K[0].palette],me=es(z);function es(t){return t.map(([e,s,a])=>{const n=Math.max(e,s,a)/255,r=Math.min(e,s,a)/255,i=(n+r)/2,l=n-r;if(!l)return[e,s,a];const c=l/(1-Math.abs(2*i-1));let o=n===e/255?(s-a)/255/l%6:n===s/255?(a-e)/255/l+2:(e-s)/255/l+4;o=(o*60+22+360)%360;const f=Math.min(.8,i+.06),u=(1-Math.abs(2*f-1))*c,h=u*(1-Math.abs(o/60%2-1)),$=f-u/2,[M,p,m]=o<60?[u,h,0]:o<120?[h,u,0]:o<180?[0,u,h]:o<240?[0,h,u]:o<300?[h,0,u]:[u,0,h];return[Math.round((M+$)*255),Math.round((p+$)*255),Math.round((m+$)*255)]})}const re=(t,e=1)=>`rgba(${z[t].join(",")},${e})`;let x,E=[],S=null,st=d/2,A=null,vt=[],Lt=[],b=0,Z=0,et=0,ie=0,ss=0,rt=!1,se=!1,R=!1,T=!1,ht=3,xt=0,le=!1,dt=2e3,w=K[0],bt=[],ct=0,wt=0,Pt=!1,Js=!1,At=0,Gt=0,ce=!1,Dt=!1,ta=!1,Me=!1,ea=0,de=Date.now();const Ln=15e4;let it=Ut(0),Ht=!1,Ve=new Set,kt=0,fe=0;const kn=1e4,Qn=.85,sa=30;let ge=new Uint8Array(d*y),he=[],ue=new Uint8Array(d*y),at=0,pe=!1,qt=null,U=null,Nt,qe,_,W;const v=t=>W.querySelector(t);function a0(t){W=t,W.innerHTML=`
    <div class="sky" id="sky"></div>
    <div class="app">
      <header class="hud">
        <button class="icon-btn" id="mute" aria-label="Звук"></button>
        <div class="score-sky"><b id="score">0</b><small id="dawn-label"></small></div>
        <button class="icon-btn" id="exit" aria-label="Выйти в меню">${G("home")}</button>
      </header>
      <div class="horizon" aria-label="Путь к рекорду">
        <span class="h-moon">${G("moon")}</span>
        <div class="h-track"><i class="h-fill" id="h-fill"></i><i class="h-sun" id="h-sun">${G("sun")}</i></div>
        <span class="h-best"><small>Рекорд</small><b id="best">${Z}</b></span>
      </div>
      <div class="jar-wrap">
        <div class="jar" id="jar">
          <canvas id="field" width="${d}" height="${y}"></canvas>
          <div class="danger" style="top:${lt/y*100}%"></div>
          <div class="jar-dust"></div>
          <div class="glass"></div>
          <div class="jar-deco" id="jar-deco">${Bs(w.id)}</div>
          <div class="windvane" id="wind"></div>
          <div class="pops" id="pops"></div>
          <div class="combo" id="combo"></div>
          <div class="world-toast" id="world-toast"></div>
        </div>
      </div>
      <div class="rise" id="rise"></div>
      <p class="hint" id="hint">Ведите пальцем по стакану и отпустите — фигура упадёт</p>
      <div class="tray" id="tray">${[0,1,2].map(e=>`
        <div class="slot" data-slot="${e}">
          <canvas width="120" height="90"></canvas>
          <button class="rot" data-rot="${e}" aria-label="Повернуть">${G("rotate")}</button>
        </div>`).join("")}</div>
      <div class="overlay" id="screen"></div>
    </div>`,Nt=v("#field"),qe=Nt.getContext("2d"),_=qe.createImageData(d,y),w=_s(),Z=Ke(w.id),z=[[0,0,0],...w.palette],me=es(z),rn(v("#sky"),w),cn(W,()=>L.thunder()),v("#mute").addEventListener("click",()=>{ft(),Ha(),ks()}),v("#exit").addEventListener("click",()=>{L.pick(),Hn()}),ks(),e0(),document.addEventListener("visibilitychange",()=>document.hidden?ds():fs()),pt.onPause(e=>{Js=e,e?ds():fs()}),x=Ot(),An(),zt(),requestAnimationFrame(oa)}function Bt(t){x=Ot();const e=Math.round(y-t*(y-lt));for(let s=e;s<y;s++)for(let a=0;a<d;a++)x.grid[s*d+a]=1+(a>>3)%3,x.shade[s*d+a]=(a*31+s*17)%$t}function Sn(){x=Ot();for(let t=y-6;t<y;t++)for(let e=0;e<d;e++){const s=t*d+e;x.grid[s]=e<Math.round(d*.7)?1:2+((e>>3)+t)%2,x.shade[s]=(e*13+t*7)%$t}}function Te(t){for(let e=0;e<t;e++){const s=y-1-e*6;for(let a=s;a>s-6;a--)for(let n=0;n<d;n++)x.grid[a*d+n]=1+e%3,x.shade[a*d+n]=(n*13+a*7)%$t}rt=!0}function B(){(!R||T)&&Yt()}[...K.map(t=>["Миры",t.name,()=>{ws(),aa(t)}])];function Mt(){const t=W.querySelector(".dev-rules"),e=Q.tilt?`наклон ≤${Q.tilt.slope}, изгиб ≤${Q.tilt.bend}`:Q.maxSpan>100?"любая":`ровная ≤${Q.maxSpan}`;t&&(t.textContent=`Песок ${Q.spread} · полоса: ${e}`)}function ks(){v("#mute").innerHTML=G(Aa()?"soundOff":"soundOn")}function An(){const t=Math.random;for(let e=0;e<9;e++){const s=Ye(t,3),a=Oe(s,Math.floor(t()*(d-mt(s.shape).w*F)));a.y=ka(x,a),Vs(x,a,t);for(let n=0;n<120;n++)Ne(x,t,n%2===0)}}const N=t=>t.toLocaleString("ru-RU");function zt(){const t=v("#screen");W.querySelector(".app").classList.add("menu");const e=t.querySelector(".wcards")?.scrollLeft??null;t.className="overlay start-screen";const s=Tt(),a=K.map(c=>{const o=St(c),f=Math.min(1,s/c.unlock),u=o?Ke(c.id):0;return`<button class="wcard ${c===w?"cur":""} ${o?"":"locked"}" data-world="${c.id}" aria-label="${c.name}">
      <span class="wthumb">${un(c.id)}${o?"":`<span class="wlock-ic">${G("lock")}</span>`}</span>
      <b>${c.name}</b>
      ${o?`<small class="wrec">${u?`${G("sun")}${N(u)}`:"ещё не играли"}</small>`:`<span class="wbar"><i style="width:${(f*100).toFixed(1)}%"></i></span><small>${N(s)} из ${N(c.unlock)}</small>`}
    </button>`}).join(""),n=St(w);t.innerHTML=`<div class="start">
    <header class="logo">
      <h1><span>Сыпучка</span></h1>
      <p>Соберите полосу одного цвета от стенки до стенки — она осыплется</p>
    </header>
    <div class="menu-panel">
      <div class="wtitle"><small>${n?"Мир":"Мир закрыт"}</small><b>${w.name}</b>
        <div class="wscene">${w.scene.map(([c,o])=>`<span style="--c:${o}">${c}</span>`).join("")}</div>
      </div>
      <div class="wfeature">
        <span class="wf-ic">${G(w.feature.icon)}</span>
        <span class="wf-txt"><small>Особенность мира</small><b>${w.feature.title}</b><span>${w.feature.text}</span></span>
      </div>
      <div class="wcards">${a}</div>
      ${n?'<button class="btn play" id="play">Играть</button>':`<button class="btn play" id="play" disabled>${G("lock")}Наберите ещё ${N(w.unlock-s)} очков</button>`}
      <div class="menu-foot">
        <button class="link" id="how">${G("help")}Как играть</button>
        <span>${n&&Z?`Рекорд мира: <b>${N(Z)}</b>`:"Рекорда пока нет"}</span>
      </div>
    </div>
  </div>`,v("#play").addEventListener("click",()=>{ft(),$n()?Yt():Ls(v("#screen"),"Играть",Yt,()=>L.pick())}),v("#how").addEventListener("click",()=>{L.pick(),Ls(v("#screen"),"Понятно",zt,()=>L.pick())});const r=t.querySelector(".wcards");r.querySelectorAll(".wcard").forEach(c=>c.addEventListener("click",()=>{const o=Ue(c.dataset.world);o!==w&&(L.pick(),aa(o,!0))}));const i=r.querySelector(".wcard.cur"),l=i?i.offsetLeft-(r.clientWidth-i.offsetWidth)/2:0;e!==null?(r.scrollLeft=e,r.scrollTo({left:l,behavior:"smooth"})):r.scrollLeft=l}function Hn(){if(!R)return;if(T){Be();return}Pt=!0;const t=v("#screen");t.className="overlay",t.innerHTML=`<div class="card exit-ask">
    <small class="muted up">Пауза</small>
    <h2>Выйти в меню?</h2>
    <p class="muted">Партия закончится. ${b?`Набранные ${N(b)} очков пойдут в копилку миров${b>Z?" и станут новым рекордом":""}.`:"Очков в ней пока нет."}</p>
    <button class="btn" id="resume">Продолжить</button>
    <button class="btn ghost" id="leave">Выйти в меню</button>
  </div>`,v("#resume").addEventListener("click",()=>{L.pick(),Pt=!1,t.className="overlay hidden"}),v("#leave").addEventListener("click",()=>{L.pick(),b>Z&&(Z=b,Us(w.id,Z)),bt=ze(b-At),At=b,Pt=!1,Be()})}function Be(){R=!1,T=!1,Pt=!1,A=null,Y(),zt()}function as(t){w=t,Z=Ke(t.id),Q.spread=t.rule.spread,Q.tilt=t.rule.tilt,z=[[0,0,0],...t.palette],me=es(z),E.length&&Et(),wt=0,ns(),Ps(t),Y()}function aa(t,e=!1){St(t)&&zs(t.id),as(t),(!R||e)&&zt()}function Yt(){St(w)||as(_s()),bt=[],At=0,Gt=Z,ce=!1,Dt=!1,x=Ot(),A=null,vt=[],Lt=[],b=0,et=0,ie=0,ss=0,ht=3,T=!1,le=!1,Pe=0,ct=0,it=Ut(0),Ht=!1,kt=0,fe=0,Ve=new Set,ge=new Uint8Array(d*y),he=[],ue=new Uint8Array(d*y),dt=Z>0?Z:2e3,R=!0,rt=!1,st=(d-F*2)/2,na(),v("#screen").className="overlay hidden",W.querySelector(".app").classList.remove("menu"),Q.spread=w.rule.spread,Q.tilt=w.rule.tilt,v("#hint").textContent=w.ruleText||"Ведите пальцем по стакану и отпустите — фигура упадёт",v("#hint").classList.remove("gone"),Ct(),Re(v("#jar")),Y()}function na(){E=[0,1,2].map(()=>Ye(Math.random,ht));const t=w.rule.wind;wt=t?Math.floor(Math.random()*(t*2+1))-t:0,ns(),ut(0),Tn()}function Zn(t){if(E[t]=Ye(Math.random,ht),w.rule.wind&&ct%3===0){const s=w.rule.wind;wt=Math.floor(Math.random()*(s*2+1))-s,ns()}const e=W.querySelectorAll(".slot")[t];e&&(e.classList.remove("arrive"),e.style.setProperty("--d","0.05s"),e.offsetWidth,e.classList.add("arrive"),L.pick())}function Tn(){L.refill();const t=v("#tray");t.classList.remove("refresh"),t.offsetWidth,t.classList.add("refresh"),W.querySelectorAll(".slot").forEach((e,s)=>{e.classList.remove("arrive","spent"),e.style.setProperty("--d",`${s*.09}s`),e.offsetWidth,e.classList.add("arrive"),e.querySelectorAll(".grain").forEach(a=>a.remove());for(let a=0;a<9;a++){const n=document.createElement("i");n.className="grain",n.style.left=`${18+Math.random()*64}%`,n.style.setProperty("--gd",`${s*.09+Math.random()*.25}s`),n.style.setProperty("--gx",`${(Math.random()-.5)*30}px`),e.appendChild(n)}window.setTimeout(()=>e.querySelectorAll(".grain").forEach(a=>a.remove()),1300)})}function ns(){const t=v("#wind");if(!w.rule.wind||!R){t.className="windvane",t.innerHTML="";return}const e=Math.abs(wt);t.className=`windvane on ${wt<0?"left":""}`,t.innerHTML=e?`<span class="wv-leaf">${G("leaf")}</span><b>${"<i></i>".repeat(e)}</b>`:'<span class="wv-calm">штиль</span>'}function ut(t){S=t,S!==null&&!E[S]&&(S=E.findIndex(e=>e)),S===-1&&(S=null),os(),Et()}function os(){const t=S!==null?E[S]:null,e=t?mt(t.shape).w*F:F;st=Math.max(0,Math.min(d-e,Math.round(st)))}let Qs=0;function oa(t){if(requestAnimationFrame(oa),t-Qs<15)return;Qs=t,xt++,Cn();const e=Pt||Js;pt.gameplay(R&&!T&&!e),R&&!T&&!e?En():e||Ne(x,Math.random,xt%2===0),Xn(),Yn()}function Cn(){let t=0;if(R){if(T)t=1;else if(xt%6===0||xt<3){let a=y;for(let r=0;r<y&&a===y;r++){const i=r*d;for(let l=0;l<d;l++)if(x.grid[i+l]&&!x.flash[i+l]){a=r;break}}const n=(y-a)/(y-lt);Pe=Math.max(0,Math.min(1,(n-.5)/.45))}t=T?1:Pe}const e=at+(t-at)*.04;Math.abs(e-at)>.002&&(at=e,ln(at),Za(at,w.windHz)),R&&!T&&at>.6&&Math.random()<.004*at&&t0();const s=R&&!T&&at>.55;s!==pe&&(pe=s,document.documentElement.dataset.storm=s?"on":"off",Y())}let Pe=0;function En(){if(A){A.vy=Math.min(A.vy+.4,7);let s=Math.floor(A.vy);for(;s-- >0;)if(!Rs(x,A,wt)){A.piece.fire?Fn(A):(Vs(x,A,Math.random),L.drop()),A=null,rt=!0,se=!1;break}}let t=0;for(let s=0;s<3;s++)t+=Ne(x,Math.random,(xt+s)%2===0);if(xt%3===0)for(const s of Ma(x))Vn(s);xt%10===0&&Rn();const e=performance.now();if(vt=vt.filter(s=>{if(e-s.at<300)return!0;la(s);for(const a of s.cells)x.grid[a]=0,x.flash[a]=0,ge[a]=0;return!1}),t===0&&!A&&vt.length===0&&rt){if(rt=!1,!se&&et>0&&(et=0,Y()),Ht){Ht=!1,va(x,xa,ht,Math.random,w.rule.pearl),it=Ut(ct),L.rise(),_n(),Ct(),rt=!0,se=!0;return}ba(x)?Ge():jn()}}function jn(){if(kt>=2||kt===1&&b-fe<kn||E.some(s=>s?.fire)||ct<sa||wa(x)>lt+(y-lt)*(1-Qn))return;kt++,fe=b;const t=[2,1,0].find(s=>s!==S)??2;E[t]=Cs(),S===null||!E[S]?ut(t):Et();const e=W.querySelectorAll(".slot")[t];e?.classList.remove("arrive","spent"),e?.offsetWidth,e?.classList.add("arrive"),Qt("Огонь! Прожигает до дна"),L.fire()}function Fn(t){const e=Es(x,t),s=performance.now(),a=new Map;for(const n of e){x.flash[n]=1,ge[n]=1;const r=Math.floor((Math.floor(n/d)-t.y)/6);a.has(r)||a.set(r,[]),a.get(r).push(n)}for(const[n,r]of a)vt.push({cells:r,at:s+n*45,color:1,fire:!0});L.fire(),ca()}function Rn(){he=ga(x).almost,ue=new Uint8Array(d*y);for(const t of he)for(const e of t.cells)ue[e]=1}function Vn(t){const e=x.grid[t[0]];for(const n of t)x.flash[n]=1;if(vt.push({cells:t,at:performance.now(),color:e}),et++,ss++,R&&!T){const n=Ut(ct);if(it<n){it++,it>0&&(Ht=!1),Ct();const r=v("#rise");r.classList.remove("pushed"),r.offsetWidth,r.classList.add("pushed")}}ie=Math.max(ie,et),se=!0;const s=ya(x,t),a=Math.round(t.length/4)*et*(s?2:1);b+=a,b>=2e3&&ht<4&&(ht=4),b>=8e3&&ht<5&&(ht=5),L.clear(et),Is(re(e,.55)),Kn(t,a),s?(Qt("Жемчужина ×2"),L.record()):et>=2&&Qt(`Комбо ×${et}`),Jn(),!le&&Z>0&&b>Z&&(le=!0,Qt("Рассвет!"),L.record()),(t.length>1200||et>=3)&&ca(),Y()}function Ge(){T=!0,ea++;const t=b>Gt;b>Z&&(Z=b,Us(w.id,Z)),t?L.record():L.over(),bt=[...bt,...ze(b-At)],At=b,S=null,Et(),Ct();let e;w.id==="sea"?(L.thunder(),window.setTimeout(()=>L.crack(),1250),window.setTimeout(()=>L.shatter(),1900),e=bn(v("#jar"),Nt,Ra())):(L.crack(),window.setTimeout(()=>L.shatter(),650),e=Ks(v("#jar"),Nt)),ta=t,window.setTimeout(()=>ra(t),e),Y()}function ra(t){if(!T)return;const e=v("#screen");e.className="overlay",e.innerHTML=`<div class="card">
    <small class="muted up">${t?"Новый рекорд!":w.breakText}</small>
    <p class="big">${b}</p>
    ${Bn(t)}
    <div class="stats">
      <div><b>${ss}</b><small>полос</small></div>
      <div><b>×${ie}</b><small>лучшее комбо</small></div>
      <div><b>${Z}</b><small>рекорд</small></div>
    </div>
    ${qn()}
    ${bt.map(s=>`<div class="opened"><small>Открыт новый мир</small><b>${s.name}</b><button class="btn ghost" data-open="${s.id}">Играть в мире «${s.name}»</button></div>`).join("")}
    ${Pn()}
    <button class="btn" id="again">Ещё раз</button>
    <button class="btn ghost" id="to-menu">Выбрать мир</button>
  </div>`,v("#again").addEventListener("click",()=>{ft(),Ce(()=>Ie(Yt))}),v("#to-menu").addEventListener("click",()=>{L.pick(),Ce(Be)}),e.querySelector("#revive")?.addEventListener("click",()=>{ft(),Gn()}),e.querySelector("#double")?.addEventListener("click",()=>{ft(),Dn()}),W.querySelectorAll("[data-open]").forEach(s=>s.addEventListener("click",()=>{ft();const a=Ue(s.dataset.open);Ce(()=>Ie(()=>{zs(a.id),as(a),Yt()}))}))}function qn(){const t=Tt(),e=K.find(a=>a.unlock>t);if(!e)return`<p class="bank">${G("sun")}<span>Копилка миров: <b>${N(t)}</b> — открыты все миры</span></p>`;const s=Math.min(1,t/e.unlock);return`<div class="bank"><span>Копилка миров: <b>${N(t)}</b> из ${N(e.unlock)}</span>
      <i class="bank-bar"><i style="width:${(s*100).toFixed(1)}%"></i></i>
      <small>до мира «${e.name}» ещё ${N(e.unlock-t)} — очки всех партий складываются</small></div>`}function Bn(t){if(pt.kind==="offline"||ce)return"";const e=Gt-b,s=t?"Рекорд уже ваш — продолжите, и он станет ещё больше":Gt>0&&e<=Gt*.4?`До рекорда не хватило ${N(e)} — продолжить партию?`:"Стихия отступит, партия продолжится";return`<button class="reward hero" id="revive"><span class="rw-ic">${G("ad")}</span><span class="rw-txt"><b>Второй шанс</b><small>${s}</small></span></button>`}function Pn(){if(pt.kind==="offline")return"";const t=[];return!Dt&&b>0?t.push(`<button class="reward" id="double"><span class="rw-ic">${G("ad")}</span><span class="rw-txt"><b>×2 в копилку миров</b><small>ещё +${N(b)} к открытию миров</small></span></button>`):Dt&&t.push(`<p class="rw-done">${G("sun")}Копилка удвоена: +${N(b)}</p>`),t.length?`<div class="rewards">${t.join("")}</div>`:""}function Ie(t){v("#screen").className="overlay hidden";const e=wn(v("#jar"));if(!e){t();return}L.mend(),window.setTimeout(t,e)}function Zt(t){Me=t,v("#screen").querySelectorAll("button").forEach(e=>{e.disabled=t})}async function Ce(t){Me||(ea>=2&&Date.now()-de>Ln&&pt.kind!=="offline"&&(Zt(!0),await pt.interstitial(),de=Date.now(),Zt(!1)),t())}async function Gn(){if(Me||ce||!T)return;Zt(!0);const t=await pt.rewarded();Zt(!1),t&&(ce=!0,de=Date.now(),Ie(In))}function In(){Wn(),T=!1,A=null,vt=[],rt=!0;const t=E.findIndex(e=>e);t<0?na():ut(t),Et(),Ct(),Y(),L.rise(),Qt("Второй шанс!")}function Wn(){const t=y-Math.round((y-lt)*.5),e=new Map;for(let s=0;s<t*d;s++){const a=x.grid[s];a&&(e.has(a)||e.set(a,[]),e.get(a).push(s),x.grid[s]=0,x.flash[s]=0)}for(const[s,a]of e)la({cells:a,color:s})}async function Dn(){if(Me||Dt||!T)return;Zt(!0);const t=await pt.rewarded();Zt(!1),t&&(Dt=!0,de=Date.now(),bt=[...bt,...ze(b)],L.record(),ra(ta))}function Nn(t,e){const s=_.data,a=t%d,n=t/d|0,r=.75+.25*Math.sin(e/240+t);for(let i=-1;i<=1;i++)for(let l=-1;l<=1;l++){const c=a+l,o=n+i;if(c<0||c>=d||o<0||o>=y)continue;const f=(o*d+c)*4,u=l===0&&i===0?r:.35*r;s[f]=s[f]*(1-u)+250*u,s[f+1]=s[f+1]*(1-u)+240*u,s[f+2]=s[f+2]*(1-u)+255*u,s[f+3]=255}}function Yn(){const{grid:t,shade:e,flash:s}=x,a=_.data,n=performance.now(),r=Math.floor(n/60)%2===0,i=.5+.5*Math.sin(n/160),l=[];for(let o=0;o<y;o++){const f=o/y,u=22-f*8,h=16-f*6,$=44-f*12,M=150+f*60;for(let p=0;p<d;p++){const m=o*d+p,g=m*4,V=t[m];if(!V){a[g]=u,a[g+1]=h,a[g+2]=$,a[g+3]=M;continue}if(ge[m]&&s[m]){ia(g,p,o,n);continue}if(s[m]&&r){a[g]=a[g+1]=a[g+2]=255,a[g+3]=255;continue}const C=o===0||!t[m-d],P=!C&&o>1&&!t[m-2*d];let H=.8+e[m]/255*.26;if(C?H+=.28:P&&(H+=.12),ue[m]&&(H+=.18+i*.32),w.sand==="sparkle"&&C&&(m*2654435761+(n/220|0)*97>>>0)%23===0)H+=.9;else if(w.sand==="wet")H=C?H+.15:H*.9;else if(w.sand==="caustic"){const ls=Math.sin(p*.42+n/650)+Math.sin(o*.33+p*.17-n/900);ls>1.15&&(H+=(ls-1.15)*(C?.55:.32))}const X=e[m]%5,[Xt,J,is]=z[V],[da,fa,ha]=me[V],ye=X===0?1:X===1?.5:0,ua=Xt+(da-Xt)*ye,pa=J+(fa-J)*ye,$a=is+(ha-is)*ye;a[g]=Math.min(255,ua*H),a[g+1]=Math.min(255,pa*H),a[g+2]=Math.min(255,$a*H),a[g+3]=255,e[m]===$t&&l.push(m)}}for(const o of l)Nn(o,n);if(R&&!T)for(const o of he)On(o,i);const c=!T&&R&&S!==null?E[S]:null;if(c&&!A){const o=Oe(c,st),{w:f,h:u}=mt(c.shape),h=[],$={...o,fell:0};for(;Rs(x,$,wt);)h.push($.x);const M=$.y,p=u*F;c.fire?(Ss(m=>h[Math.min(h.length-1,m-p-o.y-1)]??st,f*F,o.y+p,M,0),Un({...o,x:$.x,y:M},n),As(o.cells,st,o.y,n)):(Ss(m=>h[Math.min(h.length-1,m-p-o.y-1)]??st,f*F,o.y+p,M,c.color),Hs(o.cells,st,o.y,c.color,1))}A?.piece.fire?As(A.cells,A.x,A.y,n):A&&Hs(A.cells,A.x,A.y,A.piece.color,1);for(const o of Lt){const f=Math.round(o.x),u=Math.round(o.y);if(f<0||f>=d||u<0||u>=y)continue;const h=(u*d+f)*4,[$,M,p]=o.fire?rs[Math.min(2,Math.floor((1-o.life)*3))]:z[o.color],m=Math.min(1,o.life);a[h]=a[h]*(1-m)+Math.min(255,$+90)*m,a[h+1]=a[h+1]*(1-m)+Math.min(255,M+90)*m,a[h+2]=a[h+2]*(1-m)+Math.min(255,p+90)*m}qe.putImageData(_,0,0)}function On(t,e){const s=_.data,[a,n,r]=z[t.color],i=.45+e*.5,l=(o,f)=>{if(f<0||f>=y)return;const u=f*d+o;if(x.grid[u])return;const h=u*4;s[h]=s[h]*(1-i)+a*i,s[h+1]=s[h+1]*(1-i)+n*i,s[h+2]=s[h+2]*(1-i)+r*i},c=(o,f,u)=>{for(let h=o;h<=f;h++){if((h>>1)%2)continue;let $=y;for(let p=lt;p<y;p++)if(x.grid[p*d+h]){$=p;break}const M=$>u?u:$-2;l(h,M),l(h,M-1)}};t.minX>0&&c(0,t.minX-1,t.leftY),t.maxX<d-1&&c(t.maxX+1,d-1,t.rightY)}function Ss(t,e,s,a,n){const r=_.data,[i,l,c]=n?z[n]:rs[1];for(let o=Math.max(0,s);o<Math.min(y,a);o++){const f=t(o);for(let u=Math.max(0,f);u<Math.min(d,f+e);u++){if(x.grid[o*d+u])continue;const h=(o*d+u)*4;r[h]=r[h]*.88+i*.12,r[h+1]=r[h+1]*.88+l*.12,r[h+2]=r[h+2]*.88+c*.12}}}const rs=[[255,226,120],[255,140,40],[214,52,30]];function ia(t,e,s,a){const n=_.data,r=Math.sin(e*1.7+a/70)+Math.sin(s*1.3-a/55)+Math.sin((e+s)*.9+a/90),[i,l,c]=rs[r>1?0:r>-.6?1:2];n[t]=i,n[t+1]=l,n[t+2]=c,n[t+3]=255}function As(t,e,s,a){for(const[n,r]of t){const i=e+n,l=s+r;if(i<0||i>=d||l<0||l>=y)continue;const c=(l*d+i)*4;ia(c,i,l,a);const o=n%F,f=r%F;(o===0||f===0)&&(_.data[c]=255,_.data[c+1]=236,_.data[c+2]=170)}}function Un(t,e){const s=_.data,a=.32+.12*Math.sin(e/120);for(const n of Es(x,t)){const r=n*4;s[r]=s[r]*(1-a)+255*a,s[r+1]=s[r+1]*(1-a)+70*a,s[r+2]=s[r+2]*(1-a)+30*a}}function Hs(t,e,s,a,n,r){const i=_.data,[l,c,o]=z[a];for(const[f,u]of t){const h=e+f,$=s+u;if(h<0||h>=d||$<0||$>=y)continue;const M=f%F,p=u%F;let m=1;M===0||p===0?m=1.28:(M===F-1||p===F-1)&&(m=.72);const g=($*d+h)*4;i[g]=i[g]*(1-n)+Math.min(255,l*m)*n,i[g+1]=i[g+1]*(1-n)+Math.min(255,c*m)*n,i[g+2]=i[g+2]*(1-n)+Math.min(255,o*m)*n}}function Ct(){const t=v("#rise");if(!R||T){t.innerHTML="";return}const e=Ut(ct),s=Math.max(0,it),a=Array.from({length:e},(n,r)=>`<i class="${r<s?"on":""} ${s===1&&r===0?"last":""}"></i>`).join("");t.innerHTML=`<span>${s<=0?"Песок поднимается!":s===1?"Песок поднимется после этого броска":`Песок поднимется через ${s}`}</span><b>${a}</b>`,t.classList.toggle("warn",s<=1)}function _n(){v("#jar").animate([{translate:"0 0"},{translate:"0 5px"},{translate:"-2px -3px"},{translate:"2px 2px"},{translate:"0 0"}],{duration:420,easing:"ease-out"})}function Y(){v("#score").textContent=String(b),v("#best").textContent=String(Math.max(Z,b));const t=R?b/dt:.45;Gs(t);const e=Math.min(1,t);v("#h-fill").style.width=`${e*100}%`,v("#h-sun").style.left=`${e*100}%`,v(".horizon").classList.toggle("dawn",t>=1),v("#score").classList.toggle("dawn",t>=1);const s=Math.max(0,dt-b),a=v("#dawn-label");a.textContent=R?pe?w.hazardText:t>=1?"рассвет — новый рекорд":`до рассвета ${s}`:"",a.classList.toggle("storm",pe)}function zn(){const t=v("#hint");!T&&E.some(s=>s?.fire)?(t.textContent="Огненная фигура сжигает весь песок под собой до дна — бросьте её, где выше всего",t.classList.add("fire-hint"),t.classList.remove("gone")):t.classList.contains("fire-hint")&&(t.classList.remove("fire-hint"),t.classList.add("gone"))}function Et(){zn(),W.querySelectorAll(".slot").forEach((t,e)=>{const s=t.querySelector("canvas"),a=s.getContext("2d");a.clearRect(0,0,s.width,s.height);const n=E[e];if(t.classList.toggle("empty",!n),t.classList.toggle("sel",S===e&&!!n&&!T),t.classList.toggle("fire",!!n?.fire),t.style.setProperty("--c",n?n.fire?"rgb(255,140,40)":re(n.color):"transparent"),!n)return;const{w:r,h:i}=mt(n.shape),l=Math.min((s.width-16)/r,(s.height-16)/i,26),c=(s.width-r*l)/2,o=(s.height-i*l)/2;for(const[f,u]of n.shape){const h=c+f*l,$=o+u*l;if(n.fire){const p=a.createLinearGradient(h,$+l,h,$);p.addColorStop(0,"#d6341e"),p.addColorStop(.55,"#ff8c28"),p.addColorStop(1,"#ffe278"),a.fillStyle=p,a.beginPath(),a.roundRect(h+1.5,$+1.5,l-3,l-3,4),a.fill(),a.fillStyle="rgba(255,248,200,.85)";for(let m=0;m<3;m++){const g=h+l*(.25+m*.25);a.beginPath(),a.moveTo(g-3,$+l*.62),a.quadraticCurveTo(g,$+l*(.2+m%2*.1),g+3,$+l*.62),a.fill()}continue}const M=a.createLinearGradient(h,$,h+l,$+l);M.addColorStop(0,re(n.color)),M.addColorStop(1,`rgba(${z[n.color].map(p=>Math.round(p*.72)).join(",")},1)`),a.fillStyle=M,a.beginPath(),a.roundRect(h+1.5,$+1.5,l-3,l-3,4),a.fill(),a.fillStyle="rgba(255,255,255,.35)",a.fillRect(h+4,$+3,l-8,2.5),a.fillStyle=`rgba(${me[n.color].join(",")},.9)`;for(let p=0;p<7;p++)a.fillRect(h+3+(p*7+f*5)%(l-6),$+6+(p*11+u*3)%(l-9),2,2)}})}function la(t){const e=Math.min(160,Math.ceil(t.cells.length/10));for(let s=0;s<e;s++){const a=t.cells[Math.floor(Math.random()*t.cells.length)];Lt.push({x:a%d,y:Math.floor(a/d),vx:(Math.random()-.5)*1.6,vy:-Math.random()*2.2-.4,life:1,color:t.color,fire:t.fire})}}function Xn(){for(const t of Lt)t.x+=t.vx,t.y+=t.vy,t.vy+=.08,t.life-=.025;Lt=Lt.filter(t=>t.life>0)}function Kn(t,e){let s=0;for(const n of t)s+=Math.floor(n/d);const a=document.createElement("div");a.className="pop",a.style.top=`${s/t.length/y*100}%`,a.textContent=`+${e}`,v("#pops").appendChild(a),setTimeout(()=>a.remove(),1100)}function Jn(){const t=Tt()+b-At,e=K.find(a=>a.unlock>0&&a.unlock<=t&&!St(a)&&!Ve.has(a.id));if(!e)return;Ve.add(e.id);const s=v("#world-toast");s.innerHTML=`<small>Открыт новый мир</small><b>${e.name}</b><span>сыграть в нём можно после партии</span>`,s.classList.remove("show"),s.offsetWidth,s.classList.add("show"),L.record()}function Qt(t){const e=v("#combo");e.textContent=t,e.classList.remove("show"),e.offsetWidth,e.classList.add("show")}function t0(){v("#jar").animate([{translate:"0 0",rotate:"0deg"},{translate:"4px 0",rotate:"0.6deg"},{translate:"-2px 0",rotate:"-0.3deg"},{translate:"0 0",rotate:"0deg"}],{duration:500,easing:"ease-out"})}function ca(){v("#jar").animate([{translate:"0 0"},{translate:"-6px 3px"},{translate:"6px -3px"},{translate:"-3px 2px"},{translate:"0 0"}],{duration:300})}const ae=()=>R&&!T;function Ee(t){const e=S!==null?E[S]:null;if(!e)return;const s=Nt.getBoundingClientRect(),a=mt(e.shape).w*F;st=(t-s.left)/s.width*d-a/2,os()}function e0(){const t=v("#jar");t.addEventListener("pointerdown",e=>{ft(),!(!ae()||S===null||A)&&(t.setPointerCapture(e.pointerId),qt=e.pointerId,Ee(e.clientX))}),t.addEventListener("pointermove",e=>{qt===e.pointerId&&Ee(e.clientX)}),t.addEventListener("pointerup",e=>{if(qt!==e.pointerId)return;qt=null;const s=t.getBoundingClientRect();e.clientX>=s.left&&e.clientX<=s.right&&e.clientY>=s.top&&e.clientY<=s.bottom&&Ts()}),t.addEventListener("pointercancel",()=>{qt=null}),W.querySelectorAll(".slot").forEach(e=>{const s=Number(e.dataset.slot);e.addEventListener("pointerdown",n=>{ft(),!(!ae()||!E[s])&&(n.target.closest(".rot")||(e.setPointerCapture(n.pointerId),U={pointer:n.pointerId,slot:s,x0:n.clientX,y0:n.clientY,moved:!1}))}),e.addEventListener("pointermove",n=>{!U||U.pointer!==n.pointerId||(!U.moved&&Math.hypot(n.clientX-U.x0,n.clientY-U.y0)>12&&(U.moved=!0,S!==s&&(ut(s),L.pick())),U.moved&&Ee(n.clientX))});const a=n=>{if(!U||U.pointer!==n.pointerId)return;const r=U;if(U=null,!r.moved){S===s?Zs(s):(ut(s),L.pick());return}const i=v("#tray").getBoundingClientRect().top;n.type==="pointerup"&&n.clientY<i&&Ts()};e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a),e.querySelector(".rot").addEventListener("click",n=>{n.stopPropagation(),!(!ae()||!E[s])&&(S!==s&&ut(s),Zs(s))})})}function Zs(t){const e=E[t],s=js(e.shape);s&&(e.shape=s,os(),L.rotate(),Et())}function Ts(){if(S===null||A||!ae())return;const t=E[S];A=Oe(t,st);const e=W.querySelectorAll(".slot")[S];e?.classList.remove("spent"),e?.offsetWidth,e?.classList.add("spent"),ct++,t.fire||it--,it<=0&&(Ht=!0),Ct(),v("#hint").classList.add("gone"),Zn(S),ut(S)}export{a0 as mount};
