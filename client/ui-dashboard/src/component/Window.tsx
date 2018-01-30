import * as React from "react";
import * as ReactDOM from "react-dom";
import { IWindow } from "../IWindow";
import { setSingleChild } from "../DOMHelper";
import { AppHostContainer } from "@twii/ui-core/lib/app/component/AppHost";
import { ClassNames } from "./Window.style";
import { css } from "office-ui-fabric-react/lib/Utilities";

interface IWindowProps {
    window: IWindow;
    className?: string;
}

class WindowPortal extends React.Component<IWindowProps, any> {
    private _ref : HTMLElement;
    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
        if(this._ref) {
            setSingleChild(this._ref, this.props.window.el);
        }
    }
    componentWillReceiveProps(nextProps : IWindowProps) {
        if(this._ref) {
            setSingleChild(this._ref, nextProps.window.el);
        }
    }
    private _resize() {
        this.props.window.emit({ type: "resize" });
    }
    private _renderPortal() : Promise<any> {
        if(this.props.window.el.children.length === 0) {
            this.props.window.unmountHandler = () => {
                ReactDOM.unmountComponentAtNode(this.props.window.el);
            };
            return new Promise((resolve, reject) =>  {
                ReactDOM.render(<AppHostContainer host={this.props.window.appHost} />, this.props.window.el, () => {
                    resolve();
                });
            });
        }
        return Promise.resolve();
    }
    componentDidMount() {
        this._renderPortal().then(() => {
            this._resize();
        });
    }
    render() {
        return (
            <div className={css(ClassNames.portal, "window-portal", this.props.className)} ref={this._onRef}>
            </div>
        )
    }
    componentDidUpdate() {
        this._resize();
    }
}

export { IWindowProps, WindowPortal }