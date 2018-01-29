import { action } from "mobx";
import IIATMovement from "./IIATMovement";
import IIATAlias from "./IIATAlias";
import IListResult from "common/IListResult";
import IActivityFilterProps from "common/IActivityFilterProps";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import IMasterEntitySource from "entity/IMasterEntitySource";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import IIATService from "./IIATService";
import IATServiceContext from "./IATServiceContext";
import ISort from "common/ISortProps";
import * as IATConstants from "./IATConstants";
import * as FilterUtils from "util/Filter";
import * as SortUtils from "util/Sort";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import { getForMasterEntitySource } from "entity/MasterEntitySourceServiceUtils";
import { IATMovementColumns, LocalScheduleDate } from "./component/IATMovementColumns";
import MasterEntitySourceListModel from "entity/MasterEntitySourceListModel";

const movementToFilterRow = (item : IIATMovement) => {
    return ColumnTextHelper.getRowText(item, IATMovementColumns);
}

const movementFilterHandler = (items : IIATMovement[], props : IActivityFilterProps) => {
    return FilterUtils.filter(items, props, movementToFilterRow, LocalScheduleDate);
};

const movementSortHandler = (items : IIATMovement[], sort : ISort) => {
    return SortUtils.sort(items, sort, SortUtils.dateAwareFieldTransformer([LocalScheduleDate]))
};

const getMovementsForKey = (key : string) => {
    return IATServiceContext.value.getIATMovements({ iatTravellerId: key });
};

const getSourceMovements = (source : IMasterEntitySource) : Promise<IListResult<IIATMovement>> => {
    return getForMasterEntitySource(source, getMovementsForKey).then(items => {
        return { items: items };
    });
};

const getSourceMovementList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IIATMovement> => {
    let r : MasterEntitySourceListModel<IIATMovement> = source.state.movementList;
    if(!r) {
        r = new MasterEntitySourceListModel(source, getSourceMovements);
        r.setFilterHandler(movementFilterHandler);
        r.setSortHandler(movementSortHandler);
        r.load();
        source.setState({ movementList: r });
    }
    return r;
});

const getAliasForKey = (key : string) => {
    return IATServiceContext.value.getAliases(key);
};

const getSourceAliases = (source : IMasterEntitySource) : Promise<IListResult<IIATAlias>> => {
    return getForMasterEntitySource(source, getAliasForKey).then(items => {
        return { items: items };
    });
};

const getSourceAliasList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IIATAlias> => {
    let r : MasterEntitySourceListModel<IIATAlias> = source.state.aliasList;
    if(!r) {
        r = new MasterEntitySourceListModel(source, getSourceAliases);
        r.load();
        source.setState({ aliasList: r });
    }
    return r;
});

const movementToOutputText = (movement: IIATMovement) : string => {
    return `${StringUtils.trim(movement.routeId)} ${DateUtils.dataToOutputText(movement.localScheduledDate)} ${movement.directionCode}`
};

const movementToKey = (movement : IIATMovement) : string => {
    return `${StringUtils.trim(movement.routeId)}_${movement.localScheduledDate}_${movement.directionCode}`;
};

export {
    getSourceMovements,
    getSourceMovementList,
    getSourceAliases,
    getSourceAliasList,
    movementToOutputText,
    movementToKey
};