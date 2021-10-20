// @ts-check

import { mind, namedThings, Keys } from "./Minos.js";
import { Moveable } from "./Move.js";
const { abs } = Math;

class Rocket extends Moveable {
    fuel = 150;
    poeng = 0;
}

export function startSpillet() {

    const { platform, falcon, start, space, bigbang } = namedThings();

    const rocket = mind( new Rocket(falcon));
    Object.assign(rocket, { x: 200, vx: 1, vy: 6, w:10, h:90 });

    const plat = new Moveable(platform);
    Object.assign(plat,{w:40,h:40,x:280,y:430});
   

    let animation;



    function styrRakett(e) {
       if (Keys.has("ArrowUp")) {
        rocket.vy -= 3;
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
        if (rocket.y > 400) {
            clearInterval(animation);
            bigbang.classList.add("aktiv");
            falcon.classList.add("krasja");
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