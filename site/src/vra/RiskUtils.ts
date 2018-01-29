import * as DateUtils from "util/Date";
import { Output as DateOutputFormats, Data as DateDataFormats } from "common/DateFormats";

const dataServicesDtToRiskResumeDt = (value: string) => {
    const m = DateUtils.momentFromDataText(value);
    return m && m.isValid() ? m.format(DateOutputFormats.riskResumeDate) : value;
};

const dataServicesTsToRiskResumeTs = (value: string) => {
    const m = DateUtils.momentFromTimestampDataText(value, true);
    return m && m.isValid() ? m.format(DateOutputFormats.riskResumeTimestamp) : value;
};

const dataServicesTsToRiskResumeDataTs = (value: string) => {
    const m = DateUtils.momentFromTimestampDataText(value, true);
    return m && m.isValid() ? m.format(DateDataFormats.riskResumeTimestamp) : value;
};

export {
    dataServicesDtToRiskResumeDt,
    dataServicesTsToRiskResumeTs,
    dataServicesTsToRiskResumeDataTs
}