const myModule=(()=>{"use strict";let e=[];const t=["C","D","H","S"],r=["A","J","K","Q"];let n=[];const a=document.querySelector("#btn-order-card"),o=document.querySelector("#btn-stop"),s=(document.querySelector("#btn-new-game"),document.querySelectorAll(".divCards")),l=document.querySelectorAll("small"),c=()=>{let e=[];for(const n of t){for(let t=2;t<=10;t++)e.push(t+n);for(const t of r)e.push(t+n)}return _.shuffle(e)},d=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},u=(e,t)=>(n[t]+=(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:parseInt(t)})(e),l[t].innerText=n[t],n[t]),i=(e,t)=>{const r=document.createElement("img");r.src=`assets/img/cartas/${e}.png`,r.classList.add("card"),s[t].append(r)},m=e=>{let t=0;do{const e=d();t=u(e,n.length-1),i(e,n.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=n;setTimeout(()=>{t===e?alert("Empate"):e>21?alert("La computadora gana!"):t>21?alert("Jugador gana"):alert("La computadora gana!")},60)})()};return a.addEventListener("click",()=>{const e=d(),t=u(e,0);i(e,0),t>21?(a.disabled=!0,o.disabled=!0,m(t)):21===t&&(o.disabled=!0,m(t))}),o.addEventListener("click",()=>{a.disabled=!0,o.disabled=!0,m(n[0])}),{newGame:(t=2)=>{e=c(),n=[];for(let e=0;e<t;e++)n.push(0);l.forEach(e=>e.innerText=0),s.forEach(e=>e.innerHTML=""),a.disabled=!1,o.disabled=!1}}})();