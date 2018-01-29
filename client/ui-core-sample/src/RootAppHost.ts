import { BrowserAppHost } from "@twii/core/lib/app/BrowserAppHost";

const RootAppHost = new BrowserAppHost();
RootAppHost.window = window;

export { RootAppHost as default, RootAppHost }