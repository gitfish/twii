import Context from "common/Context";
import IIATTravellerDataService from "./IIATTravellerDataService";
import SoapIATTravellerDataService from "./SoapIATTravellerDataService";

const IATTravellerDataServiceContext = new Context<IIATTravellerDataService>({
    factory() {
        return new SoapIATTravellerDataService();
    }
});

export { IATTravellerDataServiceContext as default, IATTravellerDataServiceContext }
