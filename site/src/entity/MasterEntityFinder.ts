import { action } from "mobx";
import ISyncHandle from "common/ISyncHandle";
import SyncHandleModel from "common/SyncHandleModel";
import IMasterEntity from "./IMasterEntity";
import IMasterEntityModel from "./IMasterEntityModel";
import MasterEntityModel from "./MasterEntityModel";
import MasterEntityServiceContext from "./MasterEntityServiceContext";
import { TimedCache } from "common/TimedCache";

const handleLife = 2 * 60 * 1000;

const handleCache = new TimedCache<SyncHandleModel<IMasterEntityModel>>(handleLife);

const _entityLoaded = action((handle : SyncHandleModel<IMasterEntityModel>, data : IMasterEntity) => {
    handle.setValue(new MasterEntityModel(data));
    handle.sync.syncEnd();
});

const _entityLoadError = action((handle : SyncHandleModel<IMasterEntityModel>, error : any) => {
    handle.clearValue();
    handle.sync.syncError(error);
});

// NOTE - we need to make use of a more generic caching mechanism for this kind of stuff

const findByEntityId = action((entityId : string) : ISyncHandle<IMasterEntityModel> => {
    let handle : SyncHandleModel<IMasterEntityModel> = handleCache.get(entityId);
    if(!handle || handle.sync.error) {
        handle = new SyncHandleModel<IMasterEntityModel>();
        handle.sync.syncStart({ id: entityId });
        MasterEntityServiceContext.value.getMasterEntityById(entityId).then(data => {
            _entityLoaded(handle, data);
        }).catch(error => {
            _entityLoadError(handle, error);
        });
    }
    handleCache.put(entityId, handle);

    return handle;
});

export { findByEntityId }