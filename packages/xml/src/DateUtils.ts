import * as moment from "moment";
import * as StringUtils from "@twii/core/lib/util/String";

const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:mm:ss.SSS";
const TIMESTAMP_FORMAT_NO_TIMEZONE = `${DATE_FORMAT}[T]${TIME_FORMAT}`;

const isValidMoment = (value : moment.Moment) => {
    return value && value.isValid() ? true : false;
};

const momentFromDataText = (value?: string) : moment.Moment => {
    return StringUtils.isNotBlank(value) ? moment(value, DATE_FORMAT, true) : undefined;
};

const momentFromDataTextWithFormat = (value: string, format : string) : moment.Moment => {
    return StringUtils.isNotBlank(value) ? moment(value, format, true) : undefined;
};

const momentToDataText = (value?: moment.Moment) : string => {
    return isValidMoment(value) ? value.format(DATE_FORMAT) : undefined;
};

const dateToDataText = (value?: Date) : string => {
    return momentToDataText(value ? moment(value) : undefined);
};

const dateFromDataText = (value?: string) : Date => {
    const m = momentFromDataText(value);
    return isValidMoment(m) ? m.toDate() : undefined;
};

const momentToTimestampDataText = (value?: moment.Moment, withTimezone = true) : string => {
    if (!value) {
        return undefined;
    }
    if (withTimezone) {
        return value.toISOString();
    } else {
        // In local time, but without any tz info (unspecified timezone)
        return value.format(TIMESTAMP_FORMAT_NO_TIMEZONE);
    }
};

const momentToTimeDataText = (value?: moment.Moment) : string => {
    return isValidMoment(value) ? value.format(TIME_FORMAT) : undefined;
};

const dateToTimeDataText = (value?: Date) : string => {
    return momentToTimeDataText(value ? moment(value) : undefined);
};

const momentFromTimeDataText = (value?: string) => {
    return StringUtils.isNotBlank(value) ? moment(value, TIME_FORMAT, true) : undefined;
};

const dateFromTimeDataText = (value?: string) => {
    const m = momentFromTimeDataText(value);
    return isValidMoment(m) ? m.toDate() : undefined;
};

const dateToTimestampDataText = (value?: Date, withTimezone = true) : string => {
    return momentToTimestampDataText(value ? moment(value) : undefined, withTimezone);
};

const momentFromTimestampDataText = (value?: string, keepTimezone = false) : moment.Moment => {
    if (StringUtils.isNotBlank(value)) {
        if (keepTimezone) {
            // Keep the moment object in the timezone specified in 'value' string
            return moment.parseZone(value, moment.ISO_8601, true);
        } else {
            // Shift the timezone to client timezone (default moment behaviour)
            return moment(value, moment.ISO_8601, true);
        }
    }
    return undefined;
};

const dateFromTimestampDataText = (value?: string) : Date => {
    const m = momentFromTimestampDataText(value);
    return isValidMoment(m) ? m.toDate() : undefined;
};

const currentTimestampDataText = () => {
    return dateToTimestampDataText(new Date());
};

export {
    isValidMoment,
    momentFromDataText,
    dateFromDataText,
    momentToDataText,
    dateToDataText,
    momentToTimestampDataText,
    dateToTimestampDataText,
    momentFromTimestampDataText,
    momentFromDataTextWithFormat,
    dateFromTimestampDataText,
    currentTimestampDataText,
    momentToTimeDataText,
    dateToTimeDataText,
    momentFromTimeDataText,
    dateFromTimeDataText
}