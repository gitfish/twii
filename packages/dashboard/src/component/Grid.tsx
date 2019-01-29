import * as React from "react";
import { observer } from "mobx-react";
import { IGridStyles, getStyles } from "./Grid.styles";
import { IGridClassNames, getClassNames } from "./Grid.classNames";
import { css } from "@uifabric/utilities";
import { IGrid } from "../model/IGrid";

interface IGridProps {
    grid: IGrid;
    className?: string;
    styles?: IGridStyles;
    moveTimeout?: number;
}

const Defaults = {
    moveTimeout: 200
};

const getRowIndex = (grid : IGrid, vy : number) : number => {
    if(vy < 0) {
        return 0;
    }
    const y = vy - grid.y;
    return Math.floor(y / (grid.cellSize + grid.cellMargin));
};

const getColIndex = (grid : IGrid, vx : number) : number => {
    if(vx < 0) {
        return 0;
    }
    const x = vx - grid.x;
    return Math.floor(x / (grid.cellSize + grid.cellMargin));
};

@observer
class GridCells extends React.Component<IGridProps, any> {
    private _classNames : IGridClassNames;
    private _renderCell(row : number, column : number) : React.ReactNode {
        return (
            <div key={column}
                 className={this._classNames.cell}
                 role="gridcell"
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
            <div role="row" className={this._classNames.row} key={row} style={{ marginTop: this.props.grid.cellMargin }}>
                {cells}
            </div>
        );
    }
    render() {
        const { grid, styles, className } = this.props;
        this._classNames = getClassNames(getStyles(null, styles), className); 
        const rows = [];
        for(let r = 0; r < grid.rows; r ++) {
            rows.push(this._renderRow(r));
        }
        return (
            <div className={this._classNames.gridCells}>
                {rows}
            </div>
        );
    }
}


@observer
class GridDragOverlay extends React.Component<IGridProps, any> {
    private _ref : HTMLDivElement;
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    get moveTimeout() {
        return this.props.moveTimeout >= 0 ? this.props.moveTimeout : Defaults.moveTimeout;
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const { grid } = this.props;
        e.stopPropagation();
        e.preventDefault();
        try {
            e.dataTransfer.dropEffect = "move";
        } catch(ex) {}
        const drag = grid.drag;
        const rootBounds = this._ref.getBoundingClientRect();
        let vx = e.clientX - rootBounds.left;
        let vy = e.clientY - rootBounds.top;
        const dx = drag.dragState.offsetX || 0;
        const dy = drag.dragState.offsetY || 0;
        vx -= dx;
        vy -= dy;
        const colIndex = getColIndex(grid, vx);
        const rowIndex = getRowIndex(grid, vy);
        // delayed move to deal with row index changing
        // TODO: move this to a utility
        const current = new Date().getTime();
        const init = drag.dragState.init;
        if(!init) {
            drag.setDragState({
                init: current,
                colIndex: colIndex,
                rowIndex: rowIndex
            });
        } else {
            if(current - init > this.moveTimeout) {
                if(colIndex === drag.dragState.colIndex && rowIndex === drag.dragState.rowIndex) {
                    grid.moveTo(colIndex, rowIndex);
                } else {
                    drag.setDragState({
                        init: current,
                        colIndex: colIndex,
                        rowIndex: rowIndex
                    });
                }
            }
            
        }
    }
    private _onDrop = (e : React.DragEvent<HTMLElement>) => {
        const { grid } = this.props;
        const drag = grid.drag;
        e.stopPropagation();
        e.preventDefault();
        const rootBounds = this._ref.getBoundingClientRect();
        let vx = e.clientX - rootBounds.left;
        let vy = e.clientY - rootBounds.top;
        const dx = drag.dragState.offsetX || 0;
        const dy = drag.dragState.offsetY || 0;
        vx -= dx;
        vy -= dy;
        const colIndex = getColIndex(grid, vx);
        const rowIndex = getRowIndex(grid, vy);
        grid.moveTo(colIndex, rowIndex);
    }
    render() {
        const { grid, styles, className } = this.props;
        if(grid.drag) {
            const classNames = getClassNames(getStyles(null, styles), className);
            return (
                <div className={css(classNames.overlay, "drag")}
                    onDragOver={this._onDragOver}
                    onDrop={this._onDrop}
                    ref={this._onRef}>
                </div>
            );
        }
        return null;
    }
}

@observer
class GridResizeOverlay extends React.Component<IGridProps, any> {
    private _ref : HTMLDivElement;
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    private _onDragOver = (e : React.DragEvent<HTMLElement>) => {
        const { grid } = this.props;
        const rootBounds = this._ref.getBoundingClientRect();
        let vx = e.clientX - rootBounds.left;
        let vy = e.clientY - rootBounds.top;
        const colIndex = getColIndex(grid, vx);
        const rowIndex = getRowIndex(grid, vy);
        this.props.grid.resizeTo(colIndex, rowIndex);
    }
    private _onDrop = (e : React.MouseEvent<HTMLElement>) => {
        this.props.grid.resizeEnd();
    }
    render() {
        if(this.props.grid.resizing) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={css(classNames.overlay, "resize", this.props.grid.resizeType)}
                    onDragOver={this._onDragOver}
                    onDrop={this._onDrop}
                    ref={this._onRef}>
                </div>
            );
        }
        return null;
    }
}

@observer
class Grid extends React.Component<IGridProps, any> {
    render() {
        const { grid, styles, className } = this.props;
        const classNames = getClassNames(getStyles(null, styles), className);
        return (
            <div className={classNames.root}
                 role="grid"
                 style={{
                     position: "relative",
                     width: grid.maximized ? 0 : grid.gridWidth,
                     height: grid.maximized ? 0 : grid.gridHeight,
                     overflow: grid.maximized ? "hidden" : undefined 
                 }}>
                <GridCells {...this.props} />
                <GridDragOverlay {...this.props} />
                <GridResizeOverlay {...this.props} />
            </div>
        );
    }
}

export { IGridProps, Grid, Defaults }