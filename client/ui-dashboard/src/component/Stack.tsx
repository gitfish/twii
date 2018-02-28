import * as React from "react";
import * as ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { IStack } from "../IStack";
import { IWindow } from "../IWindow";
import { removeComponent } from "../ComponentActions";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { setSingleChild } from "../DOMHelper";
import { getStyles, IStackStyles } from "./Stack.styles";
import { getClassNames, IStackClassNames } from "./Stack.classNames";
import { ProjectedWindowPortal } from "./WindowPortal";

interface IStackProps {
    stack: IStack;
    className?: string;
    styles?: IStackStyles;
    classNames?: IStackClassNames;
}

@observer
class StackCloseAction extends React.Component<IStackProps, any> {
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
            return (
                <button type="button"
                        className={css(this.props.classNames.action, "close-action")}
                        title="Close all Widgets"
                        onClick={this._onClick}>
                    <Icon className={this.props.classNames.closeActionIcon} iconName="ChromeClose" />
                </button>
            );
        }
        return null;
    }
}

@observer
class StackActionBar extends React.Component<IStackProps, any> {
    render() {
        return (
            <div className={this.props.classNames.actionBar} style={{ position: "absolute", top: 0, right: 0, bottom: 0 }}>
                <StackCloseAction {...this.props} />
            </div>
        )
    }
}

interface IStackWindowProps extends IStackProps {
    window: IWindow;
    first?: boolean;
}

@observer
class StackTabTitle extends React.Component<IStackWindowProps, any> {
    render() {
        return (
            <div className={this.props.classNames.tabTitleContainer}>
                <div className={this.props.classNames.tabTitle}>
                    {this.props.window.title}
                </div>
            </div>
        );
    }
}

@observer
class StackTabCloseAction extends React.Component<IStackWindowProps, any> {
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
                <button type="button" className={css(this.props.classNames.tabAction, "close-action")}
                               title={`Close ${this.props.window.title || "Widget"}`}
                               onMouseDown={this._onMouseDown}
                               onClick={this._onClick}>
                    <Icon className="stack-tab-action-icon" iconName="ChromeClose" />
                </button>
            );
        }
        return null;
    }
}

class StackTabActionBar extends React.Component<IStackWindowProps, any> {
    render() {
        return (
            <div className={this.props.classNames.tabActionBar}>
                <StackTabCloseAction {...this.props} />
            </div>
        );
    }
}

@observer
class StackTab extends React.Component<IStackWindowProps, any> {
    private _ref : HTMLElement;
    private _dragOverStart : number;
    private _onClick = () => {
        this.props.stack.setActive(this.props.window);
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
        delete this._dragOverStart;
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
        } else {
            if(!this.props.window.active) {
                if(!this._dragOverStart) {
                    this._dragOverStart = new Date().getTime();
                } else {
                    const diff = new Date().getTime() - this._dragOverStart;
                    if(diff >= 600) {
                        this.props.window.activate();
                        delete this._dragOverStart;
                    }
                }
            }
        }
    }

    private _onDragLeave = (e : React.DragEvent<HTMLElement>) => {
        if(e.relatedTarget !== this._ref && !this._ref.contains(e.relatedTarget as HTMLElement)) {
            delete this._dragOverStart;
        }
    }

    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        delete this._dragOverStart;
        e.stopPropagation();
        e.preventDefault();
        this.props.stack.dropWindow(this.props.window);
    }

    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
    }
    render() {
        return (
            <div className={css(this.props.classNames.tab, { active: this.props.window.active, first: this.props.first })}
                 role="tab"
                 id={`${this.props.window.id}-tab`}
                 aria-controls={`${this.props.window.id}-tab-panel`}
                 title={this.props.window.title}
                 ref={this._onRef}
                 onClick={this._onClick}
                 draggable={true}
                 onDragStart={this._onDragStart}
                 onDragEnd={this._onDragEnd}
                 onDragOver={this._onDragOver}
                 onDrop={this._onDrop}
                 onDragLeave={this._onDragLeave}>
                <StackTabTitle {...this.props} />
                <StackTabActionBar {...this.props} />
            </div>
        );
    }
}

