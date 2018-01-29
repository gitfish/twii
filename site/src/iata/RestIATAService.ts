import axios from "axios";
import { IIATAService } from "./IIATAService";
import IIATAAgency from "./IIATAAgency";
import IIATAAgencyDetail from "./IIATAAgencyDetail";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

interface GetAgencyRestResponse {
    errors?: any;
    getIATASummaryInformationResponse?: IIATAAgency[];
}

interface GetAgencyDetailRestResponse {
    errors?: any;
    getIATADetailInformationResponse?: IIATAAgencyDetail[];
}

class RestIATAService extends AbstractRestDataService implements IIATAService {
    getIATAAgencies(iataTravelAgencyId: string) : Promise<IIATAAgency[]> {
        return axios.get(`${this.config.baseUrl}/IATAService/resources/IATASummary/${encodeURIComponent(iataTravelAgencyId)}`).then((value) => {
            const response = value.data as GetAgencyRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getIATASummaryInformationResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getIATAAgencyDetails(iataTravelAgencyId: string) : Promise<IIATAAgencyDetail[]> {
        return axios.get(`${this.config.baseUrl}/IATAService/resources/IATADetails/${encodeURIComponent(iataTravelAgencyId)}`).then((value) => {
            const response = value.data as GetAgencyDetailRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getIATADetailInformationResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestIATAService as default, RestIATAService };