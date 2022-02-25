// @ts-check


const { sqrt, abs, random: ran, min, max, sign } = Math;

const SPEED = 20;  // milliseconds between each frame

export function velgFiler(filer, type) {
    const ret = [];
    const liste = filer.split(" ");
    for (let i = 0; i < liste.length; i++) {
        const fil = liste[i];
        if (fil.endsWith(type)) {
            ret.push(fil);
        }
    }
    return ret.join(" ");
}

export function linjerMedOrd(tekst, ord) {
    const ret = [];
    const liste = tekst.split("\n");
    for (let i = 0; i < liste.length; i++) {
        const linje = liste[i];
        if (linje.includes(ord)) {
            ret.push(linje);
        }
    }
    return ret.length;
}

export function lengsteLinje(tekst) {
    let lengst = 0;
    const liste = tekst.split("\n");
    for (let i = 0; i < liste.length; i++) {
        const linje = liste[i];
        if (linje.length > lengst) {
            lengst = linje.length;
        }
    }
    return lengst;
}


const items = [];

export function visFiler(liste) {
    const div = document.createElement("div");
    let s = '<svg class="liste" viewBox="-250 -250 500 500">';
    s += liste.map((f,i) => {
        const id = f.replace(".", "_") + i;
        const x = ran() * 100 - 50;
        const y = ran() * 100 - 50;
        const it = new Movable(id, x, y, 25, 25, 0, 0);
        items.push(it);
        return `<svg id="${id}" x="${x}" y="${y}">
        <circle  r="12"  cx="12" cy="12"></circle>
        <text x="5" y="18">${f}</text>
        </svg>`
    }).join("");
    s += '</svg>'
    div.innerHTML = s;
    return div;
}



// funksjonene under er et par hakk over kompetansenivået for dette kurset
// men vi skal kunne bruke ferdiglaga funksjoner ...


export function setup() {
    let iterations = 0;
    let friction = 0.03;
    let power = friction;

    let manyThings = items.slice();

    let box = new Sprite(null, -220, -220, 435, 435); // rammen rundt spillet

    // kobler til text elementene i svg
    manyThings.forEach(e => e.activate());

    // lag en ball som følger brukers mus

    let ge = setInterval(gameEngine, SPEED);
    document.addEventListener("mousemove", getxy);

    function getxy(e) {
        let x = e.clientX;
        let y = e.clientY;
    }

    function gameEngine(e) {
        iterations += SPEED;
        for (let thing of manyThings) {
            thing.inertia();
            thing.edge(box);
            thing.render();
        }
        power = friction;
        styrSpillet();
        const collided = Movable.collide(manyThings);
        console.log(collided);
        if (collided === 0 || iterations > 5000) {
            clearInterval(ge);
            document.querySelector("svg").classList.add("stable");
        }
    }

    function styrSpillet() { }
}

class Sprite {
    id; element; x; y; w; h; rot = 0; radius;
    constructor(id, x, y, w, h) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.radius = (w + h) / 4;
    }

    activate() {
        this.element = document.getElementById(this.id);
    }

    render() {
        if (!this.element) return;
        this.element.setAttribute("x", this.x);
        this.element.setAttribute("y", this.y);
        //this.element.style.transform = "rotate(" + this.rot + "deg)";
    }

    /**
     * Check if this sprite is touching other sprite
     * Uses center(x,y) and radius
     */
    touching(other) {
        let dx = this.x - other.x;
        let dy = this.y - other.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + other.radius;
    }

    /**
     *
     * Check if this sprite overlaps other sprite
     * Uses bounding box (w,h)
     */
    overlap(other) {
        return (
            this.x < other.x + other.w &&
            this.x > other.x - this.w &&
            this.y < other.y + other.h &&
            this.y > other.y - this.h
        );
    }
}


