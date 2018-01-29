import { action } from "mobx";
import IMasterEntitySource from "entity/IMasterEntitySource";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import * as FilterUtils from "util/Filter";
import * as SortUtils from "util/Sort";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import IListResult from "common/IListResult";
import ISort from "common/ISortProps";
import IActivityFilterProps from "common/IActivityFilterProps";
import MasterEntitySourceListModel from "entity/MasterEntitySourceListModel";
import { EROLLEntityColumns, DataLoadDate } from "./component/EROLLEntityColumns";
import IEROLLEntity from "./IEROLLEntity";

const erollEntityToFilterRow = (item: IEROLLEntity) => {
    return ColumnTextHelper.getRowText(item, EROLLEntityColumns);
};

const erollFilterHandler = (items: IEROLLEntity[], props: IActivityFilterProps) => {
    return FilterUtils.filter(items, props, erollEntityToFilterRow);
};

const erollFieldTransformer = function(item: any, field: string): any {
    if (item) {
        const f = EROLLEntityColumns.find(column => column.fieldName == field);
        if (f && f.data) {
            if (f.data.getData) {
                return f.data.getData(item);
            } else if (f.data.getText) {
                return f.data.getText(item);
            }
        }
        return item[field];
    }
};

const erollSortHandler = (items: IEROLLEntity[], sort : ISort) => {
    return SortUtils.sort(items, sort, erollFieldTransformer);
};

const getEROLLEntity = (itemMap: { [key: string] : IEROLLEntity },
                        items: IEROLLEntity[],
                        sourceEntityId: string,
                        effectiveStartDt: string) => {
    const key = `${sourceEntityId}:${effectiveStartDt}`;
    let entity = itemMap[key];
    if(!entity) {
        entity = {
            sourceEntityId: sourceEntityId,
            effectiveStartDt: effectiveStartDt,
            names: [],
            addresses: []
        };
        itemMap[key] = entity;
        items.push(entity);
    }
    return entity;
};

const getEROLLEntities = (source : IMasterEntitySource) : Promise<IListResult<IEROLLEntity>> => {
    return new Promise((resolve) => {
        const itemMap : { [key: string] : IEROLLEntity } = {};
        const items : IEROLLEntity[] = [];
        source.sourceEntities.forEach((sourceEntity) => {
            if (sourceEntity.meta) {
                const e = getEROLLEntity(itemMap, items, sourceEntity.sourceEntityId, sourceEntity.meta.effectiveStartDt);
                e.meta = sourceEntity.meta;
            }
            sourceEntity.names.forEach((name) => {
                const e = getEROLLEntity(itemMap, items, sourceEntity.sourceEntityId, name.effectiveStartDt);
                e.names.push(name);
            });
            sourceEntity.addresses.forEach((address) => {
                const e = getEROLLEntity(itemMap, items, sourceEntity.sourceEntityId, address.effectiveStartDt);
                e.addresses.push(address);
            });
        });
        SortUtils.sort(items, { field: DataLoadDate.fieldName, descending: true }, erollFieldTransformer);
        const result = { items: items };
        resolve(result);
    });
};

const getEROLLEntityList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IEROLLEntity> => {
    let r : MasterEntitySourceListModel<IEROLLEntity> = source.state.entityList;
    if(!r) {
        r = new MasterEntitySourceListModel(source, getEROLLEntities);
        r.setFilterHandler(erollFilterHandler);
        r.setSortHandler(erollSortHandler);
        r.load();
        source.setState({ entityList: r });
    }
    return r;
});

export { getEROLLEntityList }