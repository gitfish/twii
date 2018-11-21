import { Context } from "./Context";
import AppContext from "./AppContext";

const ConfigContext = new Context<any>({
    factory() {
        return AppContext.value.config
    }
});

export { ConfigContext }