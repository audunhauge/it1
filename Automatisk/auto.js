// @ts-check

import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

// henter de tingene vi har gitt id på websida
const { kjop } = thingsWithId();

// web variable - endringer av web.x oppdaterer {x} på html-sida
// merk at du kan ha <div> {x} </div>  ---  innerHTML oppdaters
// men ikke <div style="width:{x}px">  --- ting inne i tag'en oppdateres ikke

const web = updateMyProperties();

kjop.addEventListener("click", () => {
    web.antall += 1;
    web.poeng -= 1;
    web.total = 12 * web.antall;
    web.pris = web.total;
});

// setter startverdier - ellers vises en X
web.antall = 0;
web.poeng = 10.1;
web.pris = 3;


