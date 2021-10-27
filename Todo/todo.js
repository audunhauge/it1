// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { lagre, oppgave } = thingsWithId();

const oppgaveListe = [ ];

const fjernGammelTekst = () => web.oppgave = "";
const setFocusIoppgave = () => oppgave.focus();
const visAlleOppgaver = () => {

}

oppgave.focus();
web.oppgave = "Rydd på rommet";

lagre.onclick = () => {
    const nyOppgave = web.oppgave;
    oppgaveListe.push(nyOppgave);
    visAlleOppgaver();
    setFocusIoppgave();
    fjernGammelTekst();
}




