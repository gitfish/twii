import axios from "axios";
import IListing from "./IListing";
import { IListingBookmark } from "./IListingBookmark";
import { IListingReview } from "./IListingReview";
import { IListingFeedback } from "./IListingFeedback";
import {
    IListingService,
    IListingRequest,
    IListingListRequest,
    IListingListResponse,
    IListingListCounts,
    IListingSearchRequest,
    IListingReviewListRequest,
    IListingReviewRequest,
    IListingFeedbackListRequest
} from "./IListingService";
import { ListingApprovalStatus } from "./ListingApprovalStatus";
import { IListingStoreFront } from "./IListingStoreFront";
import { IListingActivity } from "listing/IListingActivity";
import AbstractRestService from "common/AbstractRestService";
import RestApiConfig from "config/RestApiConfig";
import { IUserProfile } from "user/IUserProfile";
import { IImage } from "media/IImage";
import * as StringUtils from "util/String";
import { IUrlConfig } from "config/IUrlConfig";

const handleError = (error : any) => {
    if(error.response && error.response.status === 400) {
        return Promise.reject({ message: error.message, status: error.response.status, code: "BAD_REQUEST", errors: error.response.data });
    }
    return Promise.reject(error);
};

const createUniqueName = (value : IListing) : string => {
    return `dibp.analystdesktop.${StringUtils.wordsToCamelCase(value.title)}`;
};

class RestListingService extends AbstractRestService implements IListingService {
    constructor(config?: IUrlConfig) {
        super();
        this._config = config;
    }
    get config() {
        return this._config || RestApiConfig;
    }
    getListing(request : IListingRequest) : Promise<IListing> {
        return axios.get(`${this.config.baseUrl}/listing/${request.listingId}/`, { auth: this.config.auth }).then(ar => {
            return ar.data as IListing;
        });
    }
    getListings(request?: IListingListRequest) : Promise<IListingListResponse> {
        return axios.get(`${this.config.baseUrl}/listing/`, { params: request, auth: this.config.auth }).then((value) => {
            const r = value.data as any[];
            if(r && r.length > 0) {
                // the last record is the count
                const counts : IListingListCounts = r[r.length - 1];
                const listings : IListing[] = r.slice(0, r.length - 1);
                return { listings: listings, counts: counts };
            }
            return { listings: [], counts: { total: 0 } }
        });
    }
    searchListings(request?: IListingSearchRequest) : Promise<IListing[]> {
        return axios.get(`${this.config.baseUrl}/listings/search/`, { params: request, auth: this.config.auth }).then(ar => {
            return ar.data as IListing[];
        });
    }
    saveListing(request : IListing) : Promise<IListing> {
        const ir = Object.assign({}, { unique_name: createUniqueName(request) }, request);
        const p = request.id ?
                    axios.put(`${this.config.baseUrl}/listing/${request.id}/`, ir, { auth: this.config.auth }) :
                    axios.post(`${this.config.baseUrl}/listing/`, ir, { auth: this.config.auth });
        return p.then(ar => {
            return ar.data as IListing;
        }).catch(handleError);
    }
    deleteListing(request : IListing) : Promise<any> {
        return axios.delete(`${this.config.baseUrl}/listing/${request.id}/`, { auth: this.config.auth }).then(ar => {
            return ar.data as IListing;
        }).catch(handleError);
    }
    getBookmarkedListings() : Promise<IListingBookmark[]> {
        return axios.get(`${this.config.baseUrl}/self/library/`, { auth: this.config.auth }).then(ar => {
            return ar.data as IListingBookmark[];
        });
    }
    addBookmark(request : IListingBookmark) : Promise<IListingBookmark> {
        return axios.post(`${this.config.baseUrl}/self/library/`, request, { auth: this.config.auth }).then(ar => {
            return ar.data as IListingBookmark;
        });
    }
    removeBookmark(request : IListingBookmark) : Promise<IListingBookmark> {
        return axios.delete(`${this.config.baseUrl}/self/library/${request.id}/`, { auth: this.config.auth }).then(() => {
            return request;
        });
    }
    getStoreFront() : Promise<IListingStoreFront> {
        return axios.get(`${this.config.baseUrl}/storefront/`, { auth: this.config.auth }).then(ar => {
            return ar.data as IListingStoreFront;
        });
    }
    getListingReviews(request : IListingReviewListRequest) : Promise<IListingReview[]> {
        let params;
        if(request.limit !== undefined || request.offset !== undefined || request.ordering !== undefined) {
            params = Object.assign({}, request);
            delete params.listingId;
        }
        return axios.get(`${this.config.baseUrl}/listing/${request.listingId}/review/`, { params: params, auth: this.config.auth }).then(ar => {
            return ar.data as IListingReview[];
        });
    }
    getListingReview(request : IListingReviewRequest) : Promise<IListingReview> {
        return axios.get(`${this.config.baseUrl}/listing/${request.listingId}/review/${request.reviewId}/`, { auth: this.config.auth }).then(ar => {
            return ar.data as IListingReview;
        });
    }
    deleteListingReview(request : IListingReviewRequest) : Promise<any> {
        return axios.delete(`${this.config.baseUrl}/listing/${request.listingId}/review/${request.reviewId}/`, { auth: this.config.auth });
    }
    saveListingReview(request : IListingReview) : Promise<IListingReview> {
        const p = request.id ?
            axios.put(`${this.config.baseUrl}/listing/${request.listing}/review/${request.id}/`, request, { auth: this.config.auth }) :
            axios.post(`${this.config.baseUrl}/listing/${request.listing}/review/`, request, { auth: this.config.auth });
        return p.then(ar => {
            return ar.data as IListingReview;
        }).catch(handleError);
    }
    getListingFeedback(request : IListingFeedbackListRequest) : Promise<IListingFeedback[]> {
        let params;
        if(request.limit !== undefined || request.offset !== undefined) {
            params = Object.assign({}, request);
            delete params.listingId;
        }
        return axios.get(`${this.config.baseUrl}/listing/${request.listingId}/feedback/`, { params: params, auth: this.config.auth }).then(ar => {
            return ar.data as IListingFeedback[];
        });
    }
    getListingActivity(request : IListingRequest) : Promise<IListingActivity[]> {
        return axios.get(`${this.config.baseUrl}/listing/${request.listingId}/activity/`, { auth: this.config.auth }).then(ar => {
            return ar.data as IListingActivity[];
        });
    }
}

export { RestListingService as default, RestListingService }
