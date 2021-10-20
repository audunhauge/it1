// @ts-check

import {updateMyProperties, thingsWithId, prepTheWebPage} from "./Minos.js";

const {main} = thingsWithId();
prepTheWebPage();

const mineTing = updateMyProperties(
    {
        antall:0,
    });

main.addEventListener("click", () => {
    mineTing.antall += 1;
});

mineTing.antall = 0;

export { mineTing};

