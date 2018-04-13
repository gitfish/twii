import { ListingServiceContext } from "./ListingServiceContext";
import { MockListingService } from "./MockListingService";

const configureMockListingService = (env : any) => {
    ListingServiceContext.value = new MockListingService();
};

export { configureMockListingService }