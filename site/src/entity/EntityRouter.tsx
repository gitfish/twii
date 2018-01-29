import * as React from "react";
import Router from "roota/lib/Router";
import { requiresAuth } from "user/UserAuthHandler";
import { exactPath } from "common/RouterUtils";
import UserGroup from "user/UserGroup";
const r = new Router();

r.use(requiresAuth(UserGroup.ENTITY_SEARCH));

r.use("/search/result", exactPath((req) => {
    return import("./component/EntitySearchResultApplet").then(m => {
        return <m.EntitySearchResultApplet host={req.app} />;
    });
}));

r.use("/search", exactPath((req) => {
    return import("./component/EntitySearchApplet").then(m => {
        return <m.EntitySearchApplet host={req.app} />;
    });
}));

r.use("/profile", exactPath(req => {
    return import("./profile/component/EntityProfileApplet").then(m => {
        return <m.EntityProfileApplet host={req.app} />;
    });
}));

r.use("/:entityId/summary", exactPath(req => {
    return import("./component/EntitySummaryApplet").then(m => {
        return <m.EntitySummaryApplet host={req.app} entityId={req.params.entityId} />; 
    });
}));

const abrHandler = exactPath(req => {
    return import("abr/component/EntityABRApplet").then(m => {
        return <m.EntityABRApplet entityId={req.params.entityId} host={req.app} />;
    });
});

r.use("/:entityId/sources/abr", abrHandler);
r.use("/:entityId/sources/ABR", abrHandler);

const asicHandler = exactPath(req => {
    return import("asic/component/EntityASICApplet").then(m => {
        return <m.EntityASICApplet entityId={req.params.entityId} host={req.app} />;
    });
});

r.use("/:entityId/sources/asic", asicHandler);
r.use("/:entityId/sources/ASIC", asicHandler);

const bagsHandler = exactPath(req => {
    return import("bags/component/EntityBAGSApplet").then(m => {
        return <m.EntityBAGSApplet entityId={req.params.entityId} host={req.app} />;
    });
});

r.use("/:entityId/sources/bags", bagsHandler);
r.use("/:entityId/sources/BAGS", bagsHandler);

const cargoHandler = exactPath(req => {
    return import("cargo/component/EntityCargoApplet").then(m => {
        return <m.EntityCargoApplet entityId={req.params.entityId} host={req.app} />;
    });
});

const airCargoHandler = exactPath(req => {
    return import("cargo/air/component/EntityAirCargoApplet").then(m => {
        return <m.EntityAirCargoApplet entityId={req.params.entityId} host={req.app} />;
    });
});

const seaCargoHandler = exactPath(req => {
    return import("cargo/sea/component/EntitySeaCargoApplet").then(m => {
        return <m.EntitySeaCargoApplet entityId={req.params.entityId} host={req.app} />;
    });
});

r.use("/:entityId/sources/cargo", cargoHandler);
r.use("/:entityId/sources/cargo/air", airCargoHandler);
r.use("/:entityId/sources/cargo/sea", seaCargoHandler);
r.use("/:entityId/sources/CARGO", cargoHandler);
r.use("/:entityId/sources/CARGO/air", airCargoHandler);
r.use("/:entityId/sources/CARGO/sea", seaCargoHandler);
r.use("/:entityId/sources/ics", cargoHandler);
r.use("/:entityId/sources/ics/air", airCargoHandler);
r.use("/:entityId/sources/ics/sea", seaCargoHandler);
r.use("/:entityId/sources/ICS", cargoHandler);
r.use("/:entityId/sources/ICS/air", airCargoHandler);
r.use("/:entityId/sources/ICS/sea", seaCargoHandler);

const dgmsHandler = exactPath(req => {
    return import("dgms/component/EntityDGMSApplet").then(m => {
        return <m.EntityDGMSApplet entityId={req.params.entityId} host={req.app}  />;
    });
});

r.use("/:entityId/sources/dgms", dgmsHandler);
r.use("/:entityId/sources/DGMS", dgmsHandler);

const erollHandler = exactPath(req => {
    return import("eroll/component/EntityEROLLApplet").then(m => {
        return <m.EntityEROLLApplet entityId={req.params.entityId} host={req.app} />;
    });
});

r.use("/:entityId/sources/eroll", erollHandler);
r.use("/:entityId/sources/EROLL", erollHandler);

const examsHandler = (req, next) => {
    if(req.basePath === req.path) {
        return import("exams/component/EntityEXAMSApplet").then(m => {
            return <m.EntityEXAMSApplet entityId={req.params.entityId} host={req.app} />;
        });
    }
    return next();
};

r.use("/:entityId/sources/exams", examsHandler);
r.use("/:entityId/sources/EXAMS", examsHandler);
r.use("/:entityId/sources/exam", examsHandler);
r.use("/:entityId/sources/EXAM", examsHandler);

const iatHandler = exactPath(req => {
    return import("iat/component/EntityIATApplet").then(m => {
        return <m.EntityIATApplet entityId={req.params.entityId} onSearch={req.params.onSearch} host={req.app} />;
    });
});

r.use("/:entityId/sources.iat", iatHandler);
r.use("/:entityId/sources/IAT", iatHandler);

const iatMovementListHandler = exactPath(req => {
    return import("iat/component/IATMovementListApplet").then(m => {
        return <m.IATMovementListApplet entityId={req.params.entityId} onSearch={req.params.onSearch} host={req.app} />;
    });
});

const iatMovementMapHandler = exactPath(req => {
    return import("iat/component/IATMovementMapApplet").then(m => {
        return <m.IATMovementMapApplet entityId={req.params.entityId} onSearch={req.params.onSearch} host={req.app} />;
    });
});

r.use("/:entityId/sources/iat/movements/list", iatMovementListHandler);
r.use("/:entityId/sources/iat/movements/map", iatMovementMapHandler);

const iataHandler = exactPath(req => {
    return import("iata/component/EntityIATAApplet").then(m => {
        return <m.EntityIATAApplet entityId={req.params.entityId} host={req.app} />;
    });
});

r.use("/:entityId/sources/iata", iataHandler);
r.use("/:entityId/sources/IATA", iataHandler);

const intcpHandler = exactPath(req => {
    return import("intcp/component/EntityINTCPApplet").then(m => {
        return <m.EntityINTCPApplet entityId={req.params.entityId} host={req.app} />;
    });
});

r.use("/:entityId/sources/intcp", intcpHandler);
r.use("/:entityId/sources/INTCP", intcpHandler);

r.use("/:entityId/sources", exactPath(req => {
    return import("./component/EntitySourcesApplet").then(m => {
        return <m.EntitySourcesApplet entityId={req.params.entityId} host={req.app} onSearch={req.params.onSearch} />;
    });
}));

r.use("/:entityId", exactPath(req => {
    return import("./component/EntityDetailsApplet").then(m => {
        return <m.EntityDetailsApplet entityId={req.params.entityId} host={req.app} />;
    });
}));

export { r as default, r as EntityRouter }