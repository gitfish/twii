import { ListingServiceContext } from "../service/ListingServiceContext";
import { RestListingService } from "../service/RestListingService";

const rest = (env : any) => {
    const s = new RestListingService();
    s.baseUrl = env["ozp.listing.service.baseUrl"];
    ListingServiceContext.value = s;
};

export { rest }