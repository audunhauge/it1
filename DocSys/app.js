// @ts-check

import {velgFiler,linjerMedOrd, lengsteLinje} from "./util.js";

console.log(velgFiler("b.pdf c.pdf c.doc","doc"));

const tekst = `dette er
noen linjer med og med
flere ord og
flere mellomrum og
og my annet`;
console.log(linjerMedOrd(tekst,"og"));

console.log(lengsteLinje(tekst));
console.log(lengsteLinje(""));
console.log(lengsteLinje("1234567890123"));