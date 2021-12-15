// @ts-check
import { updateMyProperties, thingsWithId, shuffle } from "../lib/Minos.js";

const web = updateMyProperties();

const juleTall = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);

const bilder = [];
for (let i=0; i< 25; i++) {
    const p = 0x1F4c4;
    bilder.push(String.fromCodePoint(p+i));
}

const { kalender, timeplan } = thingsWithId();

for (let i = 0; i < 24; i++) {
    const nr = juleTall[i];
    web.kalender.push({ nr });
}

for (let i = 1; i < 9; i++) {
    web.timeplan.push({ i });
}

kalender.onclick = (e) => {
    const t = e.target;
    if (t.className === "luke") {
        const idx = t.dataset.nr;
        t.innerHTML = bilder[idx];
    }
}
