// @ts-check
import { updateMyProperties, thingsWithId, shuffle } from "../lib/Minos.js";

const web = updateMyProperties();

const { timeplan } = thingsWithId();

for (let nr = 1; nr < 9; nr++) {
    web.timeplan.push({ nr });
}


