import Context from "common/Context";
import IListingService from "./IListingService";
import RestListingService from "./RestListingService";

const ListingServiceContext = new Context<IListingService>({
    factory() {
        return new RestListingService();
    }
});

export { ListingServiceContext as default, ListingServiceContext };