import Context from "common/Context";
//import IPNRDataService from "./IPNRDataService";
import IPNRServiceCombined from "./IPNRServiceCombined";
//import RestPNRDataService from "./RestPNRDataService";
import DataServicePNRServiceCombined from "./DataServicePNRServiceCombined";


const PNRServiceCombinedContext = new Context<IPNRServiceCombined>({
    id: "PNRDataService",
    factory: () => {
        return new DataServicePNRServiceCombined()
    }
});

export { PNRServiceCombinedContext as default, PNRServiceCombinedContext };