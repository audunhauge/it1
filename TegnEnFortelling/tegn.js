// @ts-check

import { updateMyProperties, thingsWithId, create } from "../lib/Minos.js";

import { AST, Figur, parse } from "./Figurer.js";

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { editor, tegning } = thingsWithId();

editor.value = "hei";

editor.onkeydown = event => {
    const k = event.key;
    if (k === "Enter") {
        tegning.innerHTML = "";
        const text = editor.value;
        const linjer = text.split('\n');
        for (const linje of linjer) {
            const ast = parse(linje);
            if (ast.subjects.length === 1) {
                const s = ast.subjects[0];
                for (let i = 0; i < ast.antall; i++) {
                    const actor = new Figur(s);
                    actor.stage(tegning);
                    actor.render();
                }
            } else {
                for (const s of ast.subjects) {
                    const actor = new Figur(s);
                    actor.stage(tegning);
                    actor.render();
                }
            }


        }
    }
}
