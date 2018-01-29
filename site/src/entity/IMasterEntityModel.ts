import IEntityModel from "./IEntityModel";
import IMasterEntity from "./IMasterEntity";
import IMasterEntitySourceModel from "./IMasterEntitySourceModel";
import IActivityFilterModel from "common/IActivityFilterModel";

interface IMasterEntityModel extends IEntityModel {
    masterEntityId: string;
    data: IMasterEntity;
    sources: IMasterEntitySourceModel[];
    sourceMap: { [key : string] : IMasterEntitySourceModel };
    sourceCodes: string[];
    activityFilter: IActivityFilterModel;
}

export { IMasterEntityModel as default, IMasterEntityModel };