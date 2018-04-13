import { ListingServiceContext } from "../service/ListingServiceContext";
import { MockListingService } from "../service/MockListingService";

const mock = (env : any) => {
    ListingServiceContext.value = new MockListingService();
};

export { mock }