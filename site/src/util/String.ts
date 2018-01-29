const empty = "";

interface CharMap {
    cr: string;
    lf: string;
    tab: string;
    space: string;
    zero: string;
    nine: string;
    a: string;
    z: string;
    A: string;
    Z: string;
    [k : string] : string;
}

const chars : CharMap = {
    cr: "\r",
    lf: "\n",
    tab: "\t",
    space: " ",
    zero: "0",
    nine: "9",
    a: "a",
    z: "z",
    A: "A",
    Z: "Z"
};

interface CharCodeMap {
    cr: number,
    lf: number,
    tab: number,
    space: number,
    zero: number,
    nine: number,
    a: number,
    z: number,
    A: number,
    Z: number,
    [k : string] : number
}


const charCodes : CharCodeMap = {
    cr: chars.cr.charCodeAt(0),
    lf: chars.lf.charCodeAt(0),
    tab: chars.tab.charCodeAt(0),
    space: chars.space.charCodeAt(0),
    zero: chars.zero.charCodeAt(0),
    nine: chars.nine.charCodeAt(0),
    a: chars.a.charCodeAt(0),
    z: chars.z.charCodeAt(0),
    A: chars.A.charCodeAt(0),
    Z: chars.Z.charCodeAt(0)
};

const isWhitespace = function(ch : string) : boolean {
    var code = ch.charCodeAt(0);
    return isNaN(code) ||
            (code >= 9 && code <= 13) ||
            code === 32 ||
            code === 133 ||
            code === 160 ||
            code === 5760 ||
            (code >= 8192 && code <= 8202) ||
            code === 8232 ||
            code === 8233 ||
            code === 8239 ||
            code === 8287 ||
            code === 12288;
};

const isNotWhitespace = function(ch : string, idx? : number, text? : string) : boolean {
    return !isWhitespace(ch);
};

const isDigit = function(ch : string, idx? : number, text? : string) : boolean {
    var code = ch.charCodeAt(0);
    return code >= charCodes.zero && code <= charCodes.nine;
};

const isNotDigit = function(ch : string, idx? : number, text? : string) : boolean {
    return !isDigit(ch);
};

const isAlpha = function(ch : string, idx? : number, text? : string) : boolean {
    var code = ch.charCodeAt(0);
    return (code >= charCodes.a && code <= charCodes.z) || (code >= charCodes.A && code <= charCodes.Z);
};

const isNotAlpha = function(ch : string, idx? : number, text? : string) : boolean {
    return !isAlpha(ch);
};

const isAlphaNumeric = function(ch : string, idx? : number, text? : string) : boolean {
    return isAlpha(ch) || isDigit(ch);
};

const isNotAlphaNumeric = function(ch : string, idx? : number, text? : string) : boolean {
    return !isAlpha(ch) && !isDigit(ch);
};

const startsWith = function(text : string, match : string) : boolean {
    return text !== undefined && match !== undefined && match.length <= text.length ? text.indexOf(match) === 0 : false;
};

const endsWith = function(text : string, match : string) : boolean {
    if(text !== undefined && match !== undefined && match.length <= text.length) {
        const idx = text.lastIndexOf(match);
        return idx >= 0 && (idx + match.length === text.length);
    }
    return false;
};

const contains = function(text : string, match : string) : boolean {
    return text !== undefined && match !== undefined ? text.indexOf(match) >= 0 : false;
};

const filters = {
    isWhitespace: isWhitespace,
    whitespace: isWhitespace,
    isNotWhitespace: isNotWhitespace,
    nonWhitespace: isNotWhitespace,
    isDigit: isDigit,
    digit: isDigit,
    isNotDigit: isNotDigit,
    nonDigit: isNotDigit,
    isAlpha: isAlpha,
    alpha: isAlpha,
    isNotAlpha: isNotAlpha,
    nonAlpha: isNotAlpha,
    isAlphaNumeric: isAlphaNumeric,
    alphaNumeric: isAlphaNumeric,
    isNotAlphaNumeric: isNotAlphaNumeric,
    nonAlphaNumeric: isNotAlphaNumeric
};

