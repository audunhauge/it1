// @ts-check

import {updateMyProperties, thingsWithId, prepTheWebPage} from "./Minos.js";
// må kjøre prep før vi henter ting med id
// bytter ut {navn} med span
prepTheWebPage();
// henter de tingene vi har gitt id på websida
const {pris,kjop} = thingsWithId();


const mineTing = updateMyProperties(
    {
        antall:0,
        poeng:10,
        total:0,
    });

kjop.addEventListener("click", () => {
    mineTing.antall += 1;
    mineTing.poeng -= 1;
    mineTing.total = Number(pris.value) * mineTing.antall;
});

mineTing.antall = 0;
mineTing.poeng = 10.1;


