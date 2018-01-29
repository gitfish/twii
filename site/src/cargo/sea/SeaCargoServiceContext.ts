import Context from "common/Context";
import ISeaCargoService from "./ISeaCargoService";
import RestSeaCargoService from "./RestSeaCargoService";

const SeaCargoServiceContext = new Context<ISeaCargoService>({
    value: new RestSeaCargoService()
});

export { SeaCargoServiceContext as default, SeaCargoServiceContext };