import { Context } from "common/Context";
import { ISmartGateService } from "./ISmartGateService";
import { MockSmartGateService } from "./MockSmartGateService";

const SmartGateServiceContext = new Context<ISmartGateService>({
    factory() {
        return new MockSmartGateService();
    }
});

export { SmartGateServiceContext }