import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import ViewType from "../ViewType";


interface IViewTypeInfoEntry {
    viewType: ViewType;
    key: string;
    name: string;
    iconProps: IIconProps;
};

interface IViewTypeInfo {
    entries: IViewTypeInfoEntry[];
    byViewType(viewType : ViewType) : IViewTypeInfoEntry;
}

const entries : IViewTypeInfoEntry[] = [
    {
        viewType: ViewType.Detail,
        key: "detail",
        name: "Detail",
        iconProps: { iconName: "GroupedList" }
    },
    {
        viewType: ViewType.List,
        key: "list",
        name: "List",
        iconProps: { iconName: "CustomList" }
    },
    {
        viewType: ViewType.Tiles,
        key: "tiles",
        name: "Tiles",
        iconProps: { iconName: "Tiles"}
    }
];

const ViewTypeInfo : IViewTypeInfo = {
    entries: entries,
    byViewType(viewType : ViewType) : IViewTypeInfoEntry {
        return entries.find((e) => {
            return e.viewType === viewType;
        });
    }
};

export { ViewTypeInfo as default, ViewTypeInfo, IViewTypeInfo, IViewTypeInfoEntry };