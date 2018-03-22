import * as moment from "moment";
import { momentFromString, momentToString, momentToISOString } from "./MomentUtils";

const Formats = {
    date: "YYYY-MM-DD",
    timestampNoTimezone: "YYYY-MM-DD[T]HH:mm:ss.SSS"
}

const momentFromDataString = (value : string) : moment.Moment => {
    return momentFromString(value, Formats.date);
};

const momentToDataString = (value : moment.Moment) : string => {
    return momentToString(value, Formats.date);
};

const momentToTimestampDataString = (value : moment.Moment, withTimezone : boolean = true) : string => {
    if(withTimezone) {
        return momentToISOString(value);
    }
    return momentToString(value, Formats.timestampNoTimezone);
};

const momentFromTimestampDataString = (value : string, keepTimezone : boolean = false) : moment.Moment => {
    if(value) {
        if(keepTimezone) {
            // Keep the moment object in the timezone specified in 'value' string
            return moment.parseZone(value, moment.ISO_8601, true);
        } 
        // Shift the timezone to client timezone (default moment behaviour)
        return moment(value, moment.ISO_8601, true);
    }
    return undefined
};

export { 
    momentFromDataString,
    momentToDataString,
    momentToTimestampDataString,
    momentFromTimestampDataString,
    Formats
}