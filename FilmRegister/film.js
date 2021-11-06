// @ts-check
import { updateMyProperties, thingsWithId } from "../lib/Minos.js";

const web = updateMyProperties();
const { liste, tittel, regnut, n } = thingsWithId();



const phi = (n) => {
    let result = n; // Initialize result as n 
    // Consider all prime factors of n and subtract their 
    // multiples from result 
    for (let p = 2; p * p <= n; ++p) {
        // Check if p is a prime factor. 
        if (n % p === 0) {
            // If yes, then update n and result 
            while (n % p == 0)
                n /= p;
            result -= result / p;
        }
    }
    // If n has a prime factor greater than sqrt(n) 
    // (There can be at-most one such prime factor) 
    if (n > 1)
        result -= result / n;
    return result;
}

const centum = Array(101).fill(0).map((v,i) => i).map(n => n+':'+phi(n));
web.p = centum;


const tallene = Array(101).fill(0);
web.lista = tallene;
regnut.onclick = () => {
 
    for (let k = 1; k < 101; k++)
        for (let i = k; i < 101; i += k) {
            tallene[i] = (tallene[i] + 1) % 2;
        }
    web.lista = tallene.map((v, i) => v ? i : '').join(' ');
  
}


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

