import * as React from "react";
import { observer } from "mobx-react-lite";
import { IAppHostBaseProps } from "./IAppHostBaseProps";

interface IAppHostProps extends IAppHostBaseProps {
    onRenderSync?: (props : IAppHostProps) => React.ReactElement;
    onRenderError?: (props : IAppHostProps) => React.ReactElement;
    noLoadOnMount?: boolean;
}

const AppHostError = (props : IAppHostProps) => {
    React.useEffect(() => {
        props.host.title = "Error";
    });

    const error = props.host.sync.error;
    return (
        <div style={{ color: "red" }}>
            <h3>An Error has occurred</h3>
            {error.message && (
                <div style={{ paddingTop: 8 }}>{error.message}</div>
            )}
            {error.stack && (
                <div style={{ paddingTop: 8 }}>{error.stack}</div>
            )}
        </div>
    );
};

const AppHostContainerView = observer((props : IAppHostProps) => {
    if(props.host.sync.error) {
        return props.onRenderError ? props.onRenderError(props) : <AppHostError {...props} />;
    }
    return props.host.view || null;
});

const AppHostContainerSync = observer((props : IAppHostProps) => {
    if(props.host.sync.syncing && props.onRenderSync) {
        return props.onRenderSync(props);
    }
    return null;
});

const AppHostContainer = (props : IAppHostProps) => {
    React.useEffect(() => {
        if(!props.noLoadOnMount) {
            props.host.load();
        }
    });
    return (
        <div>
            <AppHostContainerSync {...props} />
            <AppHostContainerView {...props} />
        </div>
    );
};

export {
    IAppHostProps,
    AppHostContainer
}