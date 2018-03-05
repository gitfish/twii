import * as React from "react";
import * as ReactDOM from "react-dom";
import { RootAppHost } from "./RootAppHost";
import { AppRouterContext } from "@twii/core/lib/app/AppRouterContext";
import { AppRouter } from "./AppRouter";
import { AppHostContainer } from "@twii/ui-core/lib/app/component/AppHost";
import { initializeIcons } from "@uifabric/icons";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";

// configure our app router context
AppRouterContext.value = AppRouter;

// fabric icon initialization
initializeIcons(AppConfig.fabricIconBasePath);

// render
ReactDOM.render(
    <Fabric><AppHostContainer host={RootAppHost} /></Fabric>,
    document.getElementById("main")
);