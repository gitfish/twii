import { observable, computed } from "mobx";
import IRefList from "./IRefList";
import IRefListItem from "./IRefListItem";
import * as SortUtils from "util/Sort";
import ISort from "common/ISortProps";

class RefListModel implements IRefList {
    @observable items : IRefListItem[] = [];

    constructor(items : IRefListItem[]) {
        this.items = items;
    }

    getItemByKey(key: string, defaultItem?: IRefListItem) : IRefListItem {
        const item = this.items.find((item) => {
            return item.key === key;
        });
        return item || defaultItem;
    }

    @computed
    get itemsSorted(): IRefListItem[] {
        const sortProps =  {
            field: "text",
            descending: false
        } as ISort;
        return SortUtils.sort(this.items.slice(), sortProps);
    }
}

export { RefListModel as default, RefListModel };