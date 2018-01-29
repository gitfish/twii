import { action } from "mobx";
import IAppHost from "app/IAppHost";
import IRiskResumeSearchRequest from "./IRiskResumeSearchRequest";
import RiskResumeSearchHistoryStore from "./RiskResumeSearchHistoryStore";
import SystemIdTypeRefList from "common/ref/SystemIdTypeRefList";
import IClientRiskCheckKey from "./IClientRiskCheckKey";

const submitSearchRequest = action((host : IAppHost, request : IRiskResumeSearchRequest) => {
    RiskResumeSearchHistoryStore.addRequest(request);
    let idTypeRefItem = SystemIdTypeRefList.getItemByKey(request.idType);
    if (idTypeRefItem) {
        clearClientRiskOverview(host);
        clearApplication(host);
        host.load({path: `/vra/${encodeURIComponent(idTypeRefItem.subPath)}/${encodeURIComponent(request.id)}`});
    }
});
const loadSearch = action((host: IAppHost) => {
    host.load({ path: `/vra/search` });
});
const loadClientRiskOverview = action((host: IAppHost, clientId: string) => {
    host.load({ path: `/vra/client/${encodeURIComponent(clientId)}` });
});
const loadApplication = action((host: IAppHost, permissionRequestId: string) => {
    host.load({ path: `/vra/application/${encodeURIComponent(permissionRequestId)}` });
});
const loadClient = action((host: IAppHost, clientRiskCheckKey: IClientRiskCheckKey) => {
    host.load({ path: '/vra/client', params: { clientRiskCheckKey: clientRiskCheckKey} });
});
const clearClientRiskOverview = action((host: IAppHost) => {
    host.setState({ clientRiskOverview: undefined });
});
const clearApplication = action((host: IAppHost) => {
    host.setState({ applicationRisk: undefined });
});

export {
    submitSearchRequest,
    loadSearch,
    loadClientRiskOverview,
    loadApplication,
    loadClient,
    clearClientRiskOverview,
    clearApplication
}