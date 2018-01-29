import Context from "common/Context";
import IDGMSService from "./IDGMSService";
import RestDGMSService from "./RestDGMSService";

const DGMSServiceContext = new Context<IDGMSService>({
    value: new RestDGMSService()
});

export { DGMSServiceContext as default, DGMSServiceContext };