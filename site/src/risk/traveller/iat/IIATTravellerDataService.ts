import IGetTravellerHistoryRequest from "./request/IGetTravellerHistoryRequest";
import IGetTravellerHistoryResponse from "./response/IGetTravellerHistoryResponse";

interface IIATTravellerDataService {
    GetTravellerHistory(request : IGetTravellerHistoryRequest) : Promise<IGetTravellerHistoryResponse>;
}

export { IIATTravellerDataService as default, IIATTravellerDataService }