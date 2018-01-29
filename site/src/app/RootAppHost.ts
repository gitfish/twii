import AppRouter from "./AppRouter";
import WindowAppHost from "./WindowAppHost";
import { WindowAppHostKey } from "./AppConstants";

const RootAppHost = new WindowAppHost();
RootAppHost.root = true;
RootAppHost.window = window;
RootAppHost.router = AppRouter;
RootAppHost.basePath = AppConfig.basePath;
window[WindowAppHostKey] = RootAppHost;

export { RootAppHost as default, RootAppHost }