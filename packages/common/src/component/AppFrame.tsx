import * as React from "react";
import { IAppHost } from "../IAppHost";
import { IAppFrameStyles, getStyles } from "./AppFrame.styles";
import { getClassNames } from "./AppFrame.classNames";
import { IRouter } from "roota/lib/IRouter";
import { AppRouterContext } from "../AppRouterContext";

interface IAppFrameProps {
    src: string;
    host: IAppHost;
    messageRouter?: IRouter;
    styles?: IAppFrameStyles;
    className?: string;
}

interface IAppFrameState {
    renderFrame: boolean;
}

class AppFrame extends React.Component<IAppFrameProps, IAppFrameState> {
    private _frameRef : HTMLIFrameElement;
    private _containerRef : HTMLDivElement;
    constructor(props : IAppFrameProps) {
        super(props);
        this.state = { renderFrame : false };
    }
    private get router() {
        return this.props.messageRouter || AppRouterContext.value;
    }
    private _onMessage = (e : MessageEvent) => {
        if(e.origin && e.source === this._frameRef.contentWindow) {
            this.router.handleRequest(e.data).then(value => {
                e.source.postMessage({ correlationId: e.data.correlationId, value: value }, "*");
            }).catch(error => {
                try {
                    e.source.postMessage({
                        correlationId: e.data.correlationId,
                        error: error
                    }, "*");
                } catch(e) {
                    e.source.postMessage({
                        correlationId: e.data.correlationId,
                        error: { message: "Error processing message", details: JSON.stringify(error) }
                    }, "*");
                }
            });
        }
    }
    private _onResize = () => {
        const bounds = this._containerRef.getBoundingClientRect();
        if(this._frameRef) {
            this._frameRef.width = String(bounds.width);
            this._frameRef.height = String(bounds.height);
        }
        if(!this.state.renderFrame && bounds.width > 0 && bounds.height > 0) {
            this.setState({ renderFrame: true });
        }
    }
    componentDidMount() {
        const host = this.props.host;
        if(host) {
            host.addEventListener("resize", this._onResize);
            this._onResize();
        }
    }
    componentWillUnmount() {
        if(this.props.host) {
            this.props.host.removeEventListener("resize", this._onResize);
        }
        if(this._frameRef) {
            this._frameRef.removeEventListener("load", this._onFrameLoaded);
            if(this._frameRef.contentWindow) {
                try {
                    this._frameRef.contentWindow.removeEventListener("message", this._onMessage);
                } catch(e) {
                    console.error(e);
                }
            }
            this._frameRef.src = "about:blank";
        }
    }
    private _onContainerRef = (ref : HTMLDivElement) => {
        this._containerRef = ref;
    }
    private _onFrameRef = (ref : HTMLIFrameElement) => {
        this._frameRef = ref;
        if(this._frameRef) {
            this._onResize();
        }
    }
    private _onFrameLoaded = (e) => {
        try {
            this._frameRef.contentWindow.addEventListener("message", this._onMessage);
        } catch(e) {
            console.error(e);
        }
    };
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        const frame = this.state.renderFrame ?
            <iframe className={classNames.frame} ref={this._onFrameRef} src={this.props.src} onLoad={this._onFrameLoaded} /> : undefined;
        return (
            <div className={classNames.root} ref={this._onContainerRef}>
                {frame}
            </div>
        );
    }
};

export { IAppFrameProps, IAppFrameState, AppFrame }