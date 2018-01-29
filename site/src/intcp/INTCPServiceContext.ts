import Context from "common/Context";
import IINTCPService from "./IINTCPService";
import RestINTCPService from "./RestINTCPService";

const INTCPServiceContext = new Context<IINTCPService>({
    value: new RestINTCPService()
});

export { INTCPServiceContext as default, INTCPServiceContext };