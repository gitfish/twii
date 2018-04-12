import { Context } from "@twii/common/lib/Context";
import { IListingService } from "./IListingService";
import { RestListingService } from "./RestListingService";

const ListingServiceContext = new Context<IListingService>({
    factory() {
        return new RestListingService();
    }
});

export { ListingServiceContext }