import { ISearchGroup } from "../ISearchGroup";
import { ISearchFieldModel } from "./ISearchFieldModel";
import { ISearchFieldHostModel } from "./ISearchFieldHostModel";

interface ISearchGroupModel extends ISearchGroup, ISearchFieldHostModel {
    parent : ISearchGroup;
    fields : ISearchFieldModel[];
    groups : ISearchGroupModel[];
    groupData : ISearchGroup[];
    data : ISearchGroup;
    areGroupsSpecified : boolean;
    isSpecified : boolean;
    setData(data : ISearchGroup) : void;
    setOp(op : string) : void;
    addGroup(group?: ISearchGroup) : ISearchGroupModel;
    removeGroup(group : ISearchGroupModel) : void;
    setGroups(groups : ISearchGroup[]) : void;
    removeAllGroups() : void;
    clearGroups() : void;
    clear() : void;
    remove() : void;
}

export { ISearchGroupModel }