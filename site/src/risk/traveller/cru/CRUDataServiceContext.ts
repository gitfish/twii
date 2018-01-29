import Context from "common/Context";
import ICRUDataService from "./ICRUDataService";
import SoapCRUDataService from "./SoapCRUDataService";

const CRUDataServiceContext = new Context<ICRUDataService>({
    factory: () => {
        return new SoapCRUDataService();
    }
});

export { CRUDataServiceContext as default, CRUDataServiceContext }