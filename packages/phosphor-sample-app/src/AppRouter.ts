import { Router } from "@twii/router/lib/Router";

const AppRouter = new Router();
AppRouter.use("/samples/dock", () => {
    import("@twii/phosphor-sample/lib/DockPanelSample").then(m => {
        m.main();
    });
});

AppRouter.use("/", () => {
    import("@twii/phosphor-sample/lib/DockPanelSample").then(m => {
        m.main();
    });
});

export { AppRouter }