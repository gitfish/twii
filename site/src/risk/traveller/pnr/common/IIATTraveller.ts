import ITravelDoc from "./ITravelDoc";
import IPersonInfo from "risk/traveller/iat/common/IPersonInfo";

interface IIATTraveller {
    IATTravellerId?: string;
    TravelDoc?: ITravelDoc;
    Biographic?: IPersonInfo;
    MatchedTravelDoc?: ITravelDoc;
}

export { IIATTraveller as default, IIATTraveller }