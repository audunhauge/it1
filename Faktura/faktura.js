// @ts-check
import { updateMyProperties, thingsWithId, create } from "../lib/Minos.js";

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { minfak } = thingsWithId();

web.opacity = 50;

function tekstlinjer(tekst,id) {
    const linjer = tekst.split(";");
    const div = create("div");
    let s = "";
    for (let i=0; i<linjer.length; i++) {
        const linje = linjer[i];
        s += `<div>${linje}</div>`;
    }
    div.innerHTML = s;
    div.className = "tekstboks";
    div.id = id;
    return div;
}

function tekstOgTall(tekst,id) {
    const linjer = tekst.split(";");
    const div = create("div");
    let s = "";
    for (let i=0; i<linjer.length; i++) {
        const linje = linjer[i];
        const [tex,tall] = linje.split("#");
        s += `<div><span>${tex}</span><span>${tall}<span></div>`;
    }
    div.innerHTML = s;
    div.className = "tekstboks medtall";
    div.id = id;
    return div;
}

minfak.append(tekstlinjer("Retur:;Fiken-demo;testv;1234 OSLO","retur"));
minfak.append(tekstlinjer("Nota Ing Notøy;Gusta 6a;6028 GURSKEN","kunde"));

minfak.append(tekstOgTall("Forfallsdato#19.01.20222;Kontonr.#1234 56 78903;Å betale#20 000.00","forfall"));
minfak.append(tekstOgTall("Fakturanr#222;Dato#05.01.2022;Kundenr#10002","faknr"));
