import IListing from "./IListing";
import { IListingBookmark } from "./IListingBookmark";
import {
  IListingService,
  IListingRequest,
  IListingListRequest,
  IListingListResponse,
  IListingSearchRequest,
  IListingReviewListRequest,
  IListingFeedbackListRequest,
  IListingReviewRequest
} from "./IListingService";
import { IListingReview } from "./IListingReview";
import { IListingStoreFront } from "./IListingStoreFront";
import { IListingFeedback } from "listing/IListingFeedback";
import { ListingApprovalStatus } from "listing/ListingApprovalStatus";
import { IListingActivity } from "listing/IListingActivity";
import { ListingActivityAction } from "listing/ListingActivityAction";

class MockListingService implements IListingService {
  throwError: boolean = false;
  listings: IListing[] = [
    {
      id: 1,
      is_enabled: true,
      title: "Entity Search",
      description_short: "Entity Search",
      description: "Entity Search",
      launch_url: "/entity/search",
      security_marking: "analyst_desktop_entity_search",
      approval_status: ListingApprovalStatus.APPROVED,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    },
    {
      id: 2,
      is_enabled: true,
      title: "Clipboard",
      description_short: "Clipboard",
      description: "Clipboard",
      launch_url: "/entity/profile",
      security_marking: "analyst_desktop_entity_search",
      approval_status: ListingApprovalStatus.APPROVED,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    },
    {
      id: 3,
      is_enabled: true,
      title: "ME Case Management",
      description_short: "ME Case Management",
      description: "ME Case Management",
      launch_url: "/me/portal",
      security_marking: "analyst_desktop_match_evaluation",
      approval_status: ListingApprovalStatus.APPROVED,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    },
    {
      id: 4,
      is_enabled: true,
      title: "Risk Resume Search",
      description_short: "Risk Resume Search",
      description: "Risk Resume Search",
      launch_url: "/vra/search",
      security_marking: "analyst_desktop_risk_resume",
      approval_status: ListingApprovalStatus.APPROVED,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    },
    {
      id: 5,
      is_enabled: true,
      title: "PNR Search",
      description_short: "PNR Search",
      description: "PNR Search",
      launch_url: "/pnr/search",
      security_marking: "analyst_desktop_pnr_search",
      approval_status: ListingApprovalStatus.APPROVED,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    },
    {
      id: 6,
      is_enabled: true,
      title: "Banana DGMS",
      description_short: "Banana DGMS",
      description: "Banana DGMS",
      launch_url: "https://dhd1e1:9031/solr/banana-release/src/index.html#/dashboard/solr/DGMS?server=%2Fsolr%2F",
      security_marking: "USER",
      approval_status: ListingApprovalStatus.APPROVED,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    },
    {
      id: 7,
      is_enabled: true,
      title: "Fabric",
      description_short: "Fabric",
      description: "Fabric",
      launch_url: "https://developer.microsoft.com/en-us/fabric",
      security_marking: "USER",
      approval_status: ListingApprovalStatus.APPROVED,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    },
    {
      id: 8,
      is_enabled: true,
      title: "Ant Design of React",
      description_short: "Ant Design of React",
      description: "Ant Design of React",
      launch_url: "https://ant.design/docs/react/introduce",
      security_marking: "USER",
      approval_status: ListingApprovalStatus.APPROVED,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    },
    {
      id: 9,
      is_enabled: true,
      title: "Smartgate Search",
      description_short: "Smartgate Search",
      description: "Smartgate Search",
      launch_url: "/smartgate/search",
      security_marking: "USER",
      approval_status: ListingApprovalStatus.APPROVED,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    },
    {
      id: 10,
      is_enabled: true,
      title: "Grommet",
      description_short: "Grommet UI Library",
      description: "Grommet UI Library",
      launch_url: "http://grommet.io/",
      security_marking: "USER",
      approval_status: ListingApprovalStatus.IN_PROGRESS,
      version_name: "1",
      total_reviews: 10,
      total_rate5: 8,
      total_rate4: 1,
      total_rate3: 0,
      total_rate2: 0,
      total_rate1: 1
    }
  ];
  saveListing(request: IListing): Promise<IListing> {
    console.log("-- Save Listing: " + JSON.stringify(request));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.throwError) {
          reject({ message: "Mock Service Error" });
        } else {
          let r;
          if (request.id) {
            // find the listing
            const idx = this.listings.findIndex(l => l.id === request.id);
            if (idx < 0) {
              reject({ code: "NOT_FOUND", message: `Unable to find listing for id ${request ? request.id : undefined}` })
            } else {
              r = Object.assign({}, request);
              this.listings[idx] = Object.assign({}, request);
              resolve(r);
            }
          } else {
            const lastEntry = this.listings[this.listings.length - 1];
            const lastId = lastEntry.id;
            const newId = lastId + 1;
            r = Object.assign({}, request, { id: newId });
            this.listings.push(r);
            resolve(r);
          }
        }
      }, 3000);
    });
  }
  deleteListing(request: IListing): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.throwError) {
          reject({ message: "Mock Service Error" });
        } else {
          const idx = this.listings.findIndex(l => l.id === request.id);
          if (idx < 0) {
            reject({ code: "NOT_FOUND", message: `Unable to find listing for id ${request ? request.id : undefined}` })
          } else {
            const listing = this.listings[idx];
            listing.approval_status = ListingApprovalStatus.DELETED;
            resolve();
          }
        }
      }, 3000);
    });
  }
  getListing(request: IListingRequest): Promise<IListing> {
    let r;
    if (request && request.listingId) {
      r = this.listings.find(l => String(l.id) === String(request.listingId));
    }
    if (!r) {
      return Promise.reject({ code: "NOT_FOUND", message: `Unable to find listing for id ${request ? request.listingId : undefined}` })
    }
    return Promise.resolve(Object.assign({}, r));
  }
  getListings(request?: IListingListRequest): Promise<IListingListResponse> {
    return Promise.resolve({ listings: [].concat(this.listings), counts: { total: this.listings.length } });
  }
  searchListings(request?: IListingSearchRequest): Promise<IListing[]> {
    return Promise.resolve([].concat(this.listings));
  }
  getBookmarkedListings(): Promise<IListingBookmark[]> {
    return Promise.resolve(this.listings.map(listing => {
      return { listing: listing }
    }));
  }
  addBookmark(request: IListingBookmark): Promise<IListingBookmark> {
    return Promise.resolve(request);
  }
  removeBookmark(request: IListingBookmark): Promise<IListingBookmark> {
    return Promise.resolve(request);
  }
  getStoreFront(): Promise<IListingStoreFront> {
    return Promise.resolve({
      featured: this.listings,
      most_popular: this.listings,
      recent: this.listings,
      recommended: this.listings
    });
  }
  getListingReviews(request: IListingReviewListRequest): Promise<IListingReview[]> {
    return Promise.resolve([
      {
        "author": {
          "id": 1,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": 1,
        "rate": 5,
        "text": "Oh man, you can search for entities!",
        "edited_date": "2017-12-18T06:08:27.513109Z",
        "id": 1
      }
    ]);
  }
  getListingReview(request: IListingReviewRequest): Promise<IListingReview> {
    return Promise.reject({ code: "NOT_IMPLEMENTED", message: "Not implemented" });
  }
  deleteListingReview(request: IListingReviewRequest): Promise<any> {
    return Promise.reject({ code: "NOT_IMPLEMENTED", message: "Not implemented" });
  }
  saveListingReview(review: IListingReview): Promise<IListingReview> {
    return Promise.reject({ code: "NOT_IMPLEMENTED", message: "Not implemented" });
  }
  getListingFeedback(request: IListingFeedbackListRequest): Promise<IListingFeedback[]> {
    return Promise.resolve([]);
  }
  getListingActivity(request: IListingRequest): Promise<IListingActivity[]> {
    return Promise.resolve([
      {
        "action": ListingActivityAction.MODIFIED,
        "activity_date": "2018-01-22T02:55:25.226357Z",
        "description": "",
        "author": {
          "id": 1,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": {
          "unique_name": "dibp.analystdesktop.eSearch",
          "title": "E Search",
          "id": 21,
          "agency": {
            "title": "Department of Immigration and Border Protection",
            "short_name": "DIBP"
          },
          "small_icon": null,
          "is_deleted": false
        },
        "change_details": [
          {
            "id": 1181,
            "field_name": "title",
            "old_value": "Entity Search",
            "new_value": "E Search"
          },
          {
            "id": 1182,
            "field_name": "description",
            "old_value": "Entity Search",
            "new_value": "Enterprise Wide Data Holdings Search"
          },
          {
            "id": 1183,
            "field_name": "description_short",
            "old_value": "Entity Search",
            "new_value": "Enterprise Data Holdings Search"
          },
          {
            "id": 1184,
            "field_name": "unique_name",
            "old_value": "dibp.analystdesktop.entitySearch",
            "new_value": "dibp.analystdesktop.eSearch"
          }
        ]
      },
      {
        "action": ListingActivityAction.MODIFIED,
        "activity_date": "2018-01-16T01:13:57.021523Z",
        "description": "",
        "author": {
          "id": 1,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": {
          "unique_name": "dibp.analystdesktop.eSearch",
          "title": "E Search",
          "id": 21,
          "agency": {
            "title": "Department of Immigration and Border Protection",
            "short_name": "DIBP"
          },
          "small_icon": null,
          "is_deleted": false
        },
        "change_details": [
          {
            "id": 601,
            "field_name": "banner_icon",
            "old_value": "",
            "new_value": "461.UNCLASSIFIED"
          }
        ]
      },
      {
        "action": ListingActivityAction.ENABLED,
        "activity_date": "2017-12-11T05:18:23.706019Z",
        "description": "",
        "author": {
          "id": 1,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": {
          "unique_name": "dibp.analystdesktop.eSearch",
          "title": "E Search",
          "id": 1,
          "agency": {
            "title": "Department of Immigration and Border Protection",
            "short_name": "DIBP"
          },
          "small_icon": null,
          "is_deleted": false
        },
        "change_details": []
      },
      {
        "action": ListingActivityAction.DISABLED,
        "activity_date": "2017-12-11T05:14:41.136850Z",
        "description": "",
        "author": {
          "id": 1,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": {
          "unique_name": "dibp.analystdesktop.eSearch",
          "title": "E Search",
          "id": 1,
          "agency": {
            "title": "Department of Immigration and Border Protection",
            "short_name": "DIBP"
          },
          "small_icon": null,
          "is_deleted": false
        },
        "change_details": []
      },
      {
        "action": ListingActivityAction.ENABLED,
        "activity_date": "2017-12-04T21:46:48.405447Z",
        "description": "",
        "author": {
          "id": 1,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": {
          "unique_name": "dibp.analystdesktop.eSearch",
          "title": "E Search",
          "id": 1,
          "agency": {
            "title": "Department of Immigration and Border Protection",
            "short_name": "DIBP"
          },
          "small_icon": null,
          "is_deleted": false
        },
        "change_details": []
      },
      {
        "action": ListingActivityAction.DISABLED,
        "activity_date": "2017-12-04T05:09:48.443841Z",
        "description": "",
        "author": {
          "id": 21,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": {
          "unique_name": "dibp.analystdesktop.eSearch",
          "title": "E Search",
          "id": 21,
          "agency": {
            "title": "Department of Immigration and Border Protection",
            "short_name": "DIBP"
          },
          "small_icon": null,
          "is_deleted": false
        },
        "change_details": []
      },
      {
        "action": ListingActivityAction.ENABLED,
        "activity_date": "2017-12-04T05:08:53.059943Z",
        "description": "",
        "author": {
          "id": 1,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": {
          "unique_name": "dibp.analystdesktop.eSearch",
          "title": "E Search",
          "id": 1,
          "agency": {
            "title": "Department of Immigration and Border Protection",
            "short_name": "DIBP"
          },
          "small_icon": null,
          "is_deleted": false
        },
        "change_details": []
      },
      {
        "action": ListingActivityAction.DISABLED,
        "activity_date": "2017-12-04T05:02:21.489643Z",
        "description": "",
        "author": {
          "id": 1,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": {
          "unique_name": "dibp.analystdesktop.eSearch",
          "title": "E Search",
          "id": 1,
          "agency": {
            "title": "Department of Immigration and Border Protection",
            "short_name": "DIBP"
          },
          "small_icon": null,
          "is_deleted": false
        },
        "change_details": []
      },
      {
        "action": ListingActivityAction.MODIFIED,
        "activity_date": "2017-12-04T04:24:01.043694Z",
        "description": "",
        "author": {
          "id": 1,
          "user": {
            "username": "ADPTA0",
            "email": "AnalystDesktopMailbox@border.gov.au"
          },
          "display_name": "ADPTestFN1 ADPTestLN1",
          "dn": "uid=ADPTA0,ou=people,dc=immi,dc=gov,dc=au"
        },
        "listing": {
          "unique_name": "dibp.analystdesktop.eSearch",
          "title": "E Search",
          "id": 1,
          "agency": {
            "title": "Department of Immigration and Border Protection",
            "short_name": "DIBP"
          },
          "small_icon": null,
          "is_deleted": false
        },
        "change_details": [
          {
            "id": 123,
            "field_name": "description",
            "old_value": "Entity Search Full Description",
            "new_value": "Entity Search"
          },
          {
            "id": 124,
            "field_name": "description_short",
            "old_value": "Entity Search Short Description",
            "new_value": "Entity Search"
          }
        ]
      }
    ]);
  }
}

export { MockListingService as default, MockListingService }
