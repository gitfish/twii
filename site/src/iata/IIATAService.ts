import IIATAAgency from "./IIATAAgency";
import IIATAAgencyDetail from "./IIATAAgencyDetail";

interface IIATAService {
    getIATAAgencies(iataTravelAgencyId: string) : Promise<IIATAAgency[]>;
    getIATAAgencyDetails(iataTravelAgencyId: string) : Promise<IIATAAgencyDetail[]>;
}

export { IIATAService as default, IIATAService };