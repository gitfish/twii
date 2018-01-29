import { IListingModel } from "./IListingModel";
import { IListingReviewListModel } from "./IListingReviewListModel";
import { ListingReviewListModel } from "./ListingReviewListModel";

const getReviews = (listing : IListingModel) : IListingReviewListModel => {
    let reviews = listing.state.reviews;
    if(!reviews) {
        reviews = new ListingReviewListModel(listing);
        listing.setState({ reviews: reviews });
    }
    return reviews;
};

export { getReviews }