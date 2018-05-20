import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { IWindow } from "@twii/bored/lib/model/IWindow";
import { IGridStyles, getStyles } from "./Grid.styles";
import { IGridClassNames, getClassNames } from "./Grid.classNames";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { css } from "@uifabric/utilities";
import { IGrid } from "@twii/bored/lib/model/IGrid";
import { ThemeSettingName } from "@uifabric/styling";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Window } from "./Window";

interface IGridProps {
    grid: IGrid;
    className?: string;
    styles?: IGridStyles;
}

interface IGridWindowProps {
    window: IWindow;
    className?: string;
}

@observer
class GridWindow extends React.Component<IGridWindowProps, any> {
    render() {
        const w = this.props.window;
        return (
            <div className={this.props.className} style={{ position: "absolute", backgroundColor: "white", overflow: "hidden", left: w.rx, top: w.ry, width: w.width, height: w.height }}>
            </div>
        );
    }
}

@observer
class Grid extends React.Component<IGridProps, any> {
    private _classNames : IGridClassNames;
    private _rootRef : HTMLDivElement;
    private _rowContainerRef : HTMLDivElement;
    private _onRootScroll = () => {
        const { grid } = this.props;
        grid.position(0 - this._rootRef.scrollLeft, 0 - this._rootRef.scrollTop);
    }
    private _onRootRef = (ref : HTMLDivElement) => {
        this._rootRef = ref;
    }
    private _onRowContainerRef = (ref : HTMLDivElement) => {
        this._rowContainerRef = ref;
    }
    private _renderCell(row : number, column : number) : React.ReactNode {
        return (
            <div key={column}
                 className={this._classNames.cell}
                 style={{
                     minWidth: this.props.grid.cellSize,
                     width: this.props.grid.cellSize,
                     minHeight: this.props.grid.cellSize,
                     height: this.props.grid.cellSize,
                     marginLeft: this.props.grid.cellMargin
                 }}>
            </div>
        )
    }
    private _renderRow(row : number) : React.ReactNode {
        const cells = [];
        for(let i = 0; i < this.props.grid.columns; i ++) {
            cells.push(this._renderCell(row, i));
        }
        return (
            <div className={this._classNames.row} key={row} style={{ marginTop: this.props.grid.cellMargin }}>
                {cells}
            </div>
        );
    }
    private _renderWindow(w : IWindow) : React.ReactNode {
        return <GridWindow key={w.id} window={w} />;
    }
    render() {
        const { grid, styles } = this.props;
        this._classNames = getClassNames(getStyles(null, styles));
        const rows = [];
        for(let r = 0; r < grid.rows; r ++) {
            rows.push(this._renderRow(r));
        }
        const windows = grid.windows.map(w => {
            return this._renderWindow(w);
        });
        return (
            <div className={this._classNames.root} ref={this._onRootRef} onScroll={this._onRootScroll}>
                <div className={this._classNames.rowContainer} ref={this._onRowContainerRef}>
                    {rows}
                </div>
                {windows}
            </div>
        );
    }
}

export { IGridProps, Grid }