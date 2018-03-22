import { BrowserAppHost } from "@twii/common/lib/model/BrowserAppHost";

const RootAppHost = new BrowserAppHost();
RootAppHost.window = window;

export { RootAppHost as default, RootAppHost }