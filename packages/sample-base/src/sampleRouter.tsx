import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { exactPath } from "@twii/router/lib/Routers";

const createSampleRouter = () : Router => {

    const r = new Router();
    
    r.use("/samples/opener", exactPath(req => {
        return import("./component/Opener").then(m => {
            return <m.OpenerApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/dashboard/stack", exactPath(req => {
        return import("./dashboard/component/DashboardSample").then(m => {
            return <m.StackSampleApp host={req.app} />;
        })
    }));
    
    r.use("/samples/dashboard/hsplit", exactPath(req => {
        return import("./dashboard/component/DashboardSample").then(m => {
            return <m.HSplitSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/dashboard/vsplit", exactPath(req => {
        return import("./dashboard/component/DashboardSample").then(m => {
            return <m.VSplitSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/fabric/form", exactPath(req => {
        return import("./fabric/component/Form").then(m => {
            return <m.FormSamplesApp host={req.app} />;
        });
    }));
    
    r.use("/samples/fabric/picker", exactPath(req => {
        return import("./fabric/component/Picker").then(m => {
            return <m.PickerSamplesApp host={req.app} />;
        });
    }));
    
    r.use("/samples/fabric/personform", exactPath(req => {
        return import("./fabric/component/PersonForm").then(m => {
            return <m.PersonFormSamplesApp host={req.app} />;
        });
    }));
    
    r.use("/samples/fabric/sticky", exactPath(req => {
        return import("./fabric/component/Sticky").then(m => {
            return <m.StickySampleApp host={req.app} />;
        });
    }));
    
    r.use("/samples/fabric/navigationview", exactPath(req => {
        return import("./fabric/component/NavigationView").then(m => {
            return <m.NavigationViewSampleApp host={req.app} />;
        });
    }));
    
    r.use("/samples/rmwc/card", exactPath(req => {
        return import("./rmwc/component/CardSample").then(m => {
            return <m.CardSampleApp host={req.app} />;  
        });
    }));
    
    r.use("/samples/rmwc/gridlist", exactPath(req => {
        return import("./rmwc/component/GridListSample").then(m => {
            return <m.GridListSampleApp host={req.app} />;
        });
    }));
    
    r.use("/samples/rmwc/form", exactPath(req => {
        return import("./rmwc/component/FormSample").then(m => {
            return <m.FormSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/rmwc/tabs", exactPath(req => {
        return import("./rmwc/component/TabsSample").then(m => {
            return <m.TabsSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/rmwc/toolbar", exactPath(req => {
        return import("./rmwc/component/ToolbarSample").then(m => {
            return <m.ToolbarSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/alert", exactPath(req => {
        return import("./blueprint/component/AlertSample").then(m => {
            return <m.AlertSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/dialog", exactPath(req => {
        return import("./blueprint/component/DialogSample").then(m => {
            return <m.DialogSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/contextmenu", exactPath(req => {
        return import("./blueprint/component/ContextMenuSample").then(m => {
            return <m.ContextMenuSampleApp host={req.app} />
        });
    }));
    
    r.use("/samples/blueprint/collapse", exactPath(req => {
        return import("./blueprint/component/CollapseSample").then(m => {
            return <m.CollapseSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/navbar", exactPath(req => {
        return import("./blueprint/component/NavbarSample").then(m => {
            return <m.NavbarSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/tabs", exactPath(req => {
        return import("./blueprint/component/TabsSample").then(m => {
            return <m.TabsSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/callout", exactPath(req => {
        return import("./blueprint/component/CalloutSample").then(m => {
            return <m.CalloutSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/collapsibleList", exactPath(req => {
        return import("./blueprint/component/CollapsibleListSample").then(m => {
            return <m.CollapsibleListSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/slider", exactPath(req => {
        return import("./blueprint/component/SliderSample").then(m => {
            return <m.SliderSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/tagInput", exactPath(req => {
        return import("./blueprint/component/TagInputSample").then(m => {
            return <m.TagInputSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/popover", exactPath(req => {
        return import("./blueprint/component/PopoverSample").then(m => {
            return <m.PopoverSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/dateInput", exactPath(req => {
        return import("./blueprint/component/DateInputSample").then(m => {
            return <m.DateInputSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/blueprint/table", exactPath(req => {
        return import("./blueprint/component/TableSample").then(m => {
            return <m.TableSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/antd/layout", exactPath(req => {
        return import("./antd/component/LayoutSample").then(m => {
            return <m.LayoutSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/antd/button", exactPath(req => {
        return import("./antd/component/ButtonSample").then(m => {
            return <m.ButtonSampleApp host={req.app} />; 
        });
    }));
    
    r.use("/samples/phosphor/dockpanel", exactPath(req => {
        return import("./phosphor/component/DockPanelSample").then(m => {
            return <m.DockPanelSampleApp host={req.app} />;
        });
    }));
    
    r.use("/samples/home", exactPath(req => {
        return import("./component/Home").then(m => {
            return <m.Home host={req.app} />;
        });
    }));
    
    return r;
};


export { createSampleRouter }