@observer
class StackTabPanel extends React.Component<IStackWindowProps, any> {
    render() {
        const active = this.props.window.active;
        let style : React.CSSProperties = {
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden"
        };
        if(active) {
            style.right = 0;
            style.bottom = 0;
        } else {
            style.width = 0;
            style.height = 0;
        }
        return (
            <div className={css(this.props.classNames.tabPanel, { active: active })}
                 style={style}
                 role="tabpanel"
                 id={`${this.props.window.id}-tab-panel`}>
                 <ProjectedWindowPortal window={this.props.window} className="stack-window-portal" />
            </div>
        );
    }
}

@observer
class StackAddAction extends React.Component<IStackProps, any> {
    private _onClick = () => {
        this.props.stack.addNew();
    }
    render() {
        if(this.props.stack.addApplet) {
            return (
                <button type="button"
                        title="Add Widget"
                        className={this.props.classNames.addAction}
                        onClick={this._onClick}>
                    <Icon className="stack-add-action-icon" iconName="Add" />
                </button>
            );
        }
        return null;
    }
}

@observer
class StackTabBar extends React.Component<IStackProps, any> {
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const stack = this.props.stack;
        const db = stack.dashboard;
        const drag = db ? db.drag : undefined;
        if(drag && (drag.parent !== stack || (stack.windowCount > 1 && drag !== stack.last))) {
            e.stopPropagation();
            e.preventDefault();
            try {
                e.dataTransfer.dropEffect = "move";
            } catch(ex) {}
        }
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.stack.dropWindow();
    }
    render() {
        const tabs = this.props.stack.windows.map((w, idx) => {
            return <StackTab key={w.id} stack={this.props.stack} window={w} classNames={this.props.classNames} first={idx === 0} />;
        });
        return (
            <div className={this.props.classNames.tabBar} onDragOver={this._onDragOver} onDrop={this._onDrop}>
                {tabs}
                <StackAddAction {...this.props} />
            </div>
        );
    }
}

class StackHeader extends React.Component<IStackProps, any> {
    render() {
        return (
            <div className={this.props.classNames.header}>
                <StackTabBar {...this.props} />
                <StackActionBar {...this.props} />
            </div>
        );
    }
}

const uselessDropHandler = () => {};

interface IStackDragOverlayState {
    feedbackStyle: React.CSSProperties
}

@observer
class StackDragOverlay extends React.Component<IStackProps, IStackDragOverlayState> {
    private _overlayRef : HTMLElement;
    private _feedbackRef : HTMLElement;

    constructor(props : IStackProps) {
        super(props);
        this.state = {
            feedbackStyle: {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            }
        };
    }

