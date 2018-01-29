import * as React from "react";
import Router from "roota/lib/Router";
import { Icon } from "office-ui-fabric-react/lib/Icon";

const r = new Router();
r.use("/DashboardWindowClose", req => {
    return <Icon iconName="ChromeClose" />;
});
r.use("/DashboardContainerClose", req => {
    return <Icon iconName="ChromeClose" />;
});
r.use("/DashboardContainerHSplit", req => {
    return <Icon iconName="Split" />;
});
r.use("/DashboardListView", req => {
    return <Icon iconName="CollapseMenu" />;
});
r.use("/DashboardStackView", req => {
    return <Icon iconName="Redeploy" />;
});
r.use("/:iconName", (req, next) => {
    if(req.path === req.basePath) {
        return <Icon iconName={req.params.iconName} />;
    }
    return next();
});

// icon default handler just returns null
r.defaultHandler = (req) => {
    //return <Icon iconName="Unknown" title={`We couldn't find an icon at ${req.path}`} />;
    return null;
};

export { r as default, r as IconRouter }