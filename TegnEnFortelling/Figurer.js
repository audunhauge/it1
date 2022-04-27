// @ts-check

import { create } from "../lib/Minos.js";

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

    constructor(type) {
        this.type = type;
        this.x = random() * 1300;
        if (this.domene() === "himmel") {
            this.y = random() * 100 + 10;
        }
        if (this.domene() === "bakke") {
            this.y = random() * 100 + 400;
        }

    }

    stage(target) {
        const div = create("div");
        div.className = this.type;
        target.append(div);
        this.div = div;
    }

    render() {
        const { x, y, div, scale, forsterk } = this;
        const skale = forsterk ? scale*scale : scale;
        div.style.transform = `translate(${x}px, ${y}px) scale(${skale})`;
    }

    domene() {
        const { type } = this;
        if ("fuglskysol".includes(type)) return "himmel";
        return "bakke"
    }

}

const actors = "mann,gutt,dame,jente,hund,katt,fugl".split(",");
const verbs = "kom,gikk,stod,gående".split(",");
const adverbs = "langsomt,raskt,hurtig".split(",");
const scenic = "dag,natt,lyst,mørkt".split(",");
const adjective = "stor,liten,små,rosa,rød,blå,gul,grønn,brun,veldig".split(",");
const tallord = "en,to,tre,fire,fem,seks,sju,åtte,ni,ti".split(",");



const stem = word => {
    if (word.length < 4) return word;
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
    if ("smålitenmini".includes(word)) return "liten";
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
    }
    return ast;
}