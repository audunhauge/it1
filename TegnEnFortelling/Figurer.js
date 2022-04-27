// @ts-check

import { create } from "../lib/Minos.js";

import { dimensions, sz } from "./tegn.js";

const { random } = Math;

export class AST {
    constructor() {
        this.subjects = [];
        this.object = "";
        this.verb = "";
        this.scenic = [];
        this.adverb = "";
        this.adjectiv = [];
        this.antall = 1;
        this.posisjon = [];
        this.pronomen = "";
    }
}

// antar at grafikken til alle figurer ligger i en sprite
// det eneste vi lagrer for å vise bilde er x-y offsett for spriten



export class Figur {
    // start verdi for x,y
    sx = 12;
    sy = 12;
    // (x,y) og bredde høyde,  (x,y) er nedre venstre hjørne
    x = 12;
    y = 12;
    w = 32;
    h = 32;

    scale = 1;

    forsterk = false;

    constructor(type,posisjon) {
        this.type = type;
        this.x = random() * (dimensions.width - 100);
        this.y = random() * (dimensions.height - 100)
        this.posisjon = new Set(posisjon);
        if (!this.posisjon.has("himmel") && ! "fuglsolsky".includes(type)) {
            this.posisjon.add("bakke");
        }
        if (!this.posisjon.has("bakke") &&  "fuglsolsky".includes(type)) {
            this.posisjon.add("himmel");
        }
    }

    stage(target) {
        if (!this.div) {
            const div = create("div");
            this.div = div;
            this.div.className = this.type;
        }
        target.append(this.div);
        this.plassering();
    }

    plassering() {
        if (this.posisjon.has("himmel")) {
            this.y = random() * 100 + 10;
        }
        if (this.posisjon.has("bakke")) {
            this.y = random() * 100 + dimensions.height - 100 - sz.h * 2;
        }
        if (this.posisjon.has("høyre")) {
            this.x = random() * 100 + dimensions.width - 100 - sz.w * 2;
        }
        if (this.posisjon.has("venstre")) {
            this.x = random() * 100 + 20;
        }
        if (this.posisjon.has("midten")) {
            this.x = random() * 100 + dimensions.width / 2 - sz.w * 2;
        }
    }

    render() {
        const { x, y, div, scale, forsterk } = this;
        const skale = forsterk ? scale * scale : scale;
        div.style.transform = `translate(${x}px, ${y}px) scale(${skale})`;
    }

}

export const actors = "mann,gutt,dame,jente,hund,katt,fugl".split(",");
const verbs = "kom,gikk,stod,gående".split(",");
const adverbs = "langsomt,raskt,hurtig".split(",");
const scenic = "dag,natt,lyst,mørkt".split(",");
const adjective = "stor,liten,små,rosa,rød,blå,gul,grønn,brun,veldig".split(",");
const tallord = "en,to,tre,fire,fem,seks,sju,åtte,ni,ti".split(",");
const posisjon = "himmel,bakke,oppe,nede,høyre,venstre,midten".split(",");
const pronomen = "den".split(",");



const stem = word => {
    if (word.length < 3) return word;
    if ("småelitenmini".includes(word)) return "liten";
    if ("dettehunhanhennehamdenne".includes(word)) return "den";
    if (word.length < 4) return word;
    if ("midtenmittsenter".includes(word)) return "midten";
    if ("menmannenmennene".includes(word)) return "mann";
    if ("kattenekatter".includes(word)) return "katt";
    if ("gutterguttene".includes(word)) return "gutt";
    if ("fuglerfuglene".includes(word)) return "fugl";
    if ("damenedamer".includes(word)) return "dame";
    if ("jentejentajentenejenter".includes(word)) return "jente";
    if ("hunderhundene".includes(word)) return "hund";
    if ("gule".includes(word)) return "gul";
    if ("røde".includes(word)) return "rød";
    if ("blåe".includes(word)) return "blå";
    if ("grønne".includes(word)) return "grønn";
    if ("brune".includes(word)) return "brun";
    if ("oppehimmelen".includes(word)) return "himmel";
    if ("nedebakken".includes(word)) return "bakke";
    if ("storedigersvære".includes(word)) return "stor";
    if ("sværtmegajyslakjempenormtbitte".includes(word)) return "veldig";
    return word;
}

export const parse = linje => {
    // sjekker om vi kan finne subject verb objekt adverb/adjektiv
    // kan ha flere subjekt  : en mann og en hund kom gående langsomt
    const ast = new AST();
    const wrds = linje.split(" ");
    for (const w of wrds) {
        const sw = stem(w);
        if (actors.includes(sw)) {
            ast.subjects.push(sw);
        }
        if (verbs.includes(w)) {
            ast.verb = w;
        }
        if (adverbs.includes(w)) {
            ast.adverb = w;
        }
        if (scenic.includes(w)) {
            ast.scenic.push(w);
        }
        if (adjective.includes(sw)) {
            ast.adjectiv.push(sw);
        }
        if (tallord.includes(w)) {
            ast.antall = tallord.indexOf(w) + 1;
        }
        if (posisjon.includes(sw)) {
            ast.posisjon.push(sw);
        }
        if (pronomen.includes(sw)) {
            ast.pronomen = sw;
        }

    }
    return ast;
}