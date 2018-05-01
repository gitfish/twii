import { ISample } from "./ISample";

const samples : ISample[] = [
    {
        key: "common",
        //path: "/samples/common",
        title: "Common Samples",
        items: [
            {
                key: "opener",
                title: "Opener",
                path: "/samples/common/opener",
                moduleLoader: () => import("./component/Opener")
            }   
        ]
    },
    {
        key: "dashboard",
        //path: "/samples/dashboard",
        title: "Dashboard Samples",
        items: [
            {
                key: "dashboardStack",
                path: "/samples/dashboard/stack",
                title: "Dashboard Stack Sample",
                moduleLoader: () => import("./dashboard/component/DashboardSample"),
                moduleComponent: "StackSample"
            },
            {
                key: "dashboardHSplit",
                path: "/samples/dashboard/hsplit",
                title: "Dashboard HSplit Sample",
                moduleLoader: () => import("./dashboard/component/DashboardSample"),
                moduleComponent: "HSplitSample"
            },
            {
                key: "dashboardVSplit",
                path: "/samples/dashboard/vsplit",
                title: "Dashboard VSplit Sample",
                moduleLoader: () => import("./dashboard/component/DashboardSample"),
                moduleComponent: "VSplitSample"
            }
        ]
    },
    {
        key: "fabric",
        title: "Fabric Samples",
        items: [
            {
                key: "fabricTextField",
                path: "/samples/fabric/textfield",
                title: "Fabric Text Field Samples",
                moduleLoader: () => import("@twii/fabric-ui-samples/lib/component/TextField")
            },
            {
                key: "fabricPicker",
                path: "/samples/fabric/picker",
                title: "Fabric Picker Samples",
                moduleLoader: () => import("@twii/fabric-ui-samples/lib/component/Picker")
            },
            {
                key: "fabricPersonForm",
                path: "/samples/fabric/personform",
                title: "Fabric Person Form (Bound Fields)",
                moduleLoader: () => import("@twii/fabric-ui-samples/lib/component/PersonForm")
            },
            {
                key: "fabricNavigationView",
                path: "/samples/fabric/navigationview",
                title: "Fabric Navigation View Sample",
                moduleLoader: () => import("@twii/fabric-ui-samples/lib/component/NavigationView")
            }
        ]
    },
    {
        key: "rmwc-samples",
        title: "RMWC Samples",
        items: [
            {
                key: "rmwcCard",
                path: "/samples/rmwc/card",
                title: "Card Sample",
                moduleLoader: () => import("@twii/rmwc-samples/lib/component/CardSamples")
            },
            {
                key: "rmwcGridList",
                path: "/samples/rmwc/gridlist",
                title: "Grid List Sample",
                moduleLoader: () => import("@twii/rmwc-samples/lib/component/GridListSample")
            },
            {
                key: "rmwcForm",
                path: "/samples/rmwc/form",
                title: "Form/Input Sample",
                moduleLoader: () => import("@twii/rmwc-samples/lib/component/FormSamples")
            },
            {
                key: "rmwcTabs",
                path: "/samples/rmwc/tabs",
                title: "Tabs Sample",
                moduleLoader: () => import("@twii/rmwc-samples/lib/component/TabsSample")
            },
            {
                key: "rwmcToolbar",
                path: "/samples/rmwc/toolbar",
                title: "Toolbar Sample",
                moduleLoader: () => import("@twii/rmwc-samples/lib/component/ToolbarSample")
            }
        ]
    },
    {
        key: "blueprint-samples",
        title: "Blueprint Samples",
        items: [
            {
                key: "blueprintAlert",
                path: "/samples/blueprint/alert",
                title: "Blueprint Alert Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/AlertSamples")
            },
            {
                key: "blueprintDialog",
                path: "/samples/blueprint/dialog",
                title: "Blueprint Dialog Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/DialogSamples")
            },
            {
                key: "blueprintContextMenu",
                path: "/samples/blueprint/contextmenu",
                title: "Blueprint Context Menu Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/ContextMenuSamples")
            },
            {
                key: "blueprintCollapse",
                path: "/samples/blueprint/collapse",
                title: "Blueprint Collapse Menu Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/CollapseSamples")
            },
            {
                key: "blueprintNavbar",
                path: "/samples/blueprint/navbar",
                title: "Blueprint Navbar Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/NavbarSamples")
            },
            {
                key: "blueprintTabs",
                path: "/samples/blueprint/tabs",
                title: "Blueprint Tabs Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/TabsSamples")
            },
            {
                key: "blueprintCallout",
                path: "/samples/blueprint/callout",
                title: "Blueprint Callout Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/CalloutSamples")
            },
            {
                key: "blueprintSlider",
                path: "/samples/blueprint/slider",
                title: "Blueprint Slider Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/SliderSamples")
            },
            {
                key: "blueprintTagInput",
                path: "/samples/blueprint/tagInput",
                title: "Blueprint Tag Input Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/TagInputSamples")
            },
            {
                key: "blueprintPopover",
                path: "/samples/blueprint/popover",
                title: "Popover Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/PopoverSamples")
            },
            {
                key: "blueprintDateInput",
                path: "/samples/blueprint/dateInput",
                title: "Date Input Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/DateInputSamples")
            },
            {
                key: "blueprintTable",
                path: "/samples/blueprint/table",
                title: "Table Sample",
                moduleLoader: () => import("@twii/blueprint-samples/lib/component/TableSamples")
            }
        ]
    },
    {
        key: "antd-samples",
        title: "Ant Design Samples",
        items: [
            {
                key: "antdLayout",
                path: "/samples/antd/layout",
                title: "Antd Layout Sample",
                moduleLoader: () => import("@twii/antd-samples/lib/component/LayoutSample")
            },
            {
                key: "antdButton",
                path: "/samples/antd/button",
                title: "Antd Button Sample",
                moduleLoader: () => import("@twii/antd-samples/lib/component/ButtonSample")
            }
        ]
    },
    {
        key: "atlaskit-samples",
        title: "AtlasKit Samples",
        items: [
            {
                key: "atlasKitAvatar",
                path: "/samples/atlaskit/avatar",
                title: "AtlasKit Avatar Sample",
                moduleLoader: () => import("@twii/atlaskit-samples/lib/component/AvatarSamples")
            },
            {
                key: "atlasKitBadge",
                path: "/samples/atlaskit/badge",
                title: "AtlasKit Badge Sample",
                moduleLoader: () => import("@twii/atlaskit-samples/lib/component/BadgeSamples")
            }
        ]
    }
];

export { samples }