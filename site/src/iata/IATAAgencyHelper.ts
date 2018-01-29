import { action } from "mobx";
import IMasterEntitySource from "entity/IMasterEntitySource";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import * as IATAConstants from "./IATAConstants";
import * as FilterUtils from "util/Filter";
import * as SortUtils from "util/Sort";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import IListResult from "common/IListResult";
import ISort from "common/ISortProps";
import IActivityFilterProps from "common/IActivityFilterProps";
import IActivityListModel from "common/IActivityListModel";
import IIATAAgency from "./IIATAAgency";
import MasterEntitySourceListModel from "entity/MasterEntitySourceListModel";
import { getForMasterEntitySource } from "entity/MasterEntitySourceServiceUtils";
import IATAServiceContext from "./IATAServiceContext";
import { IATAAgencyColumns } from "./component/IATAAgencyColumns";

const getAgencies = (iataTravelAgencyId : string) => {
    return IATAServiceContext.value.getIATAAgencies(iataTravelAgencyId);
}

const agencyToFilterRow = (item : IIATAAgency) => {
    return ColumnTextHelper.getRowText(item, IATAAgencyColumns);
};

const agencyFilterHandler = (items : IIATAAgency[], props : IActivityFilterProps) => {
    return FilterUtils.filter(items, props, agencyToFilterRow);
};

const agencySortHandler = (items : IIATAAgency[], sort : ISort) => {
    return SortUtils.sort(items, sort);
};

const getSourceAgencies = (source : IMasterEntitySource) : Promise<IListResult<IIATAAgency>> => {
    return getForMasterEntitySource(source, getAgencies).then(items => {
        return { items: items };  
    });
};

const getSourceAgencyList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IIATAAgency> => {
    let r : MasterEntitySourceListModel<IIATAAgency> = source.state.agencyList;
    if(!r) {
        r = new MasterEntitySourceListModel(source, getSourceAgencies);
        r.setFilterHandler(agencyFilterHandler);
        r.setSortHandler(agencySortHandler);
        r.load();
        source.setState({ agencyList: r });
    }
    return r;
});

export { getSourceAgencyList, getSourceAgencies }