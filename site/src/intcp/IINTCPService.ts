import IINTCPMovement from "./IINTCPMovement";
import IINTCPOrgSummaryItem from "./IINTCPOrgSummaryItem";

interface IINTCPService {
    getINTCPMovements(subjectId: string) : Promise<IINTCPMovement[]>;
    getOrganisationINTCPSummary(subjectId: string) : Promise<IINTCPOrgSummaryItem[]>;
}

export { IINTCPService as default, IINTCPService };