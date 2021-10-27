// @ts-check

/**
 * exports 
 *   thingsWithId           returns { names for things with id}
 *   updateMyProperties     returns a proxy object, pro 
 *   Keys                   Keys.has("ArrowUp")
 * pro.getLocalJSON(k)      get localStorage + JSON.parse with catch
 * pro.setLocalJSON(k,v)    set localStorage + JSON.stringify
 * pro.wrap(arr,tag)        wraps each element in arr with tag, wrap([1,2],"li") => '<li>1</li><li>2</li>'
 */

/**
 * interpolate fills this hash with elements that have
 * innerHTML containing {variables}
 * These are replaced with spans so that mind() can update
 * on change of minded(properties)
 */
const namedVariables = {};
const valueOfNamedVars = {};
const expressions = {};
const inputs = {};
const styled = {};  // stylish things



/**
 * Replace {x} with <span>x</span> 
 * Prepare for use with mind({x}) so that
 * any changes to x will be shown as span.innerHTML
 * @example  html='<div>{x}</div>', js='let x=1;interpolate(); let o = mind({x});'
 * html changed to <div><span></span></div>
 * changes to o.x will be updated into span.innerHTML
 * NOTE: start state not set, change o.x to set span.innerHTML
 */
function prepTheWebPage() {
    let idnum = 0;
    const allnames = {};  // all {names} and {exp + pressions}
    // will be filtered to seperate names/expressions

    // pick out any styles 
    {
        const withStyle = document.querySelectorAll('[stil]');
        withStyle.forEach(elm => elm.classList.add("stylish"));

        const list = document.querySelectorAll(".stylish");
        list.forEach(l => {
            if (!l.id) { l.id = "sty" + idnum++ }
            styled[l.id] = l;
            const orig = l.getAttribute("stil");
            l.setAttribute("data-orig", orig);
            l.setAttribute("style", "");
        });

    }
    // pick out any inputs with value="{name}"
    {
        const inps = document.querySelectorAll('input[name],select[name]');
        inps.forEach(inp => {
            const name = inp.getAttribute("name");
            inputs[name] = inp;
            // @ts-ignore
            inp.dataset.id = idnum++;
        });
    }
    // pick out any {words} within innerHTML
    {
        const list = document.querySelectorAll("div,span,label,p");
        list.forEach(l => {
            l.innerHTML = l.innerHTML.replace(/\{(.+?)\}/g, (m, t) => {
                allnames[t] = [];
                return `<span data-name="${t}" class="ok_gold" id="ok${idnum++}">X</span>`;
            })
        });
        document.querySelectorAll(".ok_gold").forEach(e => {
            // @ts-ignore
            allnames[e.dataset.name].push(e);
        });
        Object.keys(allnames).forEach(k => {
            if (k.match(/\W/)) {
                /*
                // if not pure name like {x}
                // then we assume {x+y}
                if (k.includes(':')) {
                    // a named expression {x:y+3}
                    // name is "x", value "y+3"
                    const [name, exp] = k.split(':');
                    namedVariables[name] = allnames[k]
                    valueOfNamedVars[name] = undefined;
                    expressions[k] = exp;
                } else {
                */
                    expressions[k] = allnames[k];
                //}
            } else {
                namedVariables[k] = allnames[k];
                valueOfNamedVars[k] = undefined;
            }
        });
    }
}

prepTheWebPage();

/**
 * Finds all elements that have id="..."
 * The id is key into this hash
 * @returns hash of elements with ids
 */
export function thingsWithId() {
    const ret = {};
    const list = document.querySelectorAll("[id]");
    list.forEach(e => {
        ret[e.id] = e;
    })
    return ret;
}

const num = (n) => {
    return Number.isFinite(n)
        ? Number.isInteger(n)
            ? n
            : (String(n).length > 8)
                ? n.toFixed(4)
                : n
        : n;
}

const mathEnvironment = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    abs: Math.abs,
    atan: Math.atan,
    asin: Math.asin,
    acos: Math.acos,
    exp: Math.exp,
    floor: Math.floor,
    log: Math.log,
    log10: Math.log10,
    max: Math.max,
    min: Math.min,
    pow: Math.pow,
    random: Math.random,
    round: Math.round,
    sign: Math.sign,
    sqrt: Math.sqrt,
    π: Math.PI,
    PI: Math.PI,
};


