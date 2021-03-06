import * as React from "react";
import { observer } from "mobx-react";
import { IWindow } from "../model/IWindow";
import { IWindowStyles, getStyles } from "./Window.styles";
import { IWindowClassNames, getClassNames } from "./Window.classNames";
import { css } from "@uifabric/utilities";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { WindowResizeType } from "../model/WindowResizeType";
import { AppHostContainer } from "@twii/common/lib/component/AppHost";
import { HostAppIcon } from "@twii/common/lib/component/HostAppIcon";
import { dispatchWindowResize } from "../DOMHelper";

interface IWindowProps {
    window: IWindow;
    styles?: IWindowStyles;
    className?: string;
}

@observer
class WindowCloseAction extends React.Component<IWindowProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.close();
    }
    render() {
        if(this.props.window && !this.props.window.closeDisabled) {
           return (
                <button type="button"
                        className={css(this.props.className, "close-action")}
                        title={`Close ${this.props.window.title || "App"}`}
                        onClick={this._onClick}
                        onMouseDown={this._onMouseDown}>
                    <Icon className="window-action-icon" iconName="ChromeClose" />
                </button>
           );
        }
        return null;
    }
}

@observer
class WindowMaximizeAction extends React.Component<IWindowProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.setMaximized(!this.props.window.maximized);
    }
    render() {
        if(this.props.window) {
            return (
                <button type="button"
                        className={css(this.props.className, "maximize-action")}
                        title={this.props.window.maximized ? "Restore" : "Maximize"}
                        onClick={this._onClick}
                        onMouseDown={this._onMouseDown}>
                    <Icon className="window-action-icon" iconName={this.props.window.maximized ? "BackToWindow" : "FullScreen" } />
                </button>
            )
        }
        return null;
    }
}

@observer
class WindowIconContainer extends React.Component<IWindowProps, any> {
    render() {
        const host = this.props.window.appHost;
        const icon = host.icon;
        if(icon.name || icon.text || icon.url || icon.component) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={classNames.iconContainer}>
                    <HostAppIcon host={host} /> 
                </div>
            );
        }
        return null;
    }
}

