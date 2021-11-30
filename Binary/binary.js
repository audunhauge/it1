// @ts-check
import { updateMyProperties, thingsWithId, wipe } from "../lib/Minos.js";
const web = updateMyProperties();

const { vis, algoritme, add } = thingsWithId();

// vis knappen krever at bruker skriver inn et tall først
vis.onclick = () => {
    if (Number(web.t1) > 0) {
        algoritme.style.opacity = "1";
        wipe();                     // fjerner innhold fra alle {xx}
        web.siffer = 0;             // startposisjon for add knappen
        web.n = Number(web.t1);     // henter ut brukerens tall
        web.numba.length = 0;       // fjerner evt gamle siffer (tidligere beregninger)
        web.skjulmeg = 'opacity:1';
    }
}

// add - legger til et siffer i binærtallet
add.onclick = () => {
    const n = web.n;                // hent ut verien vi har nu - web.n endres
    const rest = n % 2;             // rest vil være gjeldende siffer - 0 eller 1
    web.numba.push({s:rest});       // legg det inn i numba (autovises)
    web.n = Math.trunc(n / 2);      // n = n/2  forkast desimalene
    web.siffer++;                   // flytt add knappen
    if (web.n === 0) {              // dersom n==0 da er vi ferdige
        web.siffer = 30;            // skjuler knappen
        web.skjulmeg = 'opacity:0';
    }
}