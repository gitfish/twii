import Context from "common/Context";
import IPNRService from "./IPNRService";
import RestPNRService from "./RestPNRService";

const PNRServiceContext = new Context<IPNRService>({
    factory() {
        return new RestPNRService();
    }
});

export { PNRServiceContext as default, PNRServiceContext }