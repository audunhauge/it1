// @ts-check
import { updateMyProperties,prepTheWebPage,thingsWithId } from "./Minos.js";
prepTheWebPage();
const {main} = thingsWithId();
const ting = updateMyProperties({
    antall:0,
})

ting.antall = 0;

main.addEventListener("click", () => {
    ting.antall += 1;
})

export {ting};