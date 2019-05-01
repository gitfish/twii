import * as React from "react";
import { IAppHost } from "@twii/core/lib/IAppHost";
import { AppHost } from "@twii/core/lib/AppHost";
import { IAppHostProps, AppHostContainer } from "./AppHost";
import { IRequest } from "@twii/router/lib/IRequest";
import { IRouter } from "@twii/router/lib/IRouter";
import { IAppLauncher } from "@twii/core/lib/IAppLauncher";

interface IAppContainerProps {
    request?: IRequest;
    router?: IRouter;
    launcher?: IAppLauncher;
    root?: boolean;
    onRenderSync?: (props : IAppHostProps) => React.ReactElement;
    onRenderError?: (host : IAppHostProps) => React.ReactElement;
}

interface IAppContainer {
    host: IAppHost;
}

const AppContainer = (props : IAppContainerProps) => {
    const hostRef = React.useRef<AppHost>();
    if(!hostRef.current) {
        hostRef.current = new AppHost();
    }
    const host = hostRef.current;
    host.root = props.root ? true : false;
    host.router = props.router;
    host.launcher = props.launcher;
    
    React.useEffect(() => {
        hostRef.current.load(props.request);
    }, [props.request, props.router]);

    return (
        <AppHostContainer host={hostRef.current}
                          onRenderSync={props.onRenderSync}
                          onRenderError={props.onRenderError} />
    );
    
};

export {
    IAppContainerProps,
    IAppContainer,
    AppContainer
}