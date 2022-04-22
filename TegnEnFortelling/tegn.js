// @ts-check

import { updateMyProperties, thingsWithId, create } from "../lib/Minos.js";

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

            if (linje.startsWith("fugl")) {
                // tegn en fuggel
                tegnEnFuggel();
            }

            if (linje.startsWith("katt")) {
                // tegn en fuggel
                tegnEnKatt();
            }

        }
    }
}

function tegnEnFuggel() {
    const div = create("div");
    div.className = "fugl";
    tegning.append(div);
}

function tegnEnKatt() {
    const div = create("div");
    div.className = "katt";
    tegning.append(div);
}