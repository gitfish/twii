import { IListingModel } from "./IListingModel";
import { IListingActivityListModel } from "./IListingActivityListModel";
import { ListingActivityListModel } from "./ListingActivityListModel";

const getActivity = (listing : IListingModel) : IListingActivityListModel => {
    let activity = listing.state.activity;
    if(!activity) {
        activity = new ListingActivityListModel(listing);
        listing.setState({ activity: activity });
    }
    return activity;
};

export { getActivity }