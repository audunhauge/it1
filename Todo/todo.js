// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();
const { lagre, opp, liste } = thingsWithId();

// klargjør applikasjonen
// henter gamle data
const oppdrag = web.getLocalJSON('oppdrag') || [];
visLista();
setFokusInput();

// ved klikk på knapp legger vi til et nytt oppdrag
lagre.onclick = leggTilOppdrag;

/**
 * Dersom bruker trykker enter i input
 * da legger vi til teksten som nytt oppdrag
 * @param {any} k 
 */
opp.onkeyup = (k) => {
    if (k.key === 'Enter') {
        leggTilOppdrag();
    }
}

/**
 * Dytter teksten i input:nyoppgave inn i oppdrag lista
 */
function leggTilOppdrag() {
    oppdrag.push(web.nyoppgave);                    // ny oppgave legges til
    lagreData();
    visLista();
    setFokusInput();
}

/**
 * Sletter innhold i input feltet og setter fokus
 */
function setFokusInput() {
    // klargjør for nytt oppdrag
    web.nyoppgave = "";                             // fjerner gammel tekst
    opp.focus();                                    // fokus i input box
}

/**
 * lager en '<li>oppdragtekst</li>' for hvert oppdrag og 
 * oppdaterer {oppgavene} med denne lista
 */
function visLista() {
    web.oppgavene = web.wrap(oppdrag, 'li');         // viser lista 
}

/**
 * Lagrer oppdragslista i localStorage med nøkkel 'oppdrag'
 */
function lagreData() {
    web.setLocalJSON('oppdrag', oppdrag);            // lagrer i localStorage
}

/**
 * Sjekker om vi har klikka på et oppdrag, sletter dersom slik
 * @param {any} e 
 */
liste.onclick = (e) => {
    const t = e.target;
    const txt = t.innerText;
    const idx = oppdrag.indexOf(txt);               // idx er negativ dersom ikke funnet
    if (idx >= 0) {
        oppdrag[idx] = oppdrag[oppdrag.length - 1]; // verdien på siste plass legges inn
        oppdrag.pop();                              // fjern siste element
        visLista();
    }
}