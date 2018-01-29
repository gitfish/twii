import IRequestHeader from "risk/traveller/common/IRequestHeader";
import IListOfPOIAction from "./IListOfPOIAction";

interface IRecordActionRequest {
    RequestHeader?: IRequestHeader;
    ListOfPOIAction?: IListOfPOIAction;
}

export { IRecordActionRequest as default, IRecordActionRequest }