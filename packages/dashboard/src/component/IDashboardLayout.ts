import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { IDashboard } from "../model/IDashboard";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

interface IDashboardLayout {
    key: string;
    name: string;
    title?: string;
    iconProps?: IIconProps;
    applyLayout: (dashboard : IDashboard) => Promise<any> | any;
    isLayoutApplied: (dashboard : IDashboard) => boolean;
    createActions?: (dashboard : IDashboard) => IContextualMenuItem[];
}

export { IDashboardLayout }