const expressionValue = exp => {
    if (exp.includes('$')) {
        exp = exp.replace(/(\$\w+)/g, (_, e) => {
            const name = e.substr(1);
            if (valueOfNamedVars[name] !== undefined) {
                return valueOfNamedVars[name];
            }
            return name;
        });
    }
    let v = "";
    const environment = Object.assign(Object.assign({}, mathEnvironment), valueOfNamedVars);
    try {
        function ctxEval(exp, ctx) { // evaluates expression in the scope of context object
            return (new Function('expression', 'context', 'with(context){return eval(expression)}'))(exp, ctx);
        }
        v = ctxEval(exp, environment);
    } catch (error) {
        console.log(error, exp, environment);
    }
    return v;
}

/**
 * Set up a proxy for this object
 * Any props that are found in targets will autoupdate on change
 * @param {Object} obj Contains named props
 * @returns a proxy for this object
 */
export function updateMyProperties(obj = {}) {
    const up = e => {
        const inp = e.target;
        // @ts-ignore
        const name = inp.name;
        // @ts-ignore
        if (inp.type === "checkbox") {
            pro[name] = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
                // @ts-ignore
                .map(e => e.value).join(",");
        } else {
            // @ts-ignore
            pro[name] = inp.value;
        }
    }
    Object.keys(namedVariables).forEach(k => obj[k] = undefined);

    const pro = new Proxy(obj, {
        set: function (target, property, value) {
            const v = num(value);
            target[property] = value;
            if (namedVariables[property]) {
                valueOfNamedVars[property] = v;
                namedVariables[property].forEach(t => {
                    t.innerHTML = v;
                });
            }
            if (inputs[property]) {
                const id = inputs[property].dataset.id;
                const t = document.querySelector(`[data-id="${id}"]`);
                // @ts-ignore
                if (! "radiocheckbox".includes(t.type)) {
                    // @ts-ignore
                    t.value = v;
                }
                valueOfNamedVars[property] = v;
            }
            Object.keys(expressions).forEach(k => {
                if (k.includes(String(property))) {
                    // expression looks like it depends on this property
                    const t = document.querySelector(`[data-name="${k}"]`);
                    const v = num(expressionValue(k));
                    // @ts-ignore
                    t.innerHTML = v;
                }
            });
            // interpolate values into styles
            Object.keys(styled).forEach(k => {
                const elm = styled[k];
                const orig = elm.dataset.orig;
                if (orig.includes(String(property))) {
                    // style looks like it depends on this property
                    const style = orig.replace(/\{(\w+)\}/g, (_, m) => {
                        return valueOfNamedVars[m] || '';
                    });
                    elm.style = style;
                }
            })
            return true;
        }
    });
    document.querySelectorAll("[data-id]").forEach(elm => {
        elm.addEventListener("input", up);
    });

    // some built in functionality
    pro.getLocalJSON = (k) => {
        const old = localStorage.getItem(k);
        if (old) {
            try {
                return JSON.parse(old);
            } catch (err) {
                console.log(err, old);
            }
        }
        return null;
    };
    pro.setLocalJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));
    pro.wrap = (ar, tag) => ar.map(e => `<${tag}>${e}</${tag}>`).join('');

    return pro;
}

/**
 * Simple class for keyboard handling
 * Also contains wait()
 */
export class Keys {
    static #keys = [];

    static init() {
        document.addEventListener("keydown", Keys.#down);
        document.addEventListener("keyup", Keys.#up);
    }
    static #down(e) {
        Keys.#keys[e.key] = 1;
    }
    static #up(e) {
        Keys.#keys[e.key] = 0;
    }
    /**
     * True if this key is currently pressed
     * @param {string} k 
     * @returns {boolean}
     */
    static has(k) {
        return Keys.#keys[k] === 1;
    }

    /**
     * True if any key pressed
     * @returns {boolean }
     */
    static any() {
        return Keys.#keys.some(e => e === 1);
    }

    /**
     * Returns promise that resolves after n millisec
     *  waits n milliseconds
     * @returns {Promise}
     */
    static wait(n) {
        return new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, n
            ));
    }

    /**
     * Returns promise that resolves on key-pressed
     * @returns {Promise}
     * @example
     * await Keys.trigger()
     */
    static trigger() {
        return new Promise(resolve => {
            function kh(e) {
                document.removeEventListener('keydown', kh);
                resolve(e.key);
            }
            document.addEventListener('keydown', kh);
        }
        );
    }
}