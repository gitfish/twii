import Context from "common/Context";
import IIATAService from "./IIATAService";
import RestIATAService from "./RestIATAService";

const IATAServiceContext = new Context<IIATAService>({
    value: new RestIATAService()
});

export { IATAServiceContext as default, IATAServiceContext };