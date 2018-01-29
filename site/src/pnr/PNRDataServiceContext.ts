import Context from "common/Context";
import IPNRDataService from "./IPNRDataService";
//import IPNRServiceCombined from "./IPNRServiceCombined";
import RestPNRDataService from "./RestPNRDataService";
//import DataServicePNRServiceCombined from "./DataServicePNRServiceCombined";


const PNRDataServiceContext = new Context<IPNRDataService>({
    id: "PNRDataService",
    factory: () => {
        return new RestPNRDataService()
    }
});

export { PNRDataServiceContext as default, PNRDataServiceContext };