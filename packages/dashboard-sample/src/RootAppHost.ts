import { BrowserAppHost } from "@twii/common/lib/model/BrowserAppHost";

const RootAppHost = new BrowserAppHost();
RootAppHost.setRoot(true);
RootAppHost.window = window;

export { RootAppHost as default, RootAppHost }