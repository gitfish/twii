import IRiskResumeSearchHistoryEntry from "./IRiskResumeSearchHistoryEntry";
import IRiskResumeSearchRequest from "./IRiskResumeSearchRequest";
import IListModel from "common/IListModel";

interface IMasterEntitySearchHistoryModel extends IListModel<IRiskResumeSearchHistoryEntry> {
    load() : Promise<any>;
    addRequest(request : IRiskResumeSearchRequest) : Promise<any>;
}

export { IMasterEntitySearchHistoryModel as default, IMasterEntitySearchHistoryModel };