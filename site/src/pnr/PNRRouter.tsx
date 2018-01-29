import * as React from "react";
import Router from "roota/lib/Router";
import UserGroup from "user/UserGroup";
import { exactPath } from "common/RouterUtils";
import { requiresAuth } from "user/UserAuthHandler";

const r = new Router();
//r.use(requiresAuth(UserGroup.PNR_SEARCH));
r.use(requiresAuth(UserGroup.RISK_RESUME)); //To do: Change back to PNR_SEARCH as this is workaround only.
r.use("/search/results", exactPath(req => {
    return import("./component/PNRSearchResultsApplet").then(m => {
        return <m.PNRSearchResultsApplet host={req.app} />;
    });
}));
r.use("/ticketpayment", exactPath(req => {
    return import("./component/PNRTicketPaymentApplet").then(m => {
        return <m.PNRTicketPaymentApplet host={req.app} />;
    });
}));
r.use("/ticketing", exactPath(req => {
    return import("./component/PNRTicketingApplet").then(m => {
        return <m.PNRTicketingApplet host={req.app} />;
    });
}));
r.use("/tests", exactPath(req => {
    return import("./component/PNRTestsApplet").then(m => {
        return <m.PNRTestsApplet host={req.app} />;
    });
}));
r.use("/search", exactPath(req => {
    return import("./component/PNRSearchApplet").then(m => {
        return <m.PNRSearchApplet host={req.app} />
    });
}));

export { r as default, r as PNRRouter }