import IApplicationClient from "./IApplicationClient";

interface IApplicationClientDetailsService {
    getApplicationClientDetails(permissionRequestId : string) : Promise<IApplicationClient[]>;
}

export { IApplicationClientDetailsService as default, IApplicationClientDetailsService };