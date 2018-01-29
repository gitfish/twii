import * as React from "react";
import * as ReactDOM from "react-dom";
import RootAppHost from "app/RootAppHost";
import AppHostView from "app/component/AppHostView";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { initializeIcons } from "@uifabric/icons";
import "main.scss";

// fabric icon initialization
initializeIcons(AppConfig.fabricIconBasePath);

// render
ReactDOM.render(
    <Fabric className="analyst-desktop">
        <AppHostView host={RootAppHost} />
    </Fabric>,
    document.getElementById("main")
);
