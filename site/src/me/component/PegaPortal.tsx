import * as React from "react";
import Details from "common/component/Details"
import {IMECase} from "../IMECase";
import IAppHost from "app/IAppHost";
import "./PegaPortal.scss";

interface IPegaPortalProps {
    url?: string;
    host?: IAppHost;
    onMessage?: (meCase : IMECase) => void;
}

interface IPegaPortalState {
    renderFrame: boolean;
}

class PegaPortal extends React.Component<IPegaPortalProps, any> {
    private _frameRef : HTMLIFrameElement;
    private _containerRef : HTMLDivElement;
    constructor(props : IPegaPortalProps) {
        super(props);
        this.state = { renderFrame: false };
    }
    private _onMessage = (e : MessageEvent) => {
        console.log("-- The Message ", e);
        if(this.props.onMessage) {
            this.props.onMessage(e.data);
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
        // we shouldn't be using this - this should only be using the frame instance
        if (window.addEventListener) {
            window.addEventListener("message", this._onMessage);
        }
        if(this.props.host) {
            this.props.host.addEventListener("resize", this._onResize);
            this._onResize();
        }
    }
    componentWillUnmount() {
        if(window.removeEventListener) {
            window.removeEventListener("message", this._onMessage);
        }
        if(this.props.host) {
            this.props.host.removeEventListener("resize", this._onResize);
        }
    }

    private _onFrameRef = (ref : HTMLIFrameElement) => {
        this._frameRef = ref;
        if(this._frameRef) {
            this._onResize();
        }
    };
    private _onContainerRef = (ref : HTMLDivElement) => {
        this._containerRef = ref;
    }
    private _onFrameLoaded = (e : React.SyntheticEvent<HTMLIFrameElement>) => {
         const frame = e.target as HTMLIFrameElement;
         frame.contentWindow.addEventListener("message", this._onMessage);
    };
    render() {
        const frame = this.state.renderFrame ?
        <iframe className="me-portal-frame" src={this.props.url || "/prweb/PRServletContainerAuth"} width={"100%"} height={400} ref={this._onFrameRef} onLoad={this._onFrameLoaded} /> : undefined; 
        return (
            <div className="me-portal" ref={this._onContainerRef}>
                {frame}
            </div>
        );
    }
}


export { PegaPortal as default, PegaPortal, IPegaPortalProps }