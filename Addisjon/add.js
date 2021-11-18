// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();


const { vis, algoritme, add } = thingsWithId();

vis.onclick = () => {
    if (web.t1 === undefined || web.t2 === undefined) return;
    web.siffer = 0;
    algoritme.style.opacity = "1";
    //web.c0 = "";web.c1 = "";web.c2 = "";web.c3 = "";web.c4 = "";web.c5 = "";
    //web.s0 = "";web.s1 = "";web.s2 = "";web.s3 = "";web.s4 = "";web.s5 = "";
    const [n0,n1,n2,n3,n4,n5] = Array.from(web.t1).reverse();
    Object.assign(web,{n0,n1,n2,n3,n4,n5});
    const [m0,m1,m2,m3,m4,m5] = Array.from(web.t2).reverse();
    Object.assign(web,{m0,m1,m2,m3,m4,m5});
}

add.onclick = () => {
    const siffer = web.siffer;
    const a = Number(web["n"+siffer]) || 0;
    const b = Number(web["m"+siffer]) || 0;
    const c = Number(web["c"+siffer]) || 0;
    const sum = a+b+c;
    const [x,y] = Array.from(String(sum)).reverse();
    web["s"+siffer] = x;
    web["c"+(siffer+1)] = y || 0;
    web.siffer++;
}
