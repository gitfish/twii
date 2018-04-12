import { ListingServiceContext } from "@twii/ozp/lib/listing/service/ListingServiceContext";
import { MockListingService } from "@twii/ozp/lib/listing/service/MockListingService";
import { UserServiceContext } from "@twii/ozp/lib/user/service/UserServiceContext";
import { MockUserService } from "@twii/ozp/lib/user/service/MockUserService";

const configure = (env : any) => {
    UserServiceContext.value = new MockUserService();
    ListingServiceContext.value = new MockListingService();
};

export { configure }