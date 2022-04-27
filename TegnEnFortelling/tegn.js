// @ts-check

import { updateMyProperties, thingsWithId, qs } from "../lib/Minos.js";

import { Figur, parse, actors } from "./Figurer.js";

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { editor, tegning } = thingsWithId();


// beregner hva 5vw 5vh tilsvarer for dette vinduet
const bod = qs("body");
const bodwh = bod.getBoundingClientRect();
export const sz = { w: bodwh.width * 0.05, h: bodwh.height * 0.05 }

// størrelsen på tegneområdet
export const dimensions = tegning.getBoundingClientRect();

let ting = [];   // alle ting på skjermen
const forskjelligt = {}  // sortert etter typer


let denne = null;   // den siste vi bruker pronomen på



editor.onkeydown = event => {
    const k = event.key;
    if (k === "Enter") {
        tegning.innerHTML = "";
        ting = [];
        denne = null;
        actors.forEach(t => forskjelligt[t] = []);  // lagrer liste for hvert slag
        const text = editor.value;
        const linjer = text.split('\n');
        for (const linje of linjer) {
            const ast = parse(linje);
            makeActor(ast);
        }
    }
}

const drawActor = (actor, ast) => {

    actor.stage(tegning);
    for (const kl of ast.adjectiv) {
        if ("sværtganskeveldigkjempejyslamega".includes(kl)) {
            actor.forsterk = true;
        }
        if ("litenstor".includes(kl)) {
            actor.scale = kl === "liten" ? 0.7 : 1.5;
        } else
            actor.div.classList.add(kl);
    }
    actor.render();
}

const makeActor = ast => {
    let actor;
    // refering to existing thing
    if (ast.subjects.length === 0 || ast.pronomen === "den") {
        if (ast.pronomen === "den") {
            // refering to existing "dog" or ...
            if (ast.subjects.length === 1) {
                const subject = ast.subjects[0];
                const maybe = forskjelligt[subject].slice(-1);
                if (maybe) {
                    actor = maybe[0];
                }
            } else {
                // just the last thing added or previous pronomen
                actor = denne || ting.slice(-1)[0];
            }
            if (actor) {
                denne = actor;
                for (const p of ast.posisjon) {
                    actor.posisjon.add(p);
                }
                drawActor(actor, ast);
            }

        }
        return null;
    }
    if (ast.subjects.length === 1) {
        const s = ast.subjects[0];
        for (let i = 0; i < ast.antall; i++) {
            actor = new Figur(s, ast.posisjon);
            ting.push(actor);              // alle sammen
            forskjelligt[s].push(actor);   // lagra etter type
            drawActor(actor, ast);
            denne = actor;
        }
    } else {
        for (const s of ast.subjects) {
            actor = new Figur(s, ast.posisjon);
            ting.push(actor);
            forskjelligt[s].push(actor);   // lagra etter type
            drawActor(actor, ast);
            denne = actor;
        }
    }
    return actor;
}