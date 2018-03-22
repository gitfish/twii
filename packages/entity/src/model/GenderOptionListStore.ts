import { OptionListModel } from "@twii/common/lib/model/OptionListModel";

const GenderOptionListStore = new OptionListModel([
    {
        key: "MALE",
        text: "Male"
    },
    {
        key: "FEMALE",
        text: "Female"
    }
]);

export { GenderOptionListStore }