@observer
class Window extends React.Component<IWindowProps, any> {
    private _ref : HTMLDivElement;
    private _classNames : IWindowClassNames;
    private _canDrag : boolean = false;
    private _dragOffsetX : number;
    private _dragOffsetY : number;
    private _onHeaderMouseDown = (e : React.MouseEvent<HTMLElement>) => {
        if(this.props.window.settings.draggable) {
            this._canDrag = true;
            this._ref.draggable = true;
            const bounds = this._ref.getBoundingClientRect();
            this._dragOffsetX = e.clientX - bounds.left;
            this._dragOffsetY = e.clientY - bounds.top;
        }
    }
    private _onHeaderDoubleClick = (e : React.MouseEvent<HTMLElement>) => {
        const { window } = this.props;
        window.setMaximized(!window.maximized);
    }
    private _onDragStart = (e : React.DragEvent<HTMLElement>) => {
        if(this._canDrag) {
            e.stopPropagation();
            const transferText = String(JSON.stringify(this.props.window.config));
            e.dataTransfer.setData("text", transferText);
            window.setTimeout(() => {
                this.props.window.dragStart({ offsetX: this._dragOffsetX, offsetY: this._dragOffsetY });
            }, 1);
        } else {
            e.preventDefault();
        }
    }
    private _onDragEnd = (e : React.DragEvent<HTMLElement>) => {
        this._canDrag = false;
        this._ref.draggable = false;
        this.props.window.dragEnd();
    }
    private _resizeDragStartHandler(type : WindowResizeType) {
        return (e : React.DragEvent<HTMLElement>) => {
            e.stopPropagation();
            e.dataTransfer.setData("text", "Resizing Window " + this.props.window.id);
            window.setTimeout(() => {
                this.props.window.resizeStart(type);
            }, 1);
        };
    }
    private _onResizeDragEnd = (e : React.DragEvent<HTMLElement>) => {
        this.props.window.resizeEnd();
    }
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    private _renderIcon() : React.ReactNode {
        return <WindowIconContainer {...this.props} />;
    }
    private _renderTitle() : React.ReactNode {
        return (
            <div className={this._classNames.titleContainer}>
                <div className={this._classNames.title}>
                    {this.props.window.title}
                </div>
            </div>
        );
    }
    private _renderActionBar() : React.ReactNode {
        return (
            <div className={this._classNames.actionBar}>
                <WindowMaximizeAction {...this.props} className={css(this._classNames.action, "maximize-action")} />
                <WindowCloseAction {...this.props} className={css(this._classNames.action, "close-action")} />
            </div>
        );
    }
    private _renderHeader() : React.ReactNode {
        if(this.props.window.settings.headerHeight > 0) {
            return (
                <div className={this._classNames.header}
                    onMouseDown={this._onHeaderMouseDown}
                    onDoubleClick={this._onHeaderDoubleClick}
                    style={{
                        top: 0,
                        right: 0,
                        left: 0,
                        height: this.props.window.settings.headerHeight
                    }}>
                    {this._renderIcon()}
                    {this._renderTitle()}
                    {this._renderActionBar()}
                </div>
            );
        }
        return null;
    }
    private _renderBody() : React.ReactNode {
        return (
            <div className={css(this._classNames.body, { "content-hidden": this.props.window.contentHidden})}
                 style={{
                    top: this.props.window.settings.headerHeight,
                    right: 0,
                    bottom: 0,
                    left: 0
                 }}>
                 <AppHostContainer host={this.props.window.appHost} />
            </div>
        );
    }
    private _renderResizeHandle(resizeType : WindowResizeType) : React.ReactNode {
        if(this.props.window.settings.resizable && !this.props.window.maximized) {
            return (
                <div className={css(this._classNames.resize, resizeType)}
                     draggable
                     onDragStart={this._resizeDragStartHandler(resizeType)}
                     onDragEnd={this._onResizeDragEnd}>
                </div>
            );
        }
        return null;
    }
    private notifyResize() {
        this.props.window.appHost.emit({ type: "resize" });
        dispatchWindowResize();
    }
    private _onTransitionEnd = () => {
        this.notifyResize();
    }
    render() {
        const { window, styles, className } = this.props;
        const { draggable } = window.settings;
        this._classNames = getClassNames(getStyles(null, styles), className);
        const style : React.CSSProperties = {
            position: "absolute",
            top: window.y,
            left: window.x,
            width: window.width,
            height: window.height,
            overflow: "hidden",
            zIndex: window.maximized ? 4 : 1,
            borderWidth: window.maximized ? 0 : window.settings.borderWidth
        };
        return (
            <div id={window.id}
                className={css(this._classNames.root, `manager-type-${window.manager ? window.manager.type : "unknown"}`,
                {
                    maximized: window.maximized,
                    "animate-position": window.settings.animatePosition,
                })}
                style={style}
                onDragStart={draggable ? this._onDragStart : undefined}
                onDragEnd={draggable ? this._onDragEnd : undefined}
                onTransitionEnd={window.settings.animatePosition ? this._onTransitionEnd : undefined}
                role={window.settings.role}
                ref={this._onRef}>
                {this._renderHeader()}
                {this._renderBody()}
                {this._renderResizeHandle(WindowResizeType.top)}
                {this._renderResizeHandle(WindowResizeType.right)}
                {this._renderResizeHandle(WindowResizeType.bottom)}
                {this._renderResizeHandle(WindowResizeType.left)}
                {this._renderResizeHandle(WindowResizeType.topRight)}
                {this._renderResizeHandle(WindowResizeType.topLeft)}
                {this._renderResizeHandle(WindowResizeType.bottomRight)}
                {this._renderResizeHandle(WindowResizeType.bottomLeft)}
            </div>
        );
    }
    componentDidMount() {
        this.notifyResize();
    }
    componentDidUpdate() {
        this.notifyResize();
    }
}

export { IWindowProps, Window }