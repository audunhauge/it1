// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { /** ting på websida med id */ } = thingsWithId();

const lukeplass = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for (let i = 1; i < 25; i++) {
    let opptatt = true;
    while (opptatt) {
        const plass = Math.trunc(Math.random() * 24);
        if (lukeplass[plass] === 0) {
            lukeplass[plass] = i;
            opptatt = false;
        }
    }
}
const lukene = document.querySelectorAll(".luke");
for (let i = 0; i < 24; i++) {
    const luka = lukene[i];
    luka.innerHTML = String(lukeplass[i]);
}
