import { isNotBlank, trim, isBlank } from "../util/String";

const numberToSearchString = (value : number) : string => {
    let text;
    if(value !== undefined && value !== null) {
        return String(value);
    }
    return text;
};

const numberFromSearchString = (searchString : string) : number => {
    if(isNotBlank(searchString)) {
        const v = parseFloat(searchString);
        return isNaN(v) ? undefined : v;
    }
};

interface INumberRange {
    from?: number;
    to?: number;
}

const rangeSeparator = "TO";

const numberRangeFromSearchString = (searchString : string) : INumberRange => {
    let from;
    let to;
    if(searchString) {
        const toIndex = searchString.toUpperCase().indexOf(rangeSeparator);
        if(toIndex >= 0) {
            const prefix = searchString.substring(0, toIndex);
            const suffix = searchString.substring(toIndex + rangeSeparator.length);
            if(isNotBlank(prefix)) {
                from = numberFromSearchString(prefix);
            }
            if(isNotBlank(suffix)) {
                to = numberFromSearchString(suffix);
            }
        } else {
            from = numberFromSearchString(searchString);
        }
    }
    return { from: from, to: to };
};

const numberRangeToSearchString = (range : INumberRange) : string => {
    if(range && (range.to !== undefined || range.from !== undefined)) {
        const fromSearchString = numberToSearchString(range.from);
        const toSearchString = numberToSearchString(range.to);
        return `${fromSearchString ? fromSearchString + " " : ""}${rangeSeparator}${toSearchString ? " " + toSearchString : ""}`;
    }
};

export {
    numberToSearchString,
    numberFromSearchString,
    rangeSeparator,
    numberRangeFromSearchString,
    numberRangeToSearchString,
    INumberRange
}