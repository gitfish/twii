import { action } from "mobx";
import IMasterEntitySource from "entity/IMasterEntitySource";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import { INTCPMovementColumns, AtPortDate, DepartureDate} from "./component/INTCPMovementColumns";
import * as INTCPConstants from "./INTCPConstants";
import * as FilterUtils from "util/Filter";
import * as SortUtils from "util/Sort";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import ISort from "common/ISortProps";
import IActivityFilterProps from "common/IActivityFilterProps";
import IActivityListModel from "common/IActivityListModel";
import IINTCPMovement from "./IINTCPMovement";
import IINTCPOrgSummaryItem from "./IINTCPOrgSummaryItem";
import MasterEntitySourceListModel from "entity/MasterEntitySourceListModel";
import { getForMasterEntitySource } from "entity/MasterEntitySourceServiceUtils";
import INTCPServiceContext from "./INTCPServiceContext";

const getMovementsForKey = (key : string) => {
    return INTCPServiceContext.value.getINTCPMovements(key);
};

const getSourceMovements = (source : IMasterEntitySource) => {
    return getForMasterEntitySource(source, getMovementsForKey).then(items => {
        return { items: items };  
    });
};

const getOrgSummaryForKey = (key : string) => {
    return INTCPServiceContext.value.getOrganisationINTCPSummary(key);
};

const getSourceOrgSummary = (source : IMasterEntitySource) => {
    return getForMasterEntitySource(source, getOrgSummaryForKey).then(items => {
        return { items: items };  
    });
};

const movementToFilterRow = (item : IINTCPMovement) => {
    return ColumnTextHelper.getRowText(item, INTCPMovementColumns);
};

const movementFilterHandler = (items : IINTCPMovement[], props : IActivityFilterProps) => {
    return FilterUtils.filter(items, props, movementToFilterRow, AtPortDate);
};

const movementSortHander = (items : IINTCPMovement[], sort : ISort) => {
    const dateColumns = [
        AtPortDate,
        DepartureDate
    ];
    return SortUtils.sort(items, sort, SortUtils.dateAwareFieldTransformer(dateColumns));
};

const getSourceMovementList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IINTCPMovement> => {
    let r : MasterEntitySourceListModel<IINTCPMovement> = source.state.movementList;
    if(!r) {
        r = new MasterEntitySourceListModel(source, getSourceMovements);
        r.setFilterHandler(movementFilterHandler);
        r.setSortHandler(movementSortHander);
        r.load();
        source.setState({ movementList: r });
    }
    return r;  
});

const getSourceOrgSummaryList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IINTCPOrgSummaryItem> => {
    let r : MasterEntitySourceListModel<IINTCPOrgSummaryItem> = source.state.orgSummaryList;
    if(!r) {
        r = new MasterEntitySourceListModel(source, getSourceOrgSummary);
        r.load();
        source.setState({ orgSummaryList: r });
    }
    return r;
});

export { getSourceMovementList, getSourceOrgSummaryList }