class Movable extends Sprite {
    px;
    py;
    ax = 0;
    ay = 0;
    alive = true;
    collide = "";
    constructor(id, x, y, w, h, vx, vy) {
        super(id, x, y, w, h); // konstruer spriten først
        this.px = x;
        this.py = y;
        this.x += vx;
        this.y += vy;
    }

    effectOn(other) {
        return false;
    }

    die() {
        this.alive = false;
        this.element.classList.add("hidden");
    }

    get ignore() {
        return !this.alive;
    }

    static get damping() {
        return 0.985;
    }

    accelerate(delta) {
        if (!this.alive) return;
        this.x += this.ax * delta * delta;
        this.y += this.ay * delta * delta;
        this.ax = 0;
        this.ay = 0;
    }

    inertia() {
        if (!this.alive) return;
        //let x = this.x * 2 - this.px;
        //let y = this.y * 2 - this.py;
        let vy = (this.py - this.y) * 1;
        let vx = (this.px - this.x) * 1;
        this.px = this.x;
        this.py = this.y;
        this.x += vx;
        this.y += vy;
    }

    roter(delta) {
        if (!this.alive) return;
        let vx = this.x - this.px;
        let vy = this.y - this.py;
        this.rot = (this.rot + delta) % 360;
        let angle = this.rot;
        let velocity = Math.sqrt(vx * vx + vy * vy);
        let vinkel = (angle * Math.PI) / 180;
        this.x = this.px + velocity * Math.cos(vinkel);
        this.y = this.py + velocity * Math.sin(vinkel);
        this.render();
    }

    // sjekker at this er innenfor box
    // dersom utenfor plasseres this innenfor
    // dermed gis impuls slik at this beveger seg innover
    // merk at testen avsluttes ved første kant som overskrides
    // i rekkefølge venstre,høyre,topp,bunn
    // Ved neste timeframe oppdages da evt overlapp med kant nr to
    // dersom vi har truffet et hjørne
    edge(box) {
        let damping = Movable.damping;
        const { x, y, w, h } = this;

        if (x < box.x) {
            // utenfor box venstre kant
            let vx = (this.px - this.x) * damping;
            this.x = box.x;
            this.px = this.x - vx;
        } else if (x + w > box.x + box.w) {
            // utenfor høyre kant
            let vx = (this.px - this.x) * damping;
            this.x = box.x + box.w - w;
            this.px = this.x - vx;
        }
        if (y < box.y) {
            // utenfor top av box
            let vy = (this.py - this.y) * damping;
            this.y = box.y;
            this.py = this.y - vy;
        } else if (y + h > box.y + box.h) {
            // utenfor bunn av box
            let vy = (this.py - this.y) * damping;
            this.y = box.y + box.h - h;
            this.py = this.y - vy;
        }
    }



    /**
     * Kollisjon mellom alle blinkene
     * Dobbel løkke slik at blink nr 1
     *   sjekker kollisjon med blink 2,3, ...
     *   Nr 2 sjekker mot 3,4, ...
     *     Nr 3 sjekker mot 4,5, ...
     *      osv
     * @param {*} bodies
     */
    static collide(bodies) {
        let collided = 0;
        for (let i = 0, l = bodies.length; i < l; i++) {
            let a = bodies[i];
            for (let j = i+1; j < l; j++) {
                let b = bodies[j];
                if (a.overlap(b)) {
                    const dx = delta(a.x, b.x, a.w, b.w);
                    const dy = delta(a.y, b.y, a.h, b.h);
                    if (dx*dy < 10) continue;
                    collided++;
                    if (dy > dx) {
                        // kollision along x-axis
                        const ddx = (a.x < b.x) ? dx / 2 : -dx / 2;
                        a.x -= ddx;
                        b.x += ddx;
                    } else   {
                        // kollision along y-axis
                        const ddy = (a.y < b.y) ? dy / 2 : -dy / 2;
                        a.y -= ddy;
                        b.y += ddy;
                    }
                }
            }
        }
        return collided;
    }
}

const delta = (ap, bp, as, bs) => (ap < bp) ? ap + as - bp : bp + bs - ap       
