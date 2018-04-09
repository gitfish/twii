import * as React from "react";
import { Router } from "@twii/router/lib/Router";
import { exactPath } from "@twii/router/lib/Routers";

const createSampleRouter = () : Router => {

    const r = new Router();
    
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
    
    r.use("/samples/home", exactPath(req => {
        return import("./component/Home").then(m => {
            return <m.Home host={req.app} />;
        });
    }));
    
    return r;
};


export { createSampleRouter }