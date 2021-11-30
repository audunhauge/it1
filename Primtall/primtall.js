// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();

const { kvad, vis, algoritme } = thingsWithId();

const primtall = (n) => {
    if (n % 2 === 0) return false;
    for (let i=3; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

const kvadratTall = (n) => {
    const rest = Math.sqrt(n) % 1 // vil være 0 dersom kvadrat
    if (rest === 0) {
        return true;
    } else {
        return false;
    }
}

const kubikkTall = (n) => {
    const rest = Math.pow(n,1/3) % 1 // vil være 0 eller 0.9999 dersom kubikk
    if (rest === 0 || 1-rest < 0.000001) {
        return true;
    } else {
        return false;
    }
}

vis.onclick = () => {
    if (Number(web.n) > 1 ) {
        algoritme.style.opacity = "1";
        const n = Number(web.n);
        const erPrimtall = primtall(n);
        if (erPrimtall === true) {
            web.muligens = "er";
        } else {
            web.muligens = "er ikke";
        }
    }   
}

kvad.onclick = () => {
    if (Number(web.n) > 1 ) {
        algoritme.style.opacity = "1";
        const n = Number(web.n);
        const erKvadrat = kvadratTall(n);
        if (erKvadrat === true) {
            web.kvadrat = "er kvadrat";
        } else {
            web.kvadrat = "er ikke kvadrat";
        }
    }   
}


