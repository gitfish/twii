import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { IWindow } from "../model/IWindow";
import { IGridStyles, getStyles } from "./Grid.styles";
import { IGridClassNames, getClassNames } from "./Grid.classNames";
import * as GridLayout from "react-grid-layout";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { css } from "@uifabric/utilities";
import { ProjectedWindowPortal } from "./WindowPortal";
import { IGrid } from "../model/IGrid";
import { ThemeSettingName } from "@uifabric/styling";

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

class GridWindowHeader extends React.Component<IGridWindowProps, any> {
    private _onMouseDown = () => {
        
    }
    private _onClick = () => {
        
    }
    private _onDragStart = (e : React.DragEvent<HTMLElement>) => {
        const db = this.props.grid.dashboard;
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
        this.props.grid.dropWindow(this.props.window);
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
                <GridWindowTitle {...this.props} />
                <GridWindowActionBar {...this.props} />
            </div>
        );
    }
}

@observer
class GridWindowBody extends React.Component<IGridWindowProps, any> {
    render() {
        return (
            <div className={css(this.props.classNames.windowBody, { "content-hidden": this.props.window.contentHidden})}>
                <ProjectedWindowPortal window={this.props.window} className="list-window-portal" listenToPosition={true} />
            </div>
        );
    }
}

@observer
class GridWindow extends React.Component<IGridWindowProps, any> {
    render() {
        return (
            <div className={css(this.props.classNames.window, "pane", { "content-hidden": this.props.window.contentHidden })}>
                <GridWindowHeader {...this.props} />
                <GridWindowBody {...this.props} />
            </div>
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
    private _onResize = () => {
        if(this._ref) {
            const b = this._ref.getBoundingClientRect();
            this.props.grid.setDimensions(b.width, b.height);
        }
    }
    private _onLayout = () => {
        if(this._ref) {
            const b = this._ref.getBoundingClientRect();
            this.props.grid.layout(b.width, b.height);
        }
    }
    componentDidMount() {
        this._onLayout();
        this.props.grid.addEventListener("resize", this._onResize)
    }
    private _renderGridCell = (window : IWindow) => {
        const l = window.layout ? window.layout.grid : { x: 0, y: 0, width: 0, height: 0 };
        console.log("-- Layout: " + JSON.stringify(l));
        const cellTop = l.y * this.props.grid.cellHeight;
        const cellLeft = l.x * this.props.grid.cellWidth;
        const cellWidth = l.width * this.props.grid.cellWidth;
        const cellHeight = l.height * this.props.grid.cellHeight;
        return (
            <div key={window.id} className={this._classNames.cell} style={{ top: cellTop, left: cellLeft, width: cellWidth, height: cellHeight }}>
                <GridWindow grid={this.props.grid} window={window} classNames={this._classNames} />
            </div>
        );
    }
    private _onRootScroll = () => {
        this.props.grid.emit({ type: "resize" });
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
    componentDidUpdate() {
        this.props.grid.emit({ type: "resize" });
    }
}

export { IGridProps, Grid }