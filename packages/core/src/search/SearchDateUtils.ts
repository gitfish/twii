import * as moment from "moment";
import { isNotBlank, trim } from "../util/String";
import { Input as DateInputFormats } from "../DateFormats";
import { isDate } from "../util/Lang";

const momentToSearchString = (value : moment.Moment) : string => {
    let text;
    if(value) {
        const creationData = value.creationData();
        const input = creationData.input;
        if(input) {
            if(isDate(input)) {
                text = value.format(creationData.format as string);
            } else {
                text = String(input);
            }
        }
    }
    return text;
};

const momentFromSearchString = (searchString : string) : moment.Moment => {
    return isNotBlank(searchString) ? moment(trim(searchString), DateInputFormats.allowedDates, true) : undefined;
};

interface IMomentRange {
    from?: moment.Moment;
    to?: moment.Moment;
}

const rangeSeparator = "TO";

const momentRangeFromSearchString = (searchString : string) : IMomentRange => {
    let from;
    let to;
    if(searchString) {
        const toIndex = searchString.toUpperCase().indexOf(rangeSeparator);
        if(toIndex >= 0) {
            const prefix = searchString.substring(0, toIndex);
            const suffix = searchString.substring(toIndex + rangeSeparator.length);
            if(isNotBlank(prefix)) {
                from = momentFromSearchString(prefix);
            }
            if(isNotBlank(suffix)) {
                to = momentFromSearchString(suffix);
            }
        } else {
            from = momentFromSearchString(searchString);
        }
    }
    return { from: from, to: to };
};

const momentRangeToSearchString = (range : IMomentRange) : string => {
    if(range && (range.to || range.from)) {
        const fromSearchString = momentToSearchString(range.from);
        const toSearchString = momentToSearchString(range.to);
        return `${fromSearchString ? fromSearchString + " " : ""}${rangeSeparator}${toSearchString ? " " + toSearchString : ""}`;
    }
};

export {
    momentToSearchString,
    momentFromSearchString,
    rangeSeparator,
    momentRangeFromSearchString,
    momentRangeToSearchString,
    IMomentRange
}