import * as React from "react";
import Router from "roota/lib/Router";
import { requiresAuth } from "user/UserAuthHandler";
import { exactPath } from "common/RouterUtils";
import UserGroup from "user/UserGroup";
import {IMECase} from "./IMECase";
const r = new Router();

r.use(requiresAuth(UserGroup.MATCH_EVALUATION));

r.use("/portal", exactPath(req => {
    return import("./component/PegaPortalApplet").then(m => {
        return <m.PegaPortalApplet host={req.app} />;
    });
}));

r.use("/traveller", (req => {
    return import("./component/METravellerApplet").then(m => {
        return <m.METravellerApplet host={req.app} meCase={req.params as IMECase} />;
    });
}));

export { r as default, r as MERouter }