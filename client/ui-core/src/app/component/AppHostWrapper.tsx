import * as React from "react";
import { IAppWrapperProps, AppWrapper } from "./AppWrapper";
import { IAppHost } from "@twii/core/lib/app/IAppHost";
import { css } from "@uifabric/utilities/lib/css";

interface IAppHostWrapperProps extends IAppWrapperProps {
    host: IAppHost;
}

/**
 * This is a convenience wrapper for wrapping a context based component in an
 * application wrapper if need be.
 */
class AppHostWrapper extends React.Component<IAppHostWrapperProps, any> {
    componentWillMount() {
        const qr = this.props.host.params._root;
        if(qr !== undefined) {
            this.props.host.root = qr && (qr === "true" || qr === "1") ? true : false;
        }
    }
    render() {
        if(this.props.host.root) {
            return <AppWrapper {...this.props}>{this.props.children}</AppWrapper>;
        }
        return <div className={css("app-host-wrapper", this.props.className)}>{this.props.children}</div>;
    }
}

export { IAppHostWrapperProps, AppHostWrapper as default, AppHostWrapper }