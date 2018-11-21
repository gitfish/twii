import * as React from "react";
import IAppHost from "../IAppHost";
import "./FrameWrapper.scss";

interface IFrameWrapperProps {
    title: string;
    url: string;
    host?: IAppHost;
}

class FrameWrapper extends React.Component<IFrameWrapperProps, any> {
    private _frameRef : HTMLIFrameElement;
    private _reloadFrame : boolean = false;
    private _containerRef : HTMLDivElement;
    private _onHostResize = () => {
        const bounds = this._containerRef.getBoundingClientRect();
        if(bounds.height > 0) {
            if(this._reloadFrame) {
                this._reloadFrame = false;
                this._frameRef.src = this.props.url;
            }
        } else {
            this._frameRef.src = "about:blank";
            this._reloadFrame = true;
        }
        this._frameRef.width = String(bounds.width);
        this._frameRef.height = String(bounds.height);
    };
    componentDidMount() {
        if(this.props.host) {
            this.props.host.addEventListener("resize", this._onHostResize);
            this._onHostResize();
        }
    }
    componentWillUnmount() {
        if(this.props.host) {
            this.props.host.removeEventListener("resize", this._onHostResize);
        }
        if(this._frameRef) {
            this._frameRef.src = "about:blank";
        }
        this._reloadFrame = false;
    }

    private _onFrameRef = (ref : HTMLIFrameElement) => {
        this._frameRef = ref;
    };
    private _onContainerRef = (ref : HTMLDivElement) => {
        this._containerRef = ref;
    };
    render() {
        return (
            <div className="frame-wrapper" ref={this._onContainerRef}>
                <iframe className="wrapped-frame" src={this.props.url} width={"100%"} height={400} ref={this._onFrameRef} />
            </div>
        );
    }
}


export { FrameWrapper as default, FrameWrapper, IFrameWrapperProps }