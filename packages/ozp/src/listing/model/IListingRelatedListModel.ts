import { IListModel } from "@twii/common/lib/model/IListModel";
import { IListingModel } from "./IListingModel";

interface IListingRelatedListModel<T> extends IListModel<T> {
    listing : IListingModel;
}

export { IListingRelatedListModel };