import Context from "common/Context";
import IEXAMSService from "./IEXAMSService";
import RestEXAMSService from "./RestEXAMSService";

const EXAMSServiceContext = new Context<IEXAMSService>({
    value: new RestEXAMSService()
});

export { EXAMSServiceContext as default, EXAMSServiceContext };