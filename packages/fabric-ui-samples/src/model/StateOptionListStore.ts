import { OptionListModel } from "@twii/common/lib/model/OptionListModel";

const StateOptionListStore = new OptionListModel([
    { key: "ACT", text: "Australian Capital Territory" },
    { key: "NSW", text: "New South Wales" },
    { key: "NT", text: "Northern Territory" },
    { key: "QLD", text: "Queensland" },
    { key: "SA", text: "South Australia" },
    { key: "TAS", text: "Tasmania" },
    { key: "VIC", text: "Victoria" },
    { key: "WA", text: "Western Australia" }
]);

export { StateOptionListStore, StateOptionListStore as default };