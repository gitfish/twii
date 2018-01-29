import { Context } from "../common/Context";
import { IRouter } from "roota/lib/IRouter";

const AppRouterContext = new Context<IRouter>({
    id: "appRouter"
});

export { AppRouterContext }