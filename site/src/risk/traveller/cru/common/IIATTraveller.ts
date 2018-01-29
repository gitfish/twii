import ITravelDocInfo from "./ITravelDocInfo";
import IPersonInfo from "risk/traveller/iat/common/IPersonInfo";

interface IIATTraveller {
    IATTravellerId?: string;
    TravelDoc?: ITravelDocInfo;
    Biographic?: IPersonInfo;
    MatchedTravelDoc?: ITravelDocInfo;
}

export { IIATTraveller as default, IIATTraveller }