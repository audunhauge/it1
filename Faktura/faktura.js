// @ts-check
import { updateMyProperties, thingsWithId, create } from "../lib/Minos.js";

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { minfak } = thingsWithId();

web.opacity = 50;

