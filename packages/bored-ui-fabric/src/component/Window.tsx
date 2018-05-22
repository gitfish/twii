import * as React from "react";
import { observer } from "mobx-react";
import { IWindow } from "@twii/bored/lib/model/IWindow";
import { IWindowStyles, getStyles } from "./Window.styles";
import { IWindowClassNames, getClassNames } from "./Window.classNames";
import { css } from "@uifabric/utilities";
import { Icon } from "office-ui-fabric-react/lib/Icon";

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
class Window extends React.Component<IWindowProps, any> {
    private _classNames : IWindowClassNames;
    private _canDrag : boolean = false;
    private _onHeaderMouseDown = (e : React.MouseEvent<HTMLElement>) => {
        this._canDrag = true;
    }
    private _onMouseUp = (e : React.MouseEvent<HTMLElement>) => {
        this._canDrag = false;
    }
    private _onDragStart = (e : React.DragEvent<HTMLElement>) => {
        const db = this.props.window.dashboard;
        if(db && this._canDrag) {
            e.stopPropagation();
            const transferText = String(JSON.stringify(this.props.window.config));
            e.dataTransfer.setData("text", transferText);
            window.setTimeout(() => {
                db.setDrag(this.props.window);
            }, 1);
        } else {
            e.preventDefault();
        }
    }
    private _onDragEnd = (e : React.DragEvent<HTMLElement>) => {
        this._canDrag = false;
        const db = this.props.window.dashboard;
        if(db) {
            db.clearDrag();
        }
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        /*
        const db = this.props.grid.dashboard;
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
        */
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        /*
        e.stopPropagation();
        e.preventDefault();
        this._canDrag = false;
        this.props.grid.dropWindow(this.props.window);
        */
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
                <WindowCloseAction {...this.props} className={css(this._classNames.action, "close-action")} />
            </div>
        );
    }
    private _renderHeader() : React.ReactNode {
        if(this.props.window.settings.headerHeight > 0) {
            return (
                <div className={this._classNames.header}
                    onMouseDown={this._onHeaderMouseDown}
                    style={{
                        top: 0,
                        right: 0,
                        left: 0,
                        height: this.props.window.settings.headerHeight
                    }}>
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
                {this.props.children}
            </div>
        );
    }
    render() {
        const { window, styles, className } = this.props;
        this._classNames = getClassNames(getStyles(null, styles), className);
        return (
            <div className={this._classNames.root}
                style={{
                    borderWidth: window.settings.borderWidth
                }}
                onDragStart={this._onDragStart}
                onDragEnd={this._onDragEnd}
                onDragOver={this._onDragOver}
                onDrop={this._onDrop}
                draggable={true}>
                {this._renderHeader()}
                {this._renderBody()}
            </div>
        );
    }
}

export { IWindowProps, Window }