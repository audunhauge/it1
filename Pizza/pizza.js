// @ts-check
import { updateMyProperties, thingsWithId, preCalc } from "../lib/Minos.js";
const { random } = Math;

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { kjop, pizza, by } = thingsWithId();

preCalc();  // eventuelle beregninger som {3+4}
// de som kan beregnes uten brukerinput oppdateres nå


const pizzaliste = [
    { navn: "drengen", pris: 120 },
    { navn: "snadder", pris: 183 },
    { navn: "meksikaneren", pris: 223 },
];

pizza.onkeyup = (e) => {
    const delnavn = web.pizza;
    const treff = pizzaliste.find(p => p.navn.includes(delnavn));
    if (treff) {
        web.pizzanavn = treff.navn;
        web.pris = treff.pris;
    }
}


const byliste = [
    { navn: "frakkagjer", },
    { navn: "haugesund", },
    { navn: "åkra", },
    { navn: "norheim", },
];

by.onkeyup = () => {
    const delnavn = web.by;
    const treff = byliste.find(p => p.navn.includes(delnavn));
    if (treff) {
        web.bynavn = treff.navn;
    }
}

kjop.onclick = () => {
    // vi skal legge pizzaer i en liste og vise på skjermen
    if (web.pizzanavn) {
        web.handlekorg.push(
            { navn: web.pizzanavn, pris: web.pris }
        );
    }
}
