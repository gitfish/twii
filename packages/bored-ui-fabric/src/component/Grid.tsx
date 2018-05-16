import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { IWindow } from "@twii/bored/lib/model/IWindow";
import { IGridStyles, getStyles } from "./Grid.styles";
import { IGridClassNames, getClassNames } from "./Grid.classNames";
import * as GridLayout from "react-grid-layout";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { css } from "@uifabric/utilities";
import { IGrid } from "@twii/bored/lib/model/IGrid";
import { ThemeSettingName } from "@uifabric/styling";
import { Icon } from "office-ui-fabric-react/lib/Icon";

interface IGridProps {
    grid: IGrid;
    className?: string;
    styles?: IGridStyles;
}

interface IGridWindowProps extends IGridProps {
    window: IWindow;
    classNames?: IGridClassNames;
}

@observer
class GridWindowTitle extends React.Component<IGridWindowProps, any> {
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
class GridWindowCloseAction extends React.Component<IGridWindowProps, any> {
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
                               title={`Close ${this.props.window.title || "App"}`}
                               iconProps={{ iconName: "ChromeClose" }}
                               onMouseDown={this._onMouseDown}
                               onClick={this._onClick} />
        }
        return null;
    }
}


class GridWindowActionBar extends React.Component<IGridWindowProps, any> {
    render() {
        return (
            <div className={this.props.classNames.windowActionBar}>
                <GridWindowCloseAction {...this.props} />
            </div>
        );
    }
}

@observer
class GridWindow extends React.Component<IGridWindowProps, any> {
    private _canDrag : boolean = false;
    private _onHeaderMouseDown = (e : React.MouseEvent<HTMLElement>) => {
        this._canDrag = true;
    }
    private _onMouseUp = (e : React.MouseEvent<HTMLElement>) => {
        this._canDrag = false;
    }
    private _onDragStart = (e : React.DragEvent<HTMLElement>) => {
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
    }
    private _onDragEnd = (e : React.DragEvent<HTMLElement>) => {
        this._canDrag = false;
        const db = this.props.grid.dashboard;
        if(db) {
            db.clearDrag();
        }
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
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
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        this._canDrag = false;
        this.props.grid.dropWindow(this.props.window);
    }
    private _renderHeader() : React.ReactNode {
        return (
            <div className={this.props.classNames.windowHeader}
                draggable={true}
                onMouseDown={this._onHeaderMouseDown}>
                <GridWindowTitle {...this.props} />
                <GridWindowActionBar {...this.props} />
            </div>
        );
    }
    private _renderBody() : React.ReactNode {
        return (
            <div className={css(this.props.classNames.windowBody, { "content-hidden": this.props.window.contentHidden})}>
                {/*<ProjectedWindowPortal window={this.props.window} className="list-window-portal" listenToPosition={true} />*/}
            </div>
        );
    }
    render() {
        return (
            <div className={css(this.props.classNames.window)}
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

class GridAddAction extends React.Component<IGridProps, any> {
    private _onClick = () => {
        this.props.grid.addNew();
    }
    render() {
        return (
            <button type="button" style={{ padding: 8 }} onClick={this._onClick}>
                <Icon iconName="Add" />
            </button>
        );
    }
}

@observer
class Grid extends React.Component<IGridProps, any> {
    private _classNames : IGridClassNames;
    private _ref : HTMLDivElement;
    constructor(props : IGridProps) {
        super(props);
        this.state = { cellWidth: 0, cellHeight: 0 }
    }
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    private _renderGridCell = (window : IWindow) => {
        const l = window.layout ? window.layout.grid : { height: 0 };
        const top = l.offset;
        const left = l.col * this.props.grid.cellWidth;
        const width = this.props.grid.cellWidth;
        const height = l.height;
        return (
            <div key={window.id} className={this._classNames.cell} style={{ top: top, left: left, width: width, height: height }}>
                <GridWindow grid={this.props.grid} window={window} classNames={this._classNames} />
            </div>
        );
    }
    private _onRootScroll = () => {
        // TODO
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles));
        const cells = this.props.grid.width > 0 && this.props.grid.height > 0 ? this.props.grid.windows.map(this._renderGridCell) : undefined;
        return (
            <div className={this._classNames.root} ref={this._onRef} onScroll={this._onRootScroll}>
                {cells}
            </div>
        );
    }
}

export { IGridProps, Grid }