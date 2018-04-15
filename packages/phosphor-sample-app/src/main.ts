import { BrowserAppHost } from "@twii/common/lib/model/BrowserAppHost";
import { AppRouter } from "./AppRouter";
import "./styles/index.css";

const host = new BrowserAppHost();
host.setRoot(true);
host.setRouter(AppRouter);
host.window = window;

host.load();