import * as React from "react";
import { IDashboardLayout } from "./IDashboardLayout";
import * as GridLayout from "../model/GridLayout";
import { IDashboard } from "../model/IDashboard";
import { IGrid } from "../model/IGrid";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { GridCellSizeSlider } from "./GridSettings";
import { GridCellMarginSlider } from "./GridSettings";

const onRenderGridCellSize = (item : IContextualMenuItem) => {
    const grid = item.grid as IGrid;
    return <GridCellSizeSlider key={item.key} grid={grid} />;
};

const onRenderGridCellMargin = (item : IContextualMenuItem) => {
    const grid = item.grid as IGrid;
    return <GridCellMarginSlider key={item.key} grid={grid} />;
};

const GridDashboardLayout : IDashboardLayout = {
    key: "grid",
    name: "Grid (BETA)",
    title: "Grid (BETA) - NOTE: this is still a work in progress",
    iconProps: { iconName: "GridViewMedium"},
    applyLayout: GridLayout.applyLayout,
    isLayoutApplied: GridLayout.isLayoutApplied,
    createActions(dashboard : IDashboard) {
        const items : IContextualMenuItem[] = [];
        const grid = dashboard.component as IGrid;
        // this is the grid settings icon
        items.push(
            {
                key: "settings",
                iconProps: {
                    iconName: "Equalizer"
                },
                subMenuProps: {
                    shouldFocusOnContainer: true,
                    items: [
                        {
                            key: "gridCellSizeHeader",
                            itemType: ContextualMenuItemType.Header,
                            name: "Cell Size"
                        },
                        {
                            key: "gridCellSize",
                            name: "Cell Size",
                            grid: grid,
                            onRender: onRenderGridCellSize
                        },
                        {
                            key: "gridCellMarginHeader",
                            itemType: ContextualMenuItemType.Header,
                            name: "Cell Margin"
                        },
                        {
                            key: "gridCellMargin",
                            name: "Cell Margin",
                            grid: grid,
                            onRender: onRenderGridCellMargin
                        }
                    ]
                }
            }
        );
        if(grid.addApp) {
            items.push(
                {
                    key: "add",
                    name: "Add",
                    iconProps: {
                        iconName: "Add"
                    },
                    onClick() {
                        grid.addNew();
                    }
                }
            );
        }
        return items;
    }
};

export { GridDashboardLayout }