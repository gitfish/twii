import IClientRiskCheck from "./IClientRiskCheck";

interface IClientRiskCheckService {
    getClientRiskChecks(clientId : string) : Promise<IClientRiskCheck[]>;
}

export { IClientRiskCheckService as default, IClientRiskCheckService };