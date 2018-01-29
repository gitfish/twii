import * as moment from "moment";

interface IActivityFilterProps {
    filterText: string;
    filterFromDate: moment.Moment;
    filterToDate: moment.Moment;
}

export { IActivityFilterProps as default, IActivityFilterProps }