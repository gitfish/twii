import { IAppHost } from "@twii/core/lib/IAppHost";
import { IMutableSupplier } from "@twii/core/lib/IMutableSupplier";
import { IRequest } from "@twii/router/lib/IRequest";
import { Supplier } from "@twii/core/lib/Supplier";

const getRequestSupplier = (host : IAppHost, key : string = "panelAppRequestSupplier") : IMutableSupplier<IRequest> => {
    return host.getState("key", () => {
        return new Supplier<IRequest>();
    });
};

export { getRequestSupplier }