// @ts-check
import { updateMyProperties, thingsWithId, create } from "../lib/Minos.js";

const web = updateMyProperties({fakturanummer:0});
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { minfak, neste } = thingsWithId();

web.opacity = 50;

function tekstlinjer(tekst, id) {
    const linjer = tekst.split(";");
    const div = create("div");
    let s = "";
    for (let i = 0; i < linjer.length; i++) {
        const linje = linjer[i];
        s += `<div>${linje}</div>`;
    }
    div.innerHTML = s;
    div.className = "tekstboks";
    div.id = id;
    return div;
}

function tekstOgTall(tekst, id, ekstraKlasse = "") {
    const linjer = tekst.split(";");
    const div = create("div");
    let s = "";
    for (let i = 0; i < linjer.length; i++) {
        const linje = linjer[i];
        const [tex, tall] = linje.split("#");
        s += `<div><span>${tex}</span><span>${tall}<span></div>`;
    }
    div.innerHTML = s;
    div.className = `tekstboks ${ekstraKlasse}`;
    div.id = id;
    return div;
}

const MVA = 0.25;
const MMA = 1 + MVA;

const showFaktura = (info) => {
    if (info) {
        web.fakturanummer = FNR;
        minfak.innerHTML = "";
        const { kundenr,linjer } = info;
        const { navn } = kunder[kundenr];
        minfak.append(tekstlinjer("Retur:;Gerd Kristin Høivik;Kløverveien 36;5535 Haugesund", "retur"));
        minfak.append(tekstlinjer(`Nota ;${navn}; `, "kunde"));
        minfak.append(tekstOgTall(`Fakturanr#${FNR};Dato#05.02.2022;Kundenr#${kundenr}`, "faknr"));
        minfak.append(tekstlinjer(`FAKTURA;Oppgi fakturanummer ved betaling;Hjortejakt`, "FAKTURA"));
        const divLinjer = document.createElement("div");
        divLinjer.id = "linjer";
        divLinjer.innerHTML = '<div>' + 'Beskrivelse,Enhetspris,Antall,Mva,Sum'.split(",").map(e => `<div>${e}</div>`).join("") + '</div>';
        minfak.append(divLinjer);
        let netto = 0;
        let mva = 0;
        let tot = 0;
        for (const linje of linjer) {
            const { navn, pris, ant } = linje;
            netto += pris * ant;
            mva += pris * ant * MVA;
            tot += pris * ant * MMA;
            const divLinje = document.createElement("div");
            divLinje.className = "detaljer";
            divLinje.innerHTML = [navn, pris, ant, `${MVA * 100} %`, (pris * ant * MMA).toFixed(2)].map(e => `<div>${e}</div>`).join("");
            divLinjer.append(divLinje);
        }
        divLinjer.append(tekstOgTall(`Netto#${netto.toFixed(2)};
        Mva#${mva.toFixed(2)};
        Å betale#${tot.toFixed(2)};
        Alle beløp i# NOK`, "netto", "medtall"));
        minfak.append(tekstOgTall(`Forfallsdato#19.03.20222;Kontonr.#3330 30 68371;Å betale#${tot.toFixed(2)}`, "forfall"));
    }
}

const kunder = {
    1001:{navn:"Jone Midtbø"},
    1002:{navn:"Vidar Feria"},
}

const liste = [
    { kundenr:1001, linjer: [{ navn: "ku", pris: 2400, ant: 1 }, { navn: "bukk", pris: 4800, ant: 1 }] },
    { kundenr:1002, linjer: [{ navn: "ku", pris: 2400, ant: 1 }] },
]

const BASEFAKTURANR = 100;
let FNR = BASEFAKTURANR - 1;

neste.onclick = () => {
    FNR++;
    let idx = FNR - BASEFAKTURANR;
    if (idx > liste.length-1) {
        FNR = BASEFAKTURANR;
        idx = 0;
    }
    showFaktura(liste[idx]);
}