    private _onDragLeave = (e : React.DragEvent<HTMLElement>) => {
        this._dropHandler = uselessDropHandler;
        this.setState({
            feedbackStyle: {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            }
        });
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        this._dropHandler();
        this.props.stack.dashboard.clearDrag();
    }
    private _dropHandler = uselessDropHandler;
    private _dropLeft = () => {
        this.props.stack.splitLeft(this.props.stack.dashboard.drag);
    }
    private _setDropZoneLeft() {
        const ob = this._overlayRef.getBoundingClientRect();
        const width = Math.floor(ob.width / 2);
        this._dropHandler = this._dropLeft;
        this.setState({
            feedbackStyle: {
                top: 0,
                right: ob.width - width,
                left: 0,
                bottom: 0,
                width: width,
                height: ob.height
            }
        });
    }
    private _dropRight = () => {
        this.props.stack.splitRight(this.props.stack.dashboard.drag);
    }
    private _setDropZoneRight() {
        const ob = this._overlayRef.getBoundingClientRect();
        const width = Math.floor(ob.width / 2);
        this._dropHandler = this._dropRight;
        this.setState({
            feedbackStyle: {
                top: 0,
                right: 0,
                bottom: 0,
                left: ob.width - width,
                width: width,
                height: ob.height
            }
        });
    }
    private _dropTop = () => {
        this.props.stack.splitTop(this.props.stack.dashboard.drag);
    }
    private _setDropZoneTop() {
        const ob = this._overlayRef.getBoundingClientRect();
        const height = Math.floor(ob.height / 2);
        this._dropHandler = this._dropTop;
        this.setState({
            feedbackStyle: {
                top: 0,
                right: 0,
                bottom: ob.height - height,
                left: 0,
                width: ob.width,
                height: height
            }
        });
    }
    private _dropBottom = () => {
        this.props.stack.splitBottom(this.props.stack.dashboard.drag);
    }
    private _setDropZoneBottom() {
        const ob = this._overlayRef.getBoundingClientRect();
        const height = Math.floor(ob.height / 2);
        this._dropHandler = this._dropBottom;
        this.setState({
            feedbackStyle: {
                top: ob.height - height,
                bottom: 0,
                left: 0,
                right: 0,
                width: ob.width,
                height: height
            }
        });
    }
    private _dropAdd = () => {
        this.props.stack.add(this.props.stack.dashboard.drag as IWindow);
    }
    private _setDropZoneAdd() {
        this._dropHandler = this._dropAdd;
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const stack = this.props.stack;
        const db = stack.dashboard;
        const drag = db ? db.drag : undefined;
        if(drag) {
            e.stopPropagation();
            if((drag.parent !== stack && stack.windowCount > 0) || stack.windowCount > 1) {
                e.preventDefault();
                const bounds = this._overlayRef.getBoundingClientRect();
                const leftRightZoneWidth = Math.floor(bounds.width / 6);
                const topBottomZoneHeight = Math.floor(bounds.height / 2);
                const width = bounds.width;
                if(e.clientX >= bounds.left && e.clientX <= bounds.left + leftRightZoneWidth) {
                    this._setDropZoneLeft();
                } else if(e.clientX >= bounds.left + bounds.width - leftRightZoneWidth && e.clientX <= bounds.left + bounds.width) {
                    this._setDropZoneRight();
                } else if(e.clientY >= bounds.top && e.clientY <= bounds.top + topBottomZoneHeight) {
                    this._setDropZoneTop();
                } else {
                    this._setDropZoneBottom();
                }
            } else if(stack.windowCount === 0) {
                e.preventDefault();
                this._setDropZoneAdd();
            }
        }
    }
    private _onOverlayRef = (ref : HTMLElement) => {
        this._overlayRef = ref;
    }
    private _onFeedbackRef = (ref : HTMLElement) => {
        this._feedbackRef = ref;
        }
        render() {
        if(this.props.stack.dashboard && this.props.stack.dashboard.drag) {
            return [
                <div key="feedback"
                     className={this.props.classNames.dragOverlayFeedback} ref={this._onFeedbackRef}
                     style={Object.assign({}, this.state.feedbackStyle, { position: "absolute", zIndex: 2 })}>
                </div>,
                <div key="overlay"
                     className={this.props.classNames.dragOverlay}
                     onDragOver={this._onDragOver}
                     onDrop={this._onDrop}
                     onDragLeave={this._onDragLeave}
                     ref={this._onOverlayRef}
                     style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 3 }}>   
                </div>
            ];
        }
        return null;
    }
}

@observer
class StackBody extends React.Component<IStackProps, any> {
    render() {
        const panels = this.props.stack.windows.map(w => {
            return <StackTabPanel key={w.id} stack={this.props.stack} window={w} classNames={this.props.classNames} />;
        });
        return (
            <div className={this.props.classNames.body}>
                <StackDragOverlay {...this.props} />
                {panels}
            </div>
        );
    }
}

class Stack extends React.Component<IStackProps, any> {
    render() {
        let classNames = this.props.classNames || getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div id={this.props.stack.id} className={classNames.root}>
                <StackHeader {...this.props} classNames={classNames} />
                <StackBody {...this.props} classNames={classNames} />
            </div>
        );
    }
}

export { IStackProps, Stack }