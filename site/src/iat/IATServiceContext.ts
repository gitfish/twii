import Context from "common/Context";
import IIATService from "./IIATService";
import RestIATService from "./RestIATService";

const IATServiceContext = new Context<IIATService>({
    value: new RestIATService()
});

export { IATServiceContext as default, IATServiceContext };