// @ts-check

/**
 * interpolate fills this hash with elements that have
 * innerHTML containing {variables}
 * These are replaced with spans so that mind() can update
 * on change of minded(properties)
 */
const targets = {};

/**
 * Replace {x} with <span>x</span> 
 * Prepare for use with mind({x}) so that
 * any changes to x will be shown as span.innerHTML
 * @example  html='<div>{x}</div>', js='let x=1;interpolate(); let o = mind({x});'
 * html changed to <div><span></span></div>
 * changes to o.x will be updated into span.innerHTML
 * NOTE: start state not set, change o.x to set span.innerHTML
 */
export function prepTheWebPage() {
    let idnum = 0;
    const list = document.querySelectorAll("div,span,label,p");
    list.forEach(l => {
        l.innerHTML = l.innerHTML.replace(/\{(.+?)\}/g, (m, t) => {
            targets[t] = [];
            return `<span data-name="${t}" class="ok_gold" id="ok${idnum++}">X</span>`;
        })
    });
    document.querySelectorAll(".ok_gold").forEach(e => {
        // @ts-ignore
        targets[e.dataset.name].push(e);
    });
}

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
            : n.toFixed(2)
        : n;
}

/**
 * Set up a proxy for this object
 * Any props that are found in targets will autoupdate on change
 * @param {Object} obj Contains named props
 * @returns a proxy for this object
 */
export function updateMyProperties(obj) {
    return new Proxy(obj, {
        set: function (target, property, value) {
            const v = num(value);
            target[property] = value;
            if (targets[property]) {
                targets[property].forEach(t => {
                    t.innerHTML = v;
                });
            }
            return true;
        }
    });
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