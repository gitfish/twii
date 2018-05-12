import { IOption } from "../IOption";
import { IListModel } from "./IListModel";

interface IOptionListModel extends IListModel<IOption> {
    getOption(key: string, defaultValue?: IOption) : IOption;
    itemsSorted: IOption[];
}

export { IOptionListModel };