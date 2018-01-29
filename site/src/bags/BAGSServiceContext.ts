import Context from "common/Context";
import IBAGSService from "./IBAGSService";
import RestBAGSService from "./RestBAGSService";

const BAGSServiceContext = new Context<IBAGSService>({
    factory: () => {
        return new RestBAGSService();
    }
});

export { BAGSServiceContext as default, BAGSServiceContext };