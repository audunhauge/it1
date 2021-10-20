// @ts-check

/**
 * An element/thing with position/speed/rotation/width/height
 */
export class Moveable {
    /** @type {number} */ x = 0;
    /** @type {number} */ y = 0;
    /** @type {number} */ vx = 0;
    /** @type {number} */ vy = 0;
    /** @type {number} */ r = 0;
    /** @type {number} */ w = 0;
    /** @type {number} */ h = 0;

    /**
     * Creates a new movable with given sprite
     * @param {HTMLElement | any} sprite 
     */
    constructor(sprite) {
        this.sprite = sprite;
    }

    render() {
        const s = this.sprite;
        s.style.transform = `translate( ${this.x}px, ${this.y}px) rotate(${this.r}deg)`;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    /**
     * Check for overlap with b
     * @param {Moveable} b 
     * @returns true if a,b overlap
     */
    overlap(b) {
        const a = this;
        return (
            a.x > b.x - a.w &&
            a.x < b.x + b.w &&
            a.y > b.y - a.y &&
            a.y < b.y + b.h
        )
    }
}
