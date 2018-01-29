import RefListModel from "./RefListModel";

const StateRefList = new RefListModel([
    { key: "ACT", text: "Australian Capital Territory" },
    { key: "NSW", text: "New South Wales" },
    { key: "NT", text: "Northern Territory" },
    { key: "QLD", text: "Queensland" },
    { key: "SA", text: "South Australia" },
    { key: "TAS", text: "Tasmania" },
    { key: "VIC", text: "Victoria" },
    { key: "WA", text: "Western Australia" }
]);

export { StateRefList as default, StateRefList };