// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();

const { tall } = thingsWithId();

const beregnVerdi = () => {
    const n = Number(web.tall);
    web.svar = n*n;
}

web.svar = 3;

tall.focus();
tall.onkeyup = e => {
    //if(e.key === "Enter") {
        beregnVerdi();
    //}
}
