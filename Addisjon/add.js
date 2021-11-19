// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();

web.pos = 0;



const { vis, algoritme, add } = thingsWithId();

vis.onclick = () => {
    if (Number(web.t1) > 0 && Number(web.t2) > 0) {
        algoritme.style.opacity = "1";
        web.siffer = 0;
        const siffer1 = Array.from(web.t1).reverse();
        const siffer2 = Array.from(web.t2).reverse();
        web.n0 = siffer1[0] || "";
        web.n1 = siffer1[1] || "";
        web.n2 = siffer1[2] || "";
        web.n3 = siffer1[3] || "";
        web.n4 = siffer1[4] || "";
        
        web.m0 = siffer2[0] || "";
        web.m1 = siffer2[1] || "";
        web.m2 = siffer2[2] || "";
        web.m3 = siffer2[3] || "";
        web.m4 = siffer2[4] || "";

    }   
}

add.onclick = () => {
    const s = web.siffer;
    const nr1 = Number(web["n"+s]);  
    const nr2 = Number(web["m"+s]);
    const sum = nr1 + nr2;
    web["s"+s] = sum;  
    web.siffer++;
}
