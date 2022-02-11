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