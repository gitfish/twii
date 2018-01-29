import { action } from "mobx";
import IListModel from "common/IListModel";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySource from "entity/IMasterEntitySource";

type GetBySourceRelatedKeyValue<T> = (sourceRelatedKeyValue: string) => Promise<T[]>;

const getForMasterEntitySource = <T>(masterEntitySource : IMasterEntitySource,
                                     loader: GetBySourceRelatedKeyValue<T>) : Promise<T[]> => {
    let r: T[] = [];
    return Promise.all(masterEntitySource.sourceEntities.map(entity => {
        if(entity.ref && entity.ref.sourceRelatedKeyValue) {
            return loader(entity.ref.sourceRelatedKeyValue).then((items) => {
                r = r.concat(items);
            });
        }
        return Promise.resolve();
    })).then(() => {
        return Promise.resolve(r);
    });
};

const getForMasterEntity = <T>(masterEntity : IMasterEntityModel,
                               sourceSystemCode: string,
                               loader: GetBySourceRelatedKeyValue<T>) : Promise<T[]> => {
    const source = masterEntity.sourceMap[sourceSystemCode];
    return source ? getForMasterEntitySource(source, loader) : Promise.resolve([]);
};

const loadForMasterEntity = action(<T>(list: IListModel<T>,
                                       masterEntity: IMasterEntityModel,
                                       sourceSystemCode: string,
                                       loader: GetBySourceRelatedKeyValue<T>) : Promise<any> => {
    const syncId = masterEntity.masterEntityId;
    if(syncId !== list.sync.id) {
        list.sync.syncStart({ id: syncId });
        return getForMasterEntity<T>(masterEntity, sourceSystemCode, loader).then((items) => {
            if(syncId === list.sync.id) {
                list.setItems(items);
                list.sync.syncEnd();
            }
        }).catch((error) => {
            if(syncId === list.sync.id) {
                list.sync.syncError(error);
            }
        });
    }
    return Promise.resolve();
});

export {
    loadForMasterEntity,
    getForMasterEntitySource,
    getForMasterEntity
};
