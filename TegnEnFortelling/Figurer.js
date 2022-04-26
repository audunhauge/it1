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

    constructor(type) {
        this.type = type;
        this.x = random() * 300;
        if (this.domene() === "himmel") {
            this.y = random()*100 + 10;
        }
        if (this.domene() === "bakke") {
            this.y = random()*100 + 400;
        }

    }

    stage(target) {
        const div = create("div");
        div.className = this.type;
        target.append(div);
        this.div = div;
    }

    render() {
        const { x, y, div } = this;
        div.style.transform = `translate(${x}px, ${y}px)`;
    }

    domene() {
        const { type } = this;
        if ("fuglskysol".includes(type)) return "himmel";
        // if ("mannguttjentedamehundkatt".includes(type)) return "bakke";
        return "bakke"
    }

}

const actors = "mann,gutt,dame,jente,hund,katt,fugl".split(",");
const verbs = "kom,gikk,stod,gående".split(",");
const adverbs = "langsomt,raskt,hurtig".split(",");
const scenic = "dag,natt,lyst,mørkt".split(",");
const adjective = "stor,liten,rosa,røde,blå".split(",");
const tallord = "en,to,tre".split(",");



const stem = word => {
    if (word.length < 3) return word;
    if ("mannmenmannenmennene".includes(word)) return "mann";
    if ("kattkattenkattenekatter".includes(word)) return "katt";
    if ("guttgutterguttenegutten".includes(word)) return "gutt";
    if ("fuglfugelenfuglerfuglene".includes(word)) return "fugl";
    if ("damedamendamenedamer".includes(word)) return "dame";
    if ("jentejentajentenejenter".includes(word)) return "jente";
    if ("hundhundenhundehundene".includes(word)) return "hund";
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
        if (adjective.includes(w)) {
            ast.adjectiv.push(w);
        }
        if (tallord.includes(w)) {
            ast.antall = tallord.indexOf(w) + 1;
        }
    }
    return ast;
}