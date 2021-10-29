// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();
const { liste, tittel } = thingsWithId();

const tittelListe = web.getLocalJSON("filmer") || [];
const fjernGammelTekst = () => {
    web.tittel = "";
    web.regissor = "";
};
const setFocusItittel = () => tittel.focus();
const visAlletittler = () => web.filmene = web.wrap(tittelListe, "li");
const lagreDataPermanent = () => web.setLocalJSON("filmer", tittelListe);

tittel.focus();
visAlletittler();

const registrerNytittel = () => {
    const nytittel = web.tittel;
    const nyregissor = web.regissor;
    setFocusItittel();
    fjernGammelTekst();
    if (nytittel === "") {
        return;
    }
    tittelListe.push(nytittel + " " + nyregissor);
    visAlletittler();
    lagreDataPermanent();
}

regissor.onkeypress = e => e.key === "Enter" ? registrerNytittel() : null;

liste.onclick = (e) => {
    const t = e.target;
    const txt = t.innerText;
    const idx = tittelListe.indexOf(txt);
    if (idx >= 0) {
        const siste = tittelListe.pop();
        if (tittelListe.length > idx) {
            tittelListe[idx] = siste;
        }
        visAlletittler();
        lagreDataPermanent();
    }
}

