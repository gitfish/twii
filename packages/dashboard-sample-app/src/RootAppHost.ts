import { BrowserAppHost } from "@twii/common/lib/model/BrowserAppHost";
import { AppRouter } from "./AppRouter";

const RootAppHost = new BrowserAppHost();
RootAppHost.setRouter(AppRouter);
RootAppHost.setRoot(true);
RootAppHost.window = window;

export { RootAppHost }