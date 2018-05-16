import * as React from "react";
import { observer } from "mobx-react";
import { IWindow } from "@twii/bored/lib/model/IWindow";
import { IWindowStyles, getStyles } from "./Window.styles";
import { IWindowClassNames, getClassNames } from "./Window.classNames";
import { css } from "@uifabric/utilities";
import { IconButton } from "office-ui-fabric-react/lib/Button";

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
            return <IconButton className={this.props.className}
                               title={`Close ${this.props.window.title || "App"}`}
                               iconProps={{ iconName: "ChromeClose" }}
                               onMouseDown={this._onMouseDown}
                               onClick={this._onClick} />
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
        /*
        const db = this.props.grid.dashboard;
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
        */
    }
    private _onDragEnd = (e : React.DragEvent<HTMLElement>) => {
        /*
        this._canDrag = false;
        const db = this.props.grid.dashboard;
        if(db) {
            db.clearDrag();
        }
        */
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
        return (
            <div className={this._classNames.header}
                draggable={true}
                onMouseDown={this._onHeaderMouseDown}>
                {this._renderTitle()}
                {this._renderActionBar()}
            </div>
        );
    }
    private _renderBody() : React.ReactNode {
        return (
            <div className={css(this._classNames.body, { "content-hidden": this.props.window.contentHidden})}>
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={this._classNames.root}
                onDragStart={this._onDragStart}
                onDragEnd={this._onDragEnd}
                onDragOver={this._onDragOver}
                onDrop={this._onDrop}>
                {this._renderHeader()}
                {this._renderBody()}
            </div>
        );
    }
}