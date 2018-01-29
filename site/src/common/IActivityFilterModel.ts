import * as moment from "moment";
import IActivityFilterProps from "./IActivityFilterProps";

interface IActivityFilterModel extends IActivityFilterProps {
    specified : boolean;
    setFilterText(filterText: string) : void;
    setFilterFromDate(filterFromDate: moment.Moment) : void;
    setFilterToDate(filterToDate: moment.Moment) : void;
    clear() : void;
}

export { IActivityFilterModel as default, IActivityFilterModel }