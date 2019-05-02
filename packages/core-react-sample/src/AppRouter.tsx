import { Router } from "@twii/router/lib/Router";
import { reactRouter } from "@twii/router-react";

const AppRouter = new Router();

const homeRouter = reactRouter(() => import("./component/Home"), { exact: false });
AppRouter.use((req, next) => {
    if (req.path === "/" || req.path === "/index" || req.path === "/home") {
        return homeRouter(req, next);
    }
    return next(req);
});
AppRouter.use("/import", reactRouter(() => import("./component/Import")));
AppRouter.use("/form", reactRouter(() => import("./component/Form")));
AppRouter.use("/card", reactRouter(() => import("./component/Card")));

export {
    AppRouter,
    AppRouter as default
}
