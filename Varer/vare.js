
// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { lagre } = thingsWithId();


lagre.onclick = () => {
    const vare = web.vare;
    const pris = web.pris;
    web.liste.push({vare,pris});
}