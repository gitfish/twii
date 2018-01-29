import Context from "common/Context";
import {SoapIATTravellerDataService} from "../iat/SoapIATTravellerDataService";
import {IIATTravellerDataService} from "../iat/IIATTravellerDataService";


const TravellerRiskServiceContext = new Context<IIATTravellerDataService>({
    id: "TravellerRiskService",
    factory() {

        return new SoapIATTravellerDataService();
    }
});

export { TravellerRiskServiceContext as default, TravellerRiskServiceContext };