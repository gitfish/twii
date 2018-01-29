import IGetProfileDismissalReasonRequest from "./request/IGetProfileDismissalReasonRequest";
import IGetProfileDismissalReasonResponse from "./response/IGetProfileDismissalReasonResponse";
import IRecordActionRequest from "./request/IRecordActionRequest";
import IRecordActionResponse from "./response/IRecordActionResponse";

interface IProfileMatchEvalutationService {
    GetProfileDismissReason(request : IGetProfileDismissalReasonRequest) : Promise<IGetProfileDismissalReasonResponse>;
    RecordAction(request : IRecordActionRequest) : Promise<IRecordActionResponse>;
}

export { IProfileMatchEvalutationService as default, IProfileMatchEvalutationService }