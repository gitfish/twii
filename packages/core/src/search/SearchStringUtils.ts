import { split, equalsIgnoreCase, isNotBlank, startsWith, endsWith, map, trim, forEach } from "../util/String";
import { isWhitespace } from "../StringFilters";

const Defaults = {
    stopWords: [
        "AND",
        "OR"
    ],
    specialChars: [
        "+",
        "-",
        "&",
        "|",
        "!",
        "(",
        ")",
        "{",
        "}",
        "[",
        "]",
        "^",
        '"',
        "~",
        "*",
        "?",
        ":",
        "\\"
    ]
}

const isSpecialChar = (c : string) : boolean => {
    return Defaults.specialChars.indexOf(c) >= 0;
};

const isNotSpecialChar = (c : string) : boolean => {
    return !isSpecialChar(c);
};

const isPhrase = (term : string) : boolean => {
    return startsWith(trim(term), '"');
};

const escapeTerm = (term : string) : string => {
    return map(term, c => {
        if(Defaults.specialChars.indexOf(c) >= 0) {
            return "\\" + c;
        }
        return c;
    });
};

const escapeForPhrase = (phrase : string) : string => {
    return map(phrase, c => {
        if(c === '"' || c === "\\") {
            return "\\" + c;
        }
        return c;
    });
}

export {
    escapeTerm,
    escapeForPhrase,
    isPhrase,
    isSpecialChar,
    isNotSpecialChar,
    Defaults
}