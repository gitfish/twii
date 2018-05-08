import { IListing } from "../IListing";
import { IListingBookmark } from "../IListingBookmark";
import { IListingStoreFront } from "../IListingStoreFront";
import { IListingReview } from "../IListingReview";
import { IListingActivity } from "../IListingActivity";
import { IListingFeedback } from "../IListingFeedback";
import { ListingApprovalStatus } from "../ListingApprovalStatus";
import {
    IListingService,
    IListingRequest,
    IListingListRequest,
    IListingListResponse,
    IListingSearchRequest,
    IListingReviewRequest,
    IListingReviewListRequest,
    IListingFeedbackListRequest
} from "./IListingService";

const state = { listingId: 1, listingBookmarkId: 1 };

const nextListingId = () : number => {
    const r = state.listingId;
    state.listingId ++;
    return r;
};

const nextListingBookmarkid = () : number => {
    const r = state.listingBookmarkId;
    state.listingBookmarkId ++;
    return r;
}

const listingNotFound = (listingId : number) : Promise<any> => {
    return Promise.reject({ code: "NOT_FOUND", message: `Unable to find listing by id: ${listingId}`});
};

class MockListingService implements IListingService {
    private _listings : IListing[] = [
        {
            id: nextListingId(),
            unique_name: "github",
            title: "Github",
            description: "Github",
            description_short: "Github",
            launch_url: "http://www.github.com",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "react",
            title: "React",
            description: "React",
            description_short: "React",
            launch_url: "https://reactjs.org",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "office-ui-fabric-react",
            title: "Office UI Fabric React",
            description: "Office UI Fabric React",
            description_short: "Office UI Fabric React",
            launch_url: "https://developer.microsoft.com/en-us/fabric#/components",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "blueprint_alert_sample",
            title: "Blueprint Alert Sample",
            description: "Blueprint Alert Sample",
            description_short: "Blueprint Alert Sample",
            launch_url: "/samples/blueprint/alert",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "blueprint_dialog_sample",
            title: "Blueprint Dialog Sample",
            description: "Blueprint Dialog Sample",
            description_short: "Blueprint Dialog Sample",
            launch_url: "/samples/blueprint/dialog",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        },
        {
            id: nextListingId(),
            unique_name: "blueprint_contextmenu_sample",
            title: "Blueprint Context Menu Sample",
            description: "Blueprint Context Menu Sample",
            description_short: "Blueprint Context Menu Sample",
            launch_url: "/samples/blueprint/contextmenu",
            approval_status: ListingApprovalStatus.APPROVED,
            is_enabled: true
        }
    ];
    private _bookmarks : IListingBookmark[] = [];
    getListing(request : IListingRequest) : Promise<IListing> {
        const r = this._listings.find(l => l.id === request.listingId);
        return r ? Promise.resolve(Object.assign({}, r)) : listingNotFound(request.listingId);
    }
    saveListing(request : IListing) : Promise<IListing> {
        if(request.id) {
            const idx = this._listings.findIndex(l => l.id === request.id);
            if(idx >= 0) {
                this._listings[idx] = Object.assign({}, this._listings[idx], request);
                return Promise.resolve(Object.assign({}, this._listings[idx]));
            }
            return listingNotFound(request.id);
        }
        const newListing = Object.assign({}, request, { id: nextListingId(), unique_name: request.title });
        this._listings.push(newListing);
        return Promise.resolve(Object.assign({}, newListing));
    }
    deleteListing(request : IListing) : Promise<any> {
        if(request.id) {
            const idx = this._listings.findIndex(l => l.id === request.id);
            if(idx >= 0) {
                this._listings.splice(idx, 1);
                return Promise.resolve();
            }
            return listingNotFound(request.id);
        }
        return Promise.reject({ code: "INVALID_ARGUMENT", key: "id", message: "Listing id not provided"});
    }
    getListings(request?: IListingListRequest) : Promise<IListingListResponse> {
        return Promise.resolve(null);
    }
    searchListings(request?: IListingSearchRequest) : Promise<IListing[]> {
        return Promise.resolve(null);
    }
    getBookmarkedListings() : Promise<IListingBookmark[]> {
        const bookmarks = this._bookmarks.map(b => {
            return {
                id: b.id,
                listing: Object.assign({}, this._listings.find(l => l.id === b.listing.id))
            };
        });
        return Promise.resolve(bookmarks);
    }
    addBookmark(request: IListingBookmark) : Promise<IListingBookmark> {
        const listing = this._listings.find(l => request.listing && request.listing.id === l.id);
        if(listing) {
            const r : IListingBookmark = { id: nextListingBookmarkid(), listing: Object.assign({}, listing) };
            this._bookmarks.push(r);
            return Promise.resolve(Object.assign({}, r));
        }
        return listingNotFound(request.listing ? request.listing.id : undefined);
    }
    removeBookmark(request: IListingBookmark) : Promise<IListingBookmark> {
        const idx = this._bookmarks.findIndex(b => request.listing && request.listing.id === b.listing.id);
        if(idx >= 0) {
            const r = this._bookmarks[idx];
            this._bookmarks.splice(idx, 1);
            return Promise.resolve(Object.assign({}, r));
        }
        return Promise.reject({ code: "NOT_FOUND", message: "Bookmark not found"});
    }
    getStoreFront() : Promise<IListingStoreFront> {
        const r = this._listings.map(l => Object.assign({}, l));
        return Promise.resolve({
            featured: r,
            most_popular: r,
            recent: r,
            recommended: r
        });
    }
    getListingReviews(request : IListingReviewListRequest) : Promise<IListingReview[]> {
        return Promise.resolve(null);
    }
    getListingReview(request : IListingReviewRequest) : Promise<IListingReview> {
        return Promise.resolve(null);
    }
    deleteListingReview(request : IListingReviewRequest) : Promise<any> {
        return Promise.resolve(null);
    }
    saveListingReview(review : IListingReview) : Promise<IListingReview> {
        return Promise.resolve(null);
    }
    getListingFeedback(request : IListingFeedbackListRequest) : Promise<IListingFeedback[]> {
        return Promise.resolve(null);
    }
    getListingActivity(request : IListingRequest) : Promise<IListingActivity[]> {
        return Promise.resolve(null);
    }
}

export { MockListingService }