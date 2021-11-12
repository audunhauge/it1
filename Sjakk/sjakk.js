// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();

const nyttElement = tag => document.createElement(tag);

const { brett } = thingsWithId();


for (let i=0; i<64; i += 1) {
  const t = Math.trunc(i/8);
  const rute = nyttElement("div");
  brett.append(rute);
  if ((i+t) % 2 === 0) {
    rute.className = "rute kvit";
  } else {
    rute.className = "rute svart";
  }
  if (i<8) {
      rute.className += " bonde";
  }

  rute.innerHTML = i;
}