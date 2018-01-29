import RefListModel from "./RefListModel";

const SystemIdTypeRefList = new RefListModel([
    { key: "prid", subPath: "application", text: "ICSE Permission Request ID" },
    { key: "cid", subPath: "client", text: "ICSE Client ID" }
]);

export { SystemIdTypeRefList as default, SystemIdTypeRefList };