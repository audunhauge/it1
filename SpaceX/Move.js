// @ts-check


export class Moveable {
    x=0;
    y=0;
    vx=0;
    vy=0;
    r =0;

    constructor (sprite) {
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
}