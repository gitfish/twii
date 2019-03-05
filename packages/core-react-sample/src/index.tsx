import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserAppHost } from "@twii/core/lib/BrowserAppHost";
import { AppHostContainer } from "@twii/core-react/lib/component/AppHost";
import AppRouter from "./AppRouter";

const host = new BrowserAppHost();
host.setRoot(true);
host.window = window;
host.router = AppRouter;
host.publicPath = AppConfig.basePath;

const main = document.createElement("div");
main.id = "main";
document.body.appendChild(main);

// render
ReactDOM.render(
    <AppHostContainer host={host} />,
    main
);
