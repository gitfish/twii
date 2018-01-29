import Context from "common/Context";
import IProfileMatchDataService from "./IProfileMatchDataService";
import SoapProfileMatchDataService from "./SoapProfileMatchDataService";

const ProfileMatchDataServiceContext = new Context<IProfileMatchDataService>({
    factory() {
        return new SoapProfileMatchDataService();
    }
});

export { ProfileMatchDataServiceContext as default, ProfileMatchDataServiceContext };