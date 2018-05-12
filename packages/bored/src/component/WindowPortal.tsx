import * as React from "react";
import * as ReactDOM from "react-dom";
import { IWindow } from "../model/IWindow";
import { AppHostContainer } from "@twii/core-ui-fabric/lib/component/AppHost";
import { IWindowPortalStyles, getStyles } from "./WindowPortal.styles";
import { getClassNames } from "./WindowPortal.classNames";
import { dispatchWindowResize } from "./DOMHelper";

interface IWindowPortalProps {
    window: IWindow;
    className?: string;
    styles?: IWindowPortalStyles;
    listenToPosition?: boolean;
}

class ProjectedWindowPortal extends React.Component<IWindowPortalProps, any> {
    private _ref : HTMLElement;
    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
    }
    private _projectPortal = () => {
        if(this._ref) {
            // project the portal onto the container based on client bounds
            const portal = this.props.window.portal;
            if(portal) {
                const clientBounds = this._ref.getBoundingClientRect();
                const visible = clientBounds.height > 0 && clientBounds.width > 0;
                const s = portal.style;
                s.top = `${visible ? clientBounds.top : -1}px`;
                s.left = `${visible ? clientBounds.left : -1}px`;
                s.bottom = "";
                s.right = "";
                s.width = `${clientBounds.width}px`;
                s.height = `${clientBounds.height}px`;
                s.overflow = visible ? "auto" : "hidden";
                if(visible) {
                    dispatchWindowResize();
                }
            }
        }
    }
    private _addListeners = (props : IWindowPortalProps) => {
        props.window.addEventListener("resizeview", this._projectPortal);
        if(props.listenToPosition) {
            props.window.addEventListener("positionview", this._projectPortal);
        }
    }
    private _removeListeners = (props : IWindowPortalProps) => {
        props.window.removeEventListener("resizeview", this._projectPortal);
        if(props.listenToPosition) {
            props.window.removeEventListener("positionview", this._projectPortal);
        }
    }
    componentWillReceiveProps(nextProps : IWindowPortalProps) {
        if(nextProps.window !== this.props.window) {
            this._removeListeners(this.props);
        }
        if(nextProps.window) {
            this._addListeners(nextProps);
        }
        nextProps.window.emit({ type: "resize" });
    }
    private _renderApp() : Promise<any> {
        const portal = this.props.window.portal;
        if(portal && portal.children.length === 0) {
            this.props.window.onClose = () => {
                ReactDOM.unmountComponentAtNode(portal);
            };
            return new Promise((resolve, reject) =>  {
                ReactDOM.render(<AppHostContainer host={this.props.window.appHost} />, portal, () => {
                    resolve();
                });
            });
        }
        return Promise.resolve();
    }
    componentDidMount() {
        this._addListeners(this.props);
        this._renderApp();
        this.props.window.emit({ type: "resize" });
    }
    componentWillUnmount() {
        this._removeListeners(this.props);
        const portal = this.props.window.portal;
        if(portal) {
            const s = portal.style;
            s.top = "-1px";
            s.left = "-1px";
            s.width = "0px";
            s.height = "0px";
        }
    }
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        return (
            <div className={classNames.root} ref={this._onRef}>
            </div>
        );
    }
    componentDidUpdate() {
        this.props.window.emit({ type: "resize" })
    }
}

export { IWindowPortalProps, ProjectedWindowPortal }