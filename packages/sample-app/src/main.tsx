import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserAppHost } from "@twii/common/lib/model/BrowserAppHost";
import { AppRouter } from "./AppRouter";
import { AppHostContainer } from "@twii/fabric-ui/lib/component/AppHost";
import { initializeIcons } from "@uifabric/icons";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";

console.log("-- Fabric Icon Base Path: " + AppConfig.env.fabricIconBasePath);

// fabric icon initialization
initializeIcons(AppConfig.env.fabricIconBasePath);

const host = new BrowserAppHost();
host.setRoot(true);
host.setRouter(AppRouter);
host.window = window;

// render
ReactDOM.render(
    <Fabric><AppHostContainer host={host} /></Fabric>,
    document.getElementById("main")
);