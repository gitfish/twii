import * as React from "react";
import Router from "roota/lib/Router";

const r = new Router();
r.defaultHandler = req => {
    console.warn(`No Document Handler available for ${req.path}`);
};

const bagsActivityHandler = req => {
    return import("bags/component/EntityProfileBAGS").then(m => {
        return m.BAGSActivityDocumentHandler(req.params);
    });
};
r.use("/BAGS/activity", bagsActivityHandler);

const dgmsActivityHandler = req => {
    return import("dgms/component/EntityProfileDGMS").then(m => {
       return m.DGMSActivityDocumentHandler(req.params);
    });
};

r.use("/DGMS/activity", dgmsActivityHandler);

const examsActivityHandler = req => {
    return import("exams/component/EntityProfileEXAMS").then(m => {
        return m.EXAMSActivityDocumentHandler(req.params);
    });
};

r.use("/EXAM/activity", examsActivityHandler);
r.use("/EXAMS/activity", examsActivityHandler);


const iatMovementHandler = req => {
    return import("iat/component/EntityProfileIAT").then(m => {
        return m.IATMovementDocumentHandler(req.params);
    });
}

r.use("/IAT/movement", iatMovementHandler);

const iataAgencyHandler = req => {
    return import("iata/component/EntityProfileIATA").then(m => {
        return m.IATAAgencyDocumentHandler(req.params);
    });
}

r.use("/IATA/agency", iataAgencyHandler);

const intcpMovementHandler = req => {
    return import("intcp/component/EntityProfileINTCP").then(m => {
        return m.INTCPMovementDocumentHandler(req.params);
    });
};

const intcpOrgSummaryHandler = req => {
    return import("intcp/component/EntityProfileINTCP").then(m => {
        return m.INTCPOrgSummaryDocumentHandler(req.params);
    });
};

r.use("/INTCP/movement", intcpMovementHandler);
r.use("/INTCP/org", intcpOrgSummaryHandler);

const airCargoActivityHandler = req => {
    return import("cargo/component/EntityProfileCargo").then(m => {
        return m.AirCargoActivityDocumentHandler(req.params);
    });
};

r.use("/ICS/activity/air", airCargoActivityHandler);

const seaCargoActivityHandler = req => {
    return import("cargo/component/EntityProfileCargo").then(m => {
        return m.SeaCargoActivityDocumentHandler(req.params);
    });
};

r.use("/ICS/activity/sea", seaCargoActivityHandler);

const erollEntityHandler = req => {
    return import("eroll/component/EntityProfileEROLL").then(m => {
        return m.EROLLEntityDocumentHandler(req.params);
    });
};
r.use("/EROLL/entity", erollEntityHandler);

export { r as default, r as EntityProfileDocumentRouter }