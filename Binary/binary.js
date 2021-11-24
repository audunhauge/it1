// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";
const web = updateMyProperties();

//web.pos = 0;

const { vis, algoritme, add } = thingsWithId();

vis.onclick = () => {
    if (Number(web.t1) > 0 ) {
        algoritme.style.opacity = "1";
        web.siffer = 0;
        web.n = Number(web.t1);
    }   
}

add.onclick = () => {
    const n = web.n;
    const s = web.siffer;
    const rest = n % 2;
    if (rest !== 0) {
        web["s"+s] = "1";  
    } else {
        web["s"+s] = "0";
    }
    web.n = Math.trunc(n/2);
    web.siffer++;
}
