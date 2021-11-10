// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();


const { bestill, bestilling } = thingsWithId();

bestill.onclick = () => {
    bestilling.style.opacity = 1;
}