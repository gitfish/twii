import { ListingServiceContext } from "@pu/ozp/lib/listing/service/ListingServiceContext";
import { MockListingService } from "@pu/ozp/lib/listing/service/MockListingService";
import { UserServiceContext } from "@pu/ozp/lib/user/service/UserServiceContext";
import { MockUserService } from "@pu/ozp/lib/user/service/MockUserService";

const configure = (env : any) => {
    UserServiceContext.value = new MockUserService();
    ListingServiceContext.value = new MockListingService();
};

export { configure }