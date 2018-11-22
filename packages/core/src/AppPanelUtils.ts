import { IAppHost } from "./IAppHost";
import { IMutableSupplier } from "./IMutableSupplier";
import { IRequest } from "@twii/router/lib/IRequest";
import { Supplier } from "./model/Supplier";

const getRequestSupplier = (host : IAppHost) : IMutableSupplier<IRequest> => {
    return host.getState("panelAppRequestSupplier", () => {
        return new Supplier<IRequest>();
    });
};

export { getRequestSupplier }