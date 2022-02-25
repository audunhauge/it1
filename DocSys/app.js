// @ts-check

import {velgFiler,linjerMedOrd, lengsteLinje,visFiler, setup} from "./util.js";

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

const words = tekst.split(" ");
const filer = Array(150).fill(0).map((e,i)=>words[i % words.length])

const main = document.querySelector("main");
main.append(visFiler(filer));

setup();