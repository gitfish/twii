import { split } from "../StringUtils";
import { ISearchResponseFieldHighlighting, ISearchResponseHighlighting } from "./ISearchResponse";
import { ISearchResultValue } from "./component/SearchResult";
import { dedupArray, deepEquality } from "../MergeUtils";
import { equalsIgnoreCase } from "../util/String";

const Defaults = {
    openDelim: "${",
    closeDelim: "}",
    highlightIdKey: "DOC_ID"
}

const splitHighlight = (highlight : string, openDelim : string = Defaults.openDelim, closeDelim : string = Defaults.closeDelim) : string[] => {
    return split(highlight, ch => {
        return openDelim.indexOf(ch) >= 0 || closeDelim.indexOf(ch) >= 0;
    });
}

const stripHighlightDelims = (highlight : string, openDelim : string = Defaults.openDelim, closeDelim : string = Defaults.closeDelim) : string => {
    const els = splitHighlight(highlight, openDelim, closeDelim);
    return els.join("");
};

const isValueHighlighted = (value : string, highlights : string[], openDelim : string = Defaults.openDelim, closeDelim : string = Defaults.closeDelim) : boolean => {
    if(value && highlights && highlights.length > 0) {
        return highlights.some(h => {
            return value.indexOf(stripHighlightDelims(h, openDelim, closeDelim)) >= 0;
        });
    }
    return false;
};

const findHighlight = (value : string, highlights : string[], openDelim : string = Defaults.openDelim, closeDelim : string = Defaults.closeDelim) : string => {
    if(value && highlights && highlights.length > 0) {
        return highlights.find(h => {
            return value.indexOf(stripHighlightDelims(h, openDelim, closeDelim)) >= 0;
        });
    }
};

const isFieldValueHighlighted = (field : string, value : string, highlighting: ISearchResponseFieldHighlighting, openDelim : string = Defaults.openDelim, closeDelim : string = Defaults.closeDelim) : boolean => {
    return highlighting ? isValueHighlighted(value, highlighting[field], openDelim, closeDelim) : false;
};

const findFieldValueHighlight = (field : string, value : string, highlighting: ISearchResponseFieldHighlighting, openDelim : string = Defaults.openDelim, closeDelim : string = Defaults.closeDelim) : string => {
    return highlighting ? findHighlight(value, highlighting[field], openDelim, closeDelim) : undefined;
};

const getResultHighlighting = (highlighting : ISearchResponseHighlighting, result : any, highlightIdKey : string = Defaults.highlightIdKey) : ISearchResponseFieldHighlighting => {
    const highlightId = result[highlightIdKey];
    return highlighting && highlightId ? highlighting[highlightId] : undefined;
};

const isElementHighlighted = (value : string, el : string, openDelim : string = Defaults.openDelim, closeDelim : string = Defaults.closeDelim) : boolean => {
    if(value && el) {
        return value.indexOf(`${openDelim}${el}${closeDelim}`) >= 0;
    }
    return false;
};

const getHighlightedResultValues = (result : any, fields : string[], highlighting?: ISearchResponseFieldHighlighting, dedup : boolean = false) : ISearchResultValue[] => {
    let r : ISearchResultValue[] = [];
    fields.forEach(field => {
        const fieldValues = result[field];
        if(fieldValues) {
            if(fieldValues.forEach) {
                fieldValues.forEach((fieldValue, idx) => {
                    if(fieldValue) {
                        r.push({
                            field: field,
                            value: fieldValue,
                            highlight: findFieldValueHighlight(field, fieldValue, highlighting)
                        });
                    }
                });
                
            } else {
                r.push({
                    field: field,
                    value: fieldValues,
                    highlight: findFieldValueHighlight(field, fieldValues, highlighting)
                });
            }
        }
    });
    if(dedup) {
        r = dedupArray(r, (a, b) => {
            return equalsIgnoreCase(a.value, b.value);
        });
    }
    // sort to highlighted first
    r.sort((a, b) => {
        if(a.highlight && b.highlight) {
            return 0;
        } else if(a.highlight) {
            return -1;
        } else {
            return 1;
        }
    });
    return r;
};

const fieldsHaveHighlighting = (result : any, fields : string[], highlighting?: ISearchResponseFieldHighlighting) : boolean => {
    if(highlighting && fields && fields.length > 0) {
        return fields.some(field => {
            const fieldValues = result[field];
            if(fieldValues) {
                if(fieldValues.some) {
                    return fieldValues.some((fieldValue, idx) => {
                        const highlight = findFieldValueHighlight(field, fieldValue, highlighting);
                        return highlight ? true : false;
                    });
                }
                return findFieldValueHighlight(field, fieldValues, highlighting) ? true : false;
            }
            return false;
        });
    }
    return false;
};

export {
    splitHighlight,
    stripHighlightDelims,
    isValueHighlighted,
    findHighlight,
    isFieldValueHighlighted,
    isElementHighlighted,
    getResultHighlighting,
    findFieldValueHighlight,
    getHighlightedResultValues,
    fieldsHaveHighlighting,
    Defaults
}