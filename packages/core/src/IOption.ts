import { IKeyedItem } from "./IKeyedItem";

interface IOption extends IKeyedItem {
    text: string;
    data?: any;
}

export { IOption, IOption as default }