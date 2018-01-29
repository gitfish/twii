import IRequestHeader from "risk/traveller/common/IRequestHeader";
import IListOfTravellerId from "./IListOfTravellerId";
import IIATDataSubjects from "risk/traveller/iat/common/IIATDataSubjects";

interface IGetTravellerHistoryRequest {
    RequestHeader?: IRequestHeader;
    ListOfIATTravellerId?: IListOfTravellerId;
    RequestedDataSubjects?: IIATDataSubjects;
}

export { IGetTravellerHistoryRequest as default, IGetTravellerHistoryRequest }