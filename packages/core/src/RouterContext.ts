import { Context } from "./Context";
import { IRouter } from "./IRouter";
import AppContext from "./AppContext";

const RouterContext = new Context<IRouter>({
    factory() {
        return AppContext.value.router;
    }
});

export { RouterContext }