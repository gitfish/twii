import * as React from "react";
import { IAppHostBaseProps } from "./IAppHostBaseProps";

interface IAppFrame {
    containerRef: HTMLDivElement;
    frameRef: HTMLIFrameElement;
}

interface IAppFrameProps extends IAppHostBaseProps {
    src?: string;
    className?: string;
    componentRef?: (frame : IAppFrame) => void;
}

class AppFrame extends React.Component<IAppFrameProps, any> implements IAppFrame {
    private _frameRef : HTMLIFrameElement;
    private _containerRef : HTMLDivElement;
    private _onResize = () => {
        if(this._containerRef && this._frameRef) {
            const bounds = this._containerRef.getBoundingClientRect();
            this._frameRef.width = String(bounds.width);
            this._frameRef.height = String(bounds.height);
        }
    }
    get frameRef() {
        return this._frameRef;
    }
    get containerRef() {
        return this._containerRef;
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
            this._frameRef.src = "about:blank";
        }
    }
    private _onContainerRef = (ref : HTMLDivElement) => {
        this._containerRef = ref;
        if(this.props.componentRef) {
            this.props.componentRef(this._containerRef ? this : undefined);
        }
        this._onResize();
    }
    private _onFrameRef = (ref : HTMLIFrameElement) => {
        this._frameRef = ref;
    }
    render() {
        return (
            <div className={this.props.className}
                 style={
                     { overflow: "hidden",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                 } ref={this._onContainerRef}>
                <iframe style={
                    {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        border: "none"
                    }
                } ref={this._onFrameRef} src={this.props.src} />
            </div>
        );
    }
};

export { IAppFrameProps, IAppFrame, AppFrame }