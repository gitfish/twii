import { ListingServiceContext } from "./ListingServiceContext";
import { RestListingService } from "./RestListingService";

const configureRestListingService = (env : any) => {
    const s = new RestListingService();
    s.baseUrl = env["ozp.listing.service.baseUrl"];
    ListingServiceContext.value = s;
};

export { configureRestListingService }