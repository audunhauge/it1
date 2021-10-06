// @ts-check

const rocket = {
    x:300,
    y:0,
    vx:0,
    vy:6,
    div:null,
}

let animation;

function flyttRakett() {
    rocket.vy += 1;
    rocket.y += rocket.vy;
    rocket.x += rocket.vx;
    rocket.div.style.transform = `translate(${rocket.x}px,${rocket.y}px)`;
}

export function startSpillet() {
    rocket.div = document.getElementById("falcon");
    setInterval(flyttRakett,100);

}