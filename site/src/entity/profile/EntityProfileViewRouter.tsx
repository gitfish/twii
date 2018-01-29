import * as React from "react";
import Router from "roota/lib/Router";

const r = new Router();

const bagsActivityHandler = req => {
    return import("bags/component/EntityProfileBAGS").then(m => {
        return <m.BAGSActivityApplet group={req.params.group} />;
    });
};
r.use("/BAGS/activity", bagsActivityHandler);

const dgmsActivityHandler = req => {
    return import("dgms/component/EntityProfileDGMS").then(m => {
        return <m.DGMSActivityApplet group={req.params.group} />;
    });
};

r.use("/DGMS/activity", dgmsActivityHandler);

const examsActivityHandler = req => {
    return import("exams/component/EntityProfileEXAMS").then(m => {
        return <m.EXAMSActivityApplet group={req.params.group} />;
    });
};

r.use("/EXAM/activity", examsActivityHandler);
r.use("/EXAMS/activity", examsActivityHandler);

const iatMovementHandler = req => {
    return import("iat/component/EntityProfileIAT").then(m => {
        return <m.IATMovementApplet group={req.params.group} />;
    });
}

r.use("/IAT/movement", iatMovementHandler);

const iataAgencyHandler = req => {
    return import("iata/component/EntityProfileIATA").then(m => {
        return <m.IATAAgencyApplet group={req.params.group} />;
    });
}

r.use("/IATA/agency", iataAgencyHandler);

const intcpMovementHandler = req => {
    return import("intcp/component/EntityProfileINTCP").then(m => {
        return <m.INTCPMovementApplet group={req.params.group} />;
    });
};

const intcpOrgSummaryHandler = req => {
    return import("intcp/component/EntityProfileINTCP").then(m => {
        return <m.INTCPOrgSummaryApplet group={req.params.group} />;
    });
};

r.use("/INTCP/movement", intcpMovementHandler);
r.use("/INTCP/org", intcpOrgSummaryHandler);

const airCargoActivityHandler = req => {
    return import("cargo/component/EntityProfileCargo").then(m => {
        return <m.AirCargoActivityApplet group={req.params.group} />;
    });
};

r.use("/ICS/activity/air", airCargoActivityHandler);

const seaCargoActivityHandler = req => {
    return import("cargo/component/EntityProfileCargo").then(m => {
        return <m.SeaCargoActivityApplet group={req.params.group} />;
    });
};

r.use("/ICS/activity/sea", seaCargoActivityHandler);

const erollEntityHandler = req => {
    return import("eroll/component/EntityProfileEROLL").then(m => {
        return <m.EROLLEntityApplet group={req.params.group} />;
    });
};
r.use("/EROLL/entity", erollEntityHandler);

export { r as default, r as EntityProfileViewRouter }