// @ts-check

export function velgFiler(filer,type) {
    const ret = [];
    const liste = filer.split(" ");
    for (let i=0;i< liste.length; i++) {
        const fil = liste[i];
        if (fil.endsWith(type)) {
            ret.push(fil);
        }
    }
    return ret.join(" ");
}

export function linjerMedOrd(tekst,ord) {
    const ret = [];
    const liste = tekst.split("\n");
    for (let i=0;i< liste.length; i++) {
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
    for (let i=0;i< liste.length; i++) {
        const linje = liste[i];
        if (linje.length > lengst) {
            lengst = linje.length;
        }
    }
    return lengst;
}