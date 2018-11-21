import * as React from "react";
import { IAppWrapperProps, AppWrapper } from "./AppWrapper";
import IAppHost from "../IAppHost";
import { css } from "@uifabric/utilities/lib/css";

interface IAppHostWrapperProps extends IAppWrapperProps {
    host: IAppHost;
}

/**
 * This is a convenience wrapper for wrapping a context based component in an
 * application wrapper if need be.
 */
class AppHostWrapper extends React.Component<IAppHostWrapperProps, any> {
    render() {
        if(this.props.host.root) {
            return <AppWrapper {...this.props}>{this.props.children}</AppWrapper>;
        }
        return <div className={css("app-host-wrapper", this.props.className)}>{this.props.children}</div>;
    }
}

export { AppHostWrapper as default, AppHostWrapper, IAppHostWrapperProps }