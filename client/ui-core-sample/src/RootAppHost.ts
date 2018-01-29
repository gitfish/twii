import { BrowserAppHost } from "@navish/core/lib/app/BrowserAppHost";

const RootAppHost = new BrowserAppHost();
RootAppHost.window = window;

export { RootAppHost as default, RootAppHost }