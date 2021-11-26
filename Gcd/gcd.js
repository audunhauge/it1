// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();

const { vis, algoritme } = thingsWithId();

const gcd = (a,b) => {
    while(b !== 0) {  
        const t = b
        b = a % b
        a = t
    }
    return a;
}

vis.onclick = () => {
    if (Number(web.a) > 0 && Number(web.b) > 0) {
        algoritme.style.opacity = "1";
        const a = Number(web.a);
        const b = Number(web.b);
        const divisor = gcd(a,b);
        web.divisor = divisor;
    }   
}


