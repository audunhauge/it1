// @ts-check
import { updateMyProperties, thingsWithId, preCalc } from "../lib/Minos.js";
const {random} = Math;

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { kjop,bynavn } = thingsWithId();

preCalc();  // eventuelle beregninger som {3+4}
// de som kan beregnes uten brukerinput oppdateres nå

const byliste = "haugesund,bergen,os".split(",");
const pizzaliste = [
    {pizza:"drengen",pris:120},
    {pizza:"diavolo",pris:220},
    {pizza:"marguerita",pris:90},
];

bynavn.onkeyup = () => {
   const fu = byliste.find(b => b.includes(web.bynavn.toLowerCase()));
   if (fu) {
       web.funnet = fu;
   }
}

pizz.onkeyup = () => {
    const fu = pizzaliste.find(p => p.pizza.includes(web.pizz.toLowerCase()));
    if (fu) {
        web.valgt = fu.pizza;
        web.pris = fu.pris;
    }
 }

kjop.onclick = () => {
    web.handlekorg.push( {pizza:web.valgt, pris:web.pris} );
}
