// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { t1,t2 } = thingsWithId();

web.t1 =12;
web.t2 = 13;

t2.onkeyup = () => {
    const n = Number(web.t1)
    const m = Number(web.t2)
    const b = Number(web.t2).toString(2).split('').reverse();
    web.binary.length = 0;
    web.binary.push(...b.map((x,i) => ({ x,y:n*2**i,z:Math.trunc(m/(2**i)) })));
}


