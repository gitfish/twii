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
    }/*,
    {
        key: "rmwc-samples",
        title: "RMWC Samples",
        items: [
            {
                path: "/samples/rmwc/card",
                title: "Card Sample"
            },
            {
                path: "/samples/rmwc/gridlist",
                title: "Grid List Sample"
            },
            {
                path: "/samples/rmwc/form",
                title: "Form/Input Sample"
            },
            {
                path: "/samples/rmwc/tabs",
                title: "Tabs Sample"
            },
            {
                path: "/samples/rmwc/toolbar",
                title: "Toolbar Sample"
            }
        ]
    },
    {
        key: "blueprint-samples",
        title: "Blueprint Samples",
        items: [
            {
                path: "/samples/blueprint/alert",
                title: "Alert Sample"
            },
            {
                path: "/samples/blueprint/dialog",
                title: "Dialog Sample"
            },
            {
                path: "/samples/blueprint/contextmenu",
                title: "Context Menu Sample"
            },
            {
                path: "/samples/blueprint/collapse",
                title: "Collapse Sample"
            },
            {
                path: "/samples/blueprint/navbar",
                title: "Navbar Sample"
            },
            {
                path: "/samples/blueprint/tabs",
                title: "Tabs Sample"
            },
            {
                path: "/samples/blueprint/callout",
                title: "Callout Sample"
            },
            {
                path: "/samples/blueprint/collapsibleList",
                title: "Collapsible List Sample"
            },
            {
                path: "/samples/blueprint/slider",
                title: "Slider Sample"
            },
            {
                path: "/samples/blueprint/tagInput",
                title: "Tag Input Sample"
            },
            {
                path: "/samples/blueprint/popover",
                title: "Popover Sample"
            },
            {
                path: "/samples/blueprint/dateInput",
                title: "Date Input Sample"
            },
            {
                path: "/samples/blueprint/table",
                title: "Table Sample"
            }
        ]
    },
    {
        key: "antd-samples",
        title: "Ant Design of React Samples",
        items: [
            {
                path: "/samples/antd/layout",
                title: "Layout Sample"
            },
            {
                path: "/samples/antd/button",
                title: "Button Sample"
            }
        ]
    }
    */
];

export { samples }