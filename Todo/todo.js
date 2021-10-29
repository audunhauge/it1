// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();
const { liste, oppgave } = thingsWithId();

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

oppgave.onkeypress = e => e.key === "Enter" ? registrerNyOppgave() : null;

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

