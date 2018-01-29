import Context from "common/Context";
import IEntityPhotosService from "./IEntityPhotosService";
import RestEntityPhotosService from "./RestEntityPhotosService";

const EntityPhotosServiceContext = new Context<IEntityPhotosService>({
    value: new RestEntityPhotosService()
});

export { EntityPhotosServiceContext as default, EntityPhotosServiceContext };