import * as React from "react";
import Router from "roota/lib/Router";
import { requiresAuth } from "user/UserAuthHandler";
import { exactPath } from "common/RouterUtils";
import UserGroup from "user/UserGroup";
const r = new Router();

r.use(requiresAuth(UserGroup.RISK_RESUME));

r.use('/application/:permissionRequestId', exactPath(req => {
    return import("./component/ApplicationRiskApplet").then(m => {
        return <m.ApplicationRiskApplet permissionRequestId={req.params.permissionRequestId} host={req.app} />;
    });
}));

r.use('/client/:clientId', exactPath(req => {
    return import("./component/ClientRiskOverviewApplet").then(m => {
        return <m.ClientRiskOverviewApplet clientId={req.params.clientId} host={req.app} />
    });
}));

r.use('/client', exactPath(req => {
    return import("./component/ApplicationClientRiskApplet").then(m => {
        return <m.ApplicationClientRiskApplet clientRiskCheckKey={req.params.clientRiskCheckKey} host={req.app}/>;
    }); 
}));

r.use('/search', exactPath(req => {
    return import("./component/RiskResumeSearchApplet").then(m => {
        return <m.RiskResumeSearchApplet host={req.app} />;
    });
}));

export { r as default, r as VRARouter }