import IRequestHeader from "risk/traveller/common/IRequestHeader";
import IListOfProfileName from "./IListOfProfileName";

interface IGetProfileDismissalReasonRequest {
    RequestHeader?: IRequestHeader;
    ListOfProfileName?: IListOfProfileName;
}

export { IGetProfileDismissalReasonRequest as default, IGetProfileDismissalReasonRequest }