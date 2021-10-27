// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();
/** web vil ha en web.xx og web.zz   gitt: <div>{xx} <input name="zz"> {zz} </div>
 * disse vil automatisk oppdateres, web.xx = 1 => {xx} erstattes med 1
 * endring av input oppdaterer web.zz og {zz} (og omvendt)
 */

const { liste, lagre, oppgave } = thingsWithId();

const oppgaveListe = web.getLocalJSON("oppgaver") || [];
const fjernGammelTekst = () => web.oppgave = "";
const setFocusIoppgave = () => oppgave.focus();
const visAlleOppgaver = () => web.oppgavene = web.wrap(oppgaveListe, "li");
const lagreDataPermanent = () => web.setLocalJSON("oppgaver", oppgaveListe);

oppgave.focus();
visAlleOppgaver();

const registrerNyOppgave = () => {
    const nyOppgave = web.oppgave;
    setFocusIoppgave();
    fjernGammelTekst();
    if (nyOppgave === "") {
        return;
    }
    oppgaveListe.push(nyOppgave);
    visAlleOppgaver();
    lagreDataPermanent();
}

lagre.onclick = registrerNyOppgave;
oppgave.onkeypress = e => {
    if (e.key === "Enter") {
        registrerNyOppgave();
    }
}



liste.onclick = (e) => {
    const t = e.target;
    const txt = t.innerText;
    const idx = oppgaveListe.indexOf(txt);
    if (idx >= 0) {
        const siste = oppgaveListe.pop();
        if (oppgaveListe.length > idx) {
            oppgaveListe[idx] = siste;
        }
        visAlleOppgaver();
        lagreDataPermanent();
    }
}





