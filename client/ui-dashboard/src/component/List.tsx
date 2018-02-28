import * as React from "react";
import { observer } from "mobx-react";
import { IStack } from "../IStack";
import { IWindow } from "../IWindow";
import { removeComponent } from "../ComponentActions";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { IListStyles, getStyles } from "./List.styles";
import { IListClassNames, getClassNames } from "./List.classNames";
import { ProjectedWindowPortal } from "./WindowPortal";

interface IListProps {
    stack: IStack;
    className?: string;
    styles?: IListStyles;
    classNames?: IListClassNames;
}

@observer
class ListCloseAction extends React.Component<IListProps, any> {
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
            return <IconButton className={css("list-action", "close-action")} title="Close all Widgets" iconProps={{ iconName: "ChromeClose" }} onClick={this._onClick} />
        }
        return null;
    }
}

@observer
class ListAddAction extends React.Component<IListProps, any> {
    private _onClick = () => {
        this.props.stack.addNew();
    }
    render() {
        if(this.props.stack.addApp) {
            return <IconButton className={css("list-action", "add-action")} title="Add Widget" iconProps={{ iconName: "Add" }} onClick={this._onClick} />
        }
        return null;
    }
}

class ListNearActionBar extends React.Component<IListProps, any> {
    render() {
        return (
            <div className={this.props.classNames.nearActionBar}>
                <ListAddAction {...this.props} />
            </div>
        )
    }
}

class ListFarActionBar extends React.Component<IListProps, any> {
    render() {
        return (
            <div className={this.props.classNames.farActionBar}>
                <ListCloseAction {...this.props} />
            </div>
        )
    }
}

@observer
class ListHeader extends React.Component<IListProps, any> {
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
        if(this.props.stack.addApp || !this.props.stack.closeDisabled) {
            return (
                <div className={this.props.classNames.windowHeader} onDragOver={this._onDragOver} onDrop={this._onDrop}>
                    <ListNearActionBar {...this.props} />
                    <ListFarActionBar {...this.props} />
                </div>
            );
        }
        return null;
    }
}

interface IListWindowProps extends IListProps {
    window: IWindow;
    height?: number;
}

@observer
class ListWindowTitle extends React.Component<IListWindowProps, any> {
    render() {
        return (
            <div className={this.props.classNames.windowTitleContainer}>
                <div className={this.props.classNames.windowTitle}>
                    {this.props.window.title}
                </div>
            </div>
        );
    }
}

@observer
class ListWindowCloseAction extends React.Component<IListWindowProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.close();
    }
    render() {
        if(this.props.window && !this.props.window.closeDisabled) {
            return <IconButton className={css("list-window-action", "close-action")}
                               title={`Close ${this.props.window.title || "Widget"}`}
                               iconProps={{ iconName: "ChromeClose" }}
                               onMouseDown={this._onMouseDown}
                               onClick={this._onClick} />
        }
        return null;
    }
}

@observer
class ListWindowToggleAction extends React.Component<IListWindowProps, any> {
    private _onMouseDown = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.window.toggleContent();
    }
    render() {
        return <IconButton className={css("list-window-action", "toggle-action")}
                            title={`Toggle ${this.props.window.title || "Widget"}`}
                            iconProps={{ iconName: this.props.window.contentHidden ? "ChevronDown" : "ChevronUp" }}
                            onMouseDown={this._onMouseDown}
                            onClick={this._onClick} />
    }
}

class ListWindowActionBar extends React.Component<IListWindowProps, any> {
    render() {
        return (
            <div className={this.props.classNames.windowActionBar}>
                <ListWindowToggleAction {...this.props} />
                <ListWindowCloseAction {...this.props} />
            </div>
        );
    }
}

class ListWindowHeader extends React.Component<IListWindowProps, any> {
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
            <div className={this.props.classNames.windowHeader}
                draggable={true}
                onMouseDown={this._onMouseDown}
                onClick={this._onClick}
                 onDragStart={this._onDragStart}
                 onDragEnd={this._onDragEnd}
                 onDragOver={this._onDragOver}
                 onDrop={this._onDrop}>
                <ListWindowTitle {...this.props} />
                <ListWindowActionBar {...this.props} />
            </div>
        );
    }
}

@observer
class ListWindowBody extends React.Component<IListWindowProps, any> {
    render() {
        return (
            <div className={css(this.props.classNames.windowBody, { "content-hidden": this.props.window.contentHidden})}>
                <ProjectedWindowPortal window={this.props.window} className="list-window-portal" listenToPosition={true} />
            </div>
        );
    }
}

@observer
class ListWindow extends React.Component<IListWindowProps, any> {
    render() {
        let s : React.CSSProperties;
        if(!this.props.window.contentHidden) {
            s = { height: this.props.height };
        }
        return (
            <div className={css(this.props.classNames.window, "pane", { "content-hidden": this.props.window.contentHidden })} style={s}>
                <ListWindowHeader {...this.props} />
                <ListWindowBody {...this.props} />
            </div>
        );
    }
}

@observer
class ListAppender extends React.Component<IListProps, any> {
    private _onClick = () => {
        this.props.stack.addNew();
    }
    render() {
        if(this.props.stack.addApp) {
            return (
                <div className={this.props.classNames.appender} onClick={this._onClick}>
                    <Icon iconName="AddTo" />
                </div>
            );
        }
        return null;
    }
}

interface IListWindowsState {
    windowHeight: number;
}

@observer
class ListBody extends React.Component<IListProps, IListWindowsState> {
    private _ref : HTMLElement;
    constructor(props : IListProps) {
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
                return <ListWindow key={w.id} stack={this.props.stack} window={w} height={this.state.windowHeight} />;
            });
            return (
                <div className={this.props.classNames.body}
                    onDragOver={this._onDragOver}
                    onDrop={this._onDrop}
                    ref={this._onRef}>
                    {wins}
                    <ListAppender {...this.props} />
                </div>
            );
        }
        return null;
    }

    componentDidUpdate() {
        this.props.stack.notifyResizeWindows();
    }
}

class List extends React.Component<IListProps, any> {
    private _onScroll = () => {
        this.props.stack.windows.forEach(w => w.emit({ type: "resize" }));
    }
    render() {
        const classNames = this.props.classNames || getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div id={this.props.stack.id} className={classNames.root} onScroll={this._onScroll}>
                <ListBody {...this.props} classNames={classNames} />
            </div>
        );
    }
}

export { IListProps, List }