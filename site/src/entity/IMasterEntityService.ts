import IMasterEntity from "./IMasterEntity";

/**
 * Yep, this is confusing, but this is the higher level / convenience service (an implementation, for example, might make use of the data service)
 */
interface IMasterEntityService {
    getMasterEntityById(masterEntityId?: string) : Promise<IMasterEntity>;
}

export { IMasterEntityService as default, IMasterEntityService };