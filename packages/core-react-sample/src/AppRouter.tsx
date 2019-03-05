import { Router } from "@twii/router/lib/Router";
import { reactRouter } from "@twii/router-react";

const AppRouter = new Router();

const defaultRouter = reactRouter(() => import("./component/Default"), { exact: false });
AppRouter.use((req, next) => {
    if (req.path === "/" || req.path === "/index") {
        return defaultRouter(req, next);
    }
    return next(req);
});

export {
    AppRouter,
    AppRouter as default
}
