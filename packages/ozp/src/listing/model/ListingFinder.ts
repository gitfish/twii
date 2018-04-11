import { ISyncSupplier } from "@pu/common/lib/ISyncSupplier";
import { IListingModel } from "./IListingModel";
import { ListingModelSupplier } from "./ListingModelSupplier";

const deleteAfter = 2 * 60 * 1000;

interface IEntry {
    supplier: ISyncSupplier<IListingModel>;
    timeout?: any;
}

const entryMap : { [key : number] : IEntry } = {};

const deleteEntry = (key : number) => {
    delete entryMap[key];
};

const findById = (listingId : number) : ISyncSupplier<IListingModel> => {
    let entry = entryMap[listingId];
    if(!entry) {
        entry = { supplier: new ListingModelSupplier(listingId) };
        entryMap[listingId] = entry;

        // add our deletion timeout
        entry.timeout = setTimeout(() => {
            deleteEntry(listingId);
        }, deleteAfter);
    }
    entry.supplier.load();
    return entry.supplier;
};

export { findById }