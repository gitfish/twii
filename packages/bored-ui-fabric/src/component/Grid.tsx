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

@observer
class Grid extends React.Component<IGridProps, any> {
    private _classNames : IGridClassNames;
    private _rootRef : HTMLDivElement;
    private _onRootScroll = () => {
        // TODO
    }
    private _onRootRef = (ref : HTMLDivElement) => {
        this._rootRef = ref;
    }
    private _renderCell(row : number, column : number) : React.ReactNode {
        return (
            <div key={column}
                 className={this._classNames.cell}
                 style={{
                     minWidth: this.props.grid.cellWidth,
                     width: this.props.grid.cellWidth,
                     minHeight: this.props.grid.cellHeight,
                     height: this.props.grid.cellHeight }}>
                 <div className={this._classNames.cellContent}></div>
            </div>
        )
    }
    private _renderRow(row : number) : React.ReactNode {
        const cells = [];
        for(let i = 0; i < this.props.grid.columns; i ++) {
            cells.push(this._renderCell(row, i));
        }
        return (
            <div className={this._classNames.row} key={row}>
                {cells}
            </div>
        );
    }
    render() {
        const { grid, styles } = this.props;
        this._classNames = getClassNames(getStyles(null, styles));
        const rows = [];
        for(let r = 0; r < grid.rows; r ++) {
            rows.push(this._renderRow(r));
        }
        return (
            <div className={this._classNames.root} ref={this._onRootRef} onScroll={this._onRootScroll}>
                <div className={this._classNames.rowContainer}>
                    {rows}
                </div>
            </div>
        );
    }
}

export { IGridProps, Grid }