import { Context } from "./Context";
import { IRouter } from "@twii/router/lib/IRouter";

const AppRouterContext = new Context<IRouter>({
    id: "appRouter"
});

export { AppRouterContext }