const each = function(text : string, cb : (ch : string, idx?: number, text? : string) => any, scope? : any) {
    if(text) {
        const tl = text.length;
        for(let i = 0; i < tl; i ++) {
            cb.call(scope, text.charAt(i), i, text);
        }
    }
};

const eachRtl = function(text : string, cb : (ch : string, idx?: number, text? : string) => any, scope? : any) {
    if(text) {
        const tl = text.length;
        for(let i = tl - 1; i >= 0; i--) {
            cb.call(scope, text.charAt(i), i, text);
        }
    }
};

const some = function(text : string, pr : (ch : string, idx?: number, text? : string) => boolean, scope? : any) {
    if(text) {
        const tl = text.length;
        for(let i = 0; i < tl; i ++) {
            if(pr.call(scope, text.charAt(i), i, text)) {
                return true;
            }
        }
    }

    return false;
};

const someRtl = function(text : string, pr : (ch : string, idx?: number, text? : string) => boolean, scope? : any) {
    if(text) {
        const tl = text.length;
        for(let i = tl - 1; i >= 0; i--) {
            if(pr.call(scope, text.charAt(i), i, text)) {
                return true;
            }
        }
    }

    return false;
};

const every = function(text : string, pr : (ch : string, idx?: number, text? : string) => boolean, scope? : any) : boolean {
    if(text) {
        let tl = text.length;
        for(let i = 0; i < tl; i ++) {
            if(!pr.call(scope, text.charAt(i), i, text)) {
                return false;
            }
        }
    }

    return true;
};

const everyRtl = function(text : string, pr : (ch : string, idx?: number, text? : string) => boolean, scope? : any) {
    if(text) {
        let tl = text.length;
        for(var i = tl - 1; i >= 0; i--) {
            if(!pr.call(scope, text.charAt(i), i, text)) {
                return false;
            }
        }
    }

    return true;
};

const filter = function(text : string, pr : (ch : string, idx?: number, text? : string) => boolean, scope? : any) {
    if(text) {
        let r = empty;
        each(text, function(ch) {
            if(pr.apply(this, arguments)) {
                r += ch;
            }
        }, scope);

        return r;
    }

    return text;
};

const reject = function(text : string, pr : (ch : string, idx?: number, text? : string) => boolean, scope? : any) {
    if(text) {
        var r = empty;
        each(text, function(ch) {
            if(!pr.apply(this, arguments)) {
                r += ch;
            }
        }, scope);

        return r;
    }

    return text;
};

const map = function(text : string, m : (ch : string, idx?: number, text? : string) => string, scope? : any) {
    if(text) {
        let r = empty;
        each(text, function(ch, idx, text) {
            const mch = m.apply(this, arguments);
            if(mch) {
                r += mch;
            }
        }, scope);
        return r;
    }
    return text;
};

const split = function(text : string, pr : (ch : string, idx?: number, text? : string) => boolean, scope? : any) {
    let r : string[] = [];
    let b = empty;
    if(text) {
        each(text, function(ch) {
            if(pr.apply(this, arguments)) {
                if(b) {
                    r.push(b);
                    b = empty;
                }
            } else {
                b += ch;
            }
        }, scope);

        if(b) {
            r.push(b);
        }
    }
    return r;
};

const removeWhitespace = function(text : string) : string {
    return reject(text, isWhitespace);
};

const findIndexOf = function(text : string, pr : (ch : string, idx?: number, text? : string) => boolean, scope? : any) {
    let foundIdx = -1;
    if(pr) {
        some(text, function(ch, idx, text) {
            if(pr.apply(this, arguments)) {
                foundIdx = idx;
                return true;
            }
        }, scope);
    }
    return foundIdx;
};

const findLastIndexOf = function(text : string, pr : (ch : string, idx: number, text : string) => boolean, scope? : any) : number {
    let foundIdx : number = -1;
    if(pr) {
        someRtl(text, function(ch, idx, text) {
            if(pr.apply(this, arguments)) {
                foundIdx = idx;
                return true;
            }
        }, scope);
    }
    return foundIdx;
};

