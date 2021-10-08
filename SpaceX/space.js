// @ts-check

const rocket = {
    x: 300,
    y: 0,
    vx: 0,
    vy: 6,
    div: null,
}

let animation;

addEventListener("keydown", bremsRakett);

function bremsRakett(e) {
    if (e.key === "ArrowUp") {
        rocket.vy -= 3;
    }
}

function flyttRakett() {
    rocket.vy += 1;
    rocket.y += rocket.vy;
    rocket.x += rocket.vx;
    rocket.div.style.transform = `translate(${rocket.x}px,${rocket.y}px)`;
    if (rocket.y > 400) {
        if (rocket.vy < 3) {
            document.getElementById("space").classList.add("landing");
        } else {
            document.getElementById("bigbang").classList.add("aktiv");
            document.getElementById("falcon").classList.add("krasja");
        }
        clearInterval(animation);
    }
}

export function startSpillet() {
    rocket.div = document.getElementById("falcon");
    animation = setInterval(flyttRakett, 100);

}