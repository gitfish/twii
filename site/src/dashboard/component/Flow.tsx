import * as React from "react";
import { observer } from "mobx-react";
import IStack from "../IStack";
import IWindow from "../IWindow";
import { removeComponent } from "../ComponentActions";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { ClassNames } from "./Flow.style";
import { ProjectedWindowPortal } from "./WindowPortal";

interface IFlowProps {
    stack: IStack;
}

@observer
class FlowCloseAction extends React.Component<IFlowProps, any> {
    private _onRemoveConfirm = () => {
        this.props.stack.close();
    }
    private _onClick = () => {
        if(this.props.stack.windowCount > 1) {
            removeComponent({ component: this.props.stack, saveHandler: this._onRemoveConfirm });
        } else {
            this.props.stack.close();
        }
    }
    render() {
        if(!this.props.stack.closeDisabled) {
            return <IconButton className={css("flow-action", "close-action")} title="Close all Widgets" iconProps={{ iconName: "ChromeClose" }} onClick={this._onClick} />
        }
        return null;
    }
}

@observer
class FlowAddAction extends React.Component<IFlowProps, any> {
    private _onClick = () => {
        this.props.stack.addNew();
    }
    render() {
        if(this.props.stack.addApplet) {
            return <IconButton className={css("flow-action", "add-action")} title="Add Widget" iconProps={{ iconName: "Add" }} onClick={this._onClick} />
        }
        return null;
    }
}

class FlowNearActionBar extends React.Component<IFlowProps, any> {
    render() {
        return (
            <div className={css(ClassNames.nearActionBar, "flow-near-action-bar")}>
                <FlowAddAction {...this.props} />
            </div>
        )
    }
}

class FlowFarActionBar extends React.Component<IFlowProps, any> {
    render() {
        return (
            <div className={css(ClassNames.farActionBar, "flow-far-action-bar")}>
                <FlowCloseAction {...this.props} />
            </div>
        )
    }
}

@observer
class FlowHeader extends React.Component<IFlowProps, any> {
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const db = this.props.stack.dashboard;
        if(db && db.drag) {
            e.preventDefault();
            try {
                e.dataTransfer.dropEffect = "move";
            } catch(ex) {}
        }
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const s = this.props.stack;
        s.dropWindow(s.windowCount > 0 ? s.windows[0] : undefined);
    }
    render() {
        if(this.props.stack.addApplet || !this.props.stack.closeDisabled) {
            return (
                <div className={css(ClassNames.header, "flow-header")} onDragOver={this._onDragOver} onDrop={this._onDrop}>
                    <FlowNearActionBar {...this.props} />
                    <FlowFarActionBar {...this.props} />
                </div>
            );
        }
        return null;
    }
}

interface IFlowWindowProps extends IFlowProps {
    window: IWindow;
    height?: number;
}

@observer
class FlowWindowTitle extends React.Component<IFlowWindowProps, any> {
    render() {
        return (
            <div className={css(ClassNames.windowTitleContainer, "flow-window-title-container")}>
                <div className={css(ClassNames.windowTitle, "flow-window-title")}>
                    {this.props.window.title}
                </div>
            </div>
        );
    }
}

@observer
class FlowWindowCloseAction extends React.Component<IFlowWindowProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.close();
    }
    render() {
        if(this.props.window && !this.props.window.closeDisabled) {
            return <IconButton className={css("flow-window-action", "close-action")}
                               title={`Close ${this.props.window.title || "Widget"}`}
                               iconProps={{ iconName: "ChromeClose" }}
                               onMouseDown={this._onMouseDown}
                               onClick={this._onClick} />
        }
        return null;
    }
}

@observer
class FlowWindowToggleAction extends React.Component<IFlowWindowProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.toggleContent();
    }
    render() {
        return <IconButton className={css("flow-window-action", "toggle-action")}
                            title={`Toggle ${this.props.window.title || "Widget"}`}
                            iconProps={{ iconName: this.props.window.contentHidden ? "ChevronDown" : "ChevronUp" }}
                            onMouseDown={this._onMouseDown}
                            onClick={this._onClick} />
    }
}

class FlowWindowActionBar extends React.Component<IFlowWindowProps, any> {
    render() {
        return (
            <div className={css(ClassNames.windowActionBar, "flow-window-action-bar")}>
                <FlowWindowToggleAction {...this.props} />
                <FlowWindowCloseAction {...this.props} />
            </div>
        );
    }
}