const leftTrim = function(text : string) : string {
    const idx = findIndexOf(text, isNotWhitespace);
    return idx > 0 ? text.substring(idx) : text;
};

const rightTrim = function(text : string) : string {
    const idx = findLastIndexOf(text, isNotWhitespace);
    return idx > 0 ? text.substring(0, idx + 1) : text;
};

const trim = function(text : string) : string {
    return rightTrim(leftTrim(text));
};

const isBlank = function(text : string) : boolean {
    return every(text, isWhitespace);
};

const isNotBlank = function(text : string) : boolean {
    return !isBlank(text);
};

const startsWithIgnoreCase = function(text : string, match : string) : boolean {
    return text !== undefined && match !== undefined ? startsWith(text.toLowerCase(), match.toLowerCase()) : false;
};

const endsWithIgnoreCase = function(text : string, match : string) : boolean {
    return text !== undefined && match !== undefined ? endsWith(text.toLowerCase(), match.toLowerCase()) : false;
};

const containsIgnoreCase = function(text : string, match : string) : boolean {
    return text !== undefined && match !== undefined ? contains(text.toLowerCase(), match.toLowerCase()) : false;
};

const equalsIgnoreCase = function(l : string, r : string) : boolean {
    return (l === r) || (l !== undefined && r !== undefined ? l.toLowerCase() === r.toLowerCase() : false);
};

const padLeft = function(s : string, length : number, padChar : string = " ") : string {
    let r = s || "";
    while(r.length < length) {
        r = padChar + r;
    }
    return r;
};

const stripLeft = function(s : string, stripChar : string) : string {
    if(s) {
        const idx = findIndexOf(s, (ch) => {
            return ch !== stripChar;
        });
        if(idx > 0) {
            return s.substring(idx);
        }
    }
    return s;
};

const padRight = function(s : string, length : number, padChar : string = " ") : string {
    let r = s || "";
    while(r.length < length) {
        r = r + padChar;
    }
    return r;
};

const stripRight = function(s : string, stripChar : string) : string {
    if(s) {
        const idx = findLastIndexOf(s, (ch) => {
            return ch !== stripChar;
        });
        if(idx < s.length - 1) {
            return s.substring(0, idx + 1);
        }
    }
    return s;
};

const join = function<T = any>(items : T[], textMap: (item : T, index : number) => string, separator?: string) : string {
    const elems : string[] = [];
    if(items && items.length > 0) {
        let it;
        items.forEach((item, idx) => {
            it = textMap(item, idx);
            if(isNotBlank(it)) {
                elems.push(it);
            }
        });
    }
    return elems.length > 0 ? elems.join(separator) : "";
};

const capitalizeFirstLetter = (value : string) => {
    return value && value.length > 0 ? value.charAt(0).toUpperCase() + value.slice(1) : value;
};

const wordsToCamelCase = (text : string) => {
    if(text) {
        let items = split(text, isWhitespace).filter(w => isNotBlank(w));
        if(items.length > 0) {
            items = items.map((item, idx) => {
                return idx > 0 ? capitalizeFirstLetter(item) : item.toLowerCase();
            });
            return items.join("");
        }
    }
    return text;
};

export {
    empty,
    filters,
    each,
    each as forEach,
    eachRtl,
    eachRtl as forEachRtl,
    eachRtl as eachReverse,
    eachRtl as forEachReverse,
    some,
    someRtl,
    every,
    everyRtl,
    filter,
    reject,
    map,
    split,
    removeWhitespace,
    findIndexOf,
    findLastIndexOf,
    leftTrim,
    leftTrim as trimLeft,
    rightTrim,
    rightTrim as trimRight,
    trim,
    isBlank,
    isNotBlank,
    startsWith,
    startsWithIgnoreCase,
    endsWith,
    endsWithIgnoreCase,
    contains,
    containsIgnoreCase,
    equalsIgnoreCase,
    padLeft,
    padLeft as leftPad,
    stripLeft,
    stripLeft as leftStrip,
    padRight,
    padRight as rightPad,
    stripRight,
    stripRight as rightStrip,
    join,
    capitalizeFirstLetter,
    wordsToCamelCase
};