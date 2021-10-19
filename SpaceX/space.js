// @ts-check

import { mind, namedThings, Keys } from "./Minos.js";
import { Moveable } from "./Move.js";
const { abs } = Math;

class Rocket extends Moveable {
    fuel = 150;
    poeng = 0;
}

export function startSpillet() {

    const { falcon, start, space, bigbang } = namedThings();

    const rocket = mind( new Rocket(falcon));
    Object.assign(rocket, { x: 200, vx: 1, vy: 6 });
   

    let animation;



    function styrRakett(e) {
        if (Keys.has("ArrowUp")) {
            rocket.vy -= 3;
            rocket.fuel -= 1;
        }
        if (Keys.has("ArrowLeft")) {
            rocket.vx -= 1;
        }
        if (Keys.has("ArrowRight")) {
            rocket.vx += 1;
        }
    }


    function flyttRakett() {
        styrRakett();
        rocket.vy += 1;
        rocket.move();
        rocket.render();
        if (rocket.y > 350) {
            if (abs(rocket.vy) < 9
                && abs(rocket.vx) < 3
                && abs(rocket.x - 300) < 10
            ) {
                space.classList.add("landing");
                rocket.poeng += rocket.fuel / 10;
            } else {
                space.classList.add("crash");
                bigbang.classList.add("aktiv");
                falcon.classList.add("krasja");
                rocket.poeng -= 20;
            }
            startPaaNytt();
        }
    }

    async function startPaaNytt() {
        rocket.vy = 6;
        rocket.vx = 0;
        rocket.x = 300;
        rocket.y = 0;
        rocket.fuel += 50;
        clearInterval(animation);
        animation = null;
        await Keys.wait(1000);  // wait a sec
        space.classList.remove("landing");
        space.classList.remove("crash");
        rocket.move();
        rocket.render();
        await Keys.trigger();
        faktiskStart();
    }

    function faktiskStart() {
        if (animation) {
            clearInterval(animation);
        }
        animation = setInterval(flyttRakett, 100);
        start.classList.add("usynlig");
        falcon.classList.remove("krasja");
        void bigbang.innerWidth;
        bigbang.classList.remove("aktiv");
        start.removeEventListener("click", faktiskStart);
        // må fjerne denne etter bruk -
        // ellers vil space/enter trigge dobbel restart - Keys.trigger + start.click
        // fordi start har fokus og space/enter gjelder som click
    }

    Keys.init();
    start.addEventListener("click", faktiskStart);
    rocket.poeng = 0;
    rocket.fuel = 150;
}