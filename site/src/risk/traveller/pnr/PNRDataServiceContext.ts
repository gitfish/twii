import Context from "common/Context";
import IPNRDataService from "./IPNRDataService";
import SoapPNRDataService from "./SoapPNRDataService";

const PNRDataServiceContext = new Context<IPNRDataService>({
    factory() {
        return new SoapPNRDataService();
    }
});

export { PNRDataServiceContext as default, PNRDataServiceContext }