class FlowWindowHeader extends React.Component<IFlowWindowProps, any> {
    private _onMouseDown = () => {
        this.props.stack.setActive(this.props.window);
    }
    private _onClick = () => {
        this.props.window.toggleContent();
    }
    private _onDragStart = (e : React.DragEvent<HTMLElement>) => {
        const db = this.props.stack.dashboard;
        if(db) {
            e.stopPropagation();
            const transferText = String(JSON.stringify(this.props.window.config));
            e.dataTransfer.setData("text", transferText);
            window.setTimeout(() => {
                db.setDrag(this.props.window);
            }, 1);
        }
    }
    private _onDragEnd = (e : React.DragEvent<HTMLElement>) => {
        const db = this.props.stack.dashboard;
        if(db) {
            db.clearDrag();
        }
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const db = this.props.stack.dashboard;
        const drag = db ? db.drag : undefined;
        if(drag) {
            e.stopPropagation();
            if(drag !== this.props.window) {
                e.preventDefault();
                try {
                    e.dataTransfer.dropEffect = "move";
                } catch(ex) {}
            }
        }
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.stack.dropWindow(this.props.window);
    }
    render() {
        return (
            <div className={css(ClassNames.windowHeader, "window-header")}
                draggable={true}
                onMouseDown={this._onMouseDown}
                onClick={this._onClick}
                 onDragStart={this._onDragStart}
                 onDragEnd={this._onDragEnd}
                 onDragOver={this._onDragOver}
                 onDrop={this._onDrop}>
                <FlowWindowTitle {...this.props} />
                <FlowWindowActionBar {...this.props} />
            </div>
        );
    }
}

@observer
class FlowWindowBody extends React.Component<IFlowWindowProps, any> {
    render() {
        return (
            <div className={css(ClassNames.windowBody, "window-body", { "content-hidden": this.props.window.contentHidden})}>
                <ProjectedWindowPortal window={this.props.window} className="flow-window-portal" listenToPosition={true} />
            </div>
        );
    }
}

@observer
class FlowWindow extends React.Component<IFlowWindowProps, any> {
    render() {
        let s : React.CSSProperties;
        if(!this.props.window.contentHidden) {
            s = { height: this.props.height };
        }
        return (
            <div className={css(ClassNames.window, "flow-window", "pane", { "content-hidden": this.props.window.contentHidden })} style={s}>
                <FlowWindowHeader {...this.props} />
                <FlowWindowBody {...this.props} />
            </div>
        );
    }
}

@observer
class FlowAppender extends React.Component<IFlowProps, any> {
    private _onClick = () => {
        this.props.stack.addNew();
    }
    render() {
        if(this.props.stack.addApplet) {
            return (
                <div className={css(ClassNames.appender, "flow-appender")} onClick={this._onClick}>
                    <Icon iconName="AddTo" />
                </div>
            );
        }
        return null;
    }
}

interface IFlowWindowsState {
    windowHeight: number;
}

@observer
class FlowBody extends React.Component<IFlowProps, IFlowWindowsState> {
    private _ref : HTMLElement;
    constructor(props : IFlowProps) {
        super(props);
        this.state = {
            windowHeight: 400
        };
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const stack = this.props.stack;
        const db = stack.dashboard;
        const drag = db ? db.drag : undefined;
        if(drag) {
            let isTarget = false;
            if(drag.parent !== stack) {
                isTarget = true;
            } else {
                const idx = stack.windows.indexOf(drag as IWindow);
                isTarget = idx < stack.windowCount - 1;
            }

            if(isTarget) {
                e.stopPropagation();
                e.preventDefault();
                try {
                    e.dataTransfer.dropEffect = "move";
                } catch(ex) {}
            }
        }
    }

    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.stack.dropWindow();
    }

    private _onResize = () => {
        if(this._ref) {
            const bounds = this._ref.getBoundingClientRect();
            if(bounds.height > 0) {
                this.setState({ windowHeight: Math.floor(bounds.height * 0.8)});
            }
        }
    }

    componentDidMount() {
        this.props.stack.addEventListener("resize", this._onResize);
        this._onResize();
    }

    componentWilUnmount() {
        this.props.stack.removeEventListener("resize", this._onResize);
    }

    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
    }

    render() {
        if(this.props.stack.windowCount > 0) {
            const wins = this.props.stack.windows.map(w => {
                return <FlowWindow key={w.id} stack={this.props.stack} window={w} height={this.state.windowHeight} />;
            });
            return (
                <div className={css(ClassNames.body, "flow-body")}
                    onDragOver={this._onDragOver}
                    onDrop={this._onDrop}
                    ref={this._onRef}>
                    {wins}
                    <FlowAppender {...this.props} />
                </div>
            );
        }
        return null;
    }

    componentDidUpdate() {
        this.props.stack.notifyResizeWindows();
    }
}

class Flow extends React.Component<IFlowProps, any> {
    private _onScroll = () => {
        this.props.stack.windows.forEach(w => w.emit({ type: "resize" }));
    }
    render() {
        return (
            <div id={this.props.stack.id} className={css(ClassNames.root, "flow")} onScroll={this._onScroll}>
                <FlowBody {...this.props} />
            </div>
        );
    }
}

export { Flow as default, Flow }