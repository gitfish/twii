import { Context } from "./Context";
import { IRouter } from "roota/lib/IRouter";

const AppRouterContext = new Context<IRouter>({
    id: "appRouter"
});

export { AppRouterContext }