import { IMasterEntity } from "../IMasterEntity";

interface IGetMasterEntityByIdRequest {
    masterEntityId?: string;
}

interface IMasterEntityService {
    getMasterEntityById(request : IGetMasterEntityByIdRequest) : Promise<IMasterEntity>;
}

export { IGetMasterEntityByIdRequest, IMasterEntityService };