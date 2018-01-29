import axios from "axios";
import IProfileMatchService from "./IProfileMatchService";
import IProfileMatchSummary from "./IProfileMatchSummary";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";
import IApplicationClientRiskSummaryItem from "./IApplicationClientRiskSummaryItem";
import { dataServicesTsToRiskResumeDataTs } from "./RiskUtils";

interface GetProfileMatchesRestResponse {
    errors?: any;
    getProfileMatchesResponse?: IProfileMatchSummary[];
}

class RestProfileMatchService extends AbstractRestDataService implements IProfileMatchService {
    getProfileMatches(riskCheckSummaryItem: IApplicationClientRiskSummaryItem) : Promise<IProfileMatchSummary[]> {
        const req = {
            applicationClientRoleId: riskCheckSummaryItem.applicationClientRoleId,
            applicationId: riskCheckSummaryItem.permissionRequestId,
            clientId: riskCheckSummaryItem.sourceClientId,
            riskCheckTimestamp: dataServicesTsToRiskResumeDataTs(riskCheckSummaryItem.clientRiskPerformedTimestamp),
            riskSystemCode: riskCheckSummaryItem.riskSystemCode,
            sourceSystemCode: riskCheckSummaryItem.sourceSystemCode,
            eventSourceCode: riskCheckSummaryItem.eventSourceCode,
            channelCode: riskCheckSummaryItem.channelCode
        };
        return axios.post(`${this.config.baseUrl}/VRAService/v1/resources/ProfileMatches`, req).then((value) => {
            const response = this.assertObject(value.data) as GetProfileMatchesRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getProfileMatchesResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestProfileMatchService as default, RestProfileMatchService };