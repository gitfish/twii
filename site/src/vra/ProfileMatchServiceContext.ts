import Context from "common/Context";
import IProfileMatchService from "./IProfileMatchService";
import RestProfileMatchService from "./RestProfileMatchService";

const ProfileMatchServiceContext = new Context<IProfileMatchService>({
    id: "ProfileMatchService",
    factory() { 
        return new RestProfileMatchService()
    }
});

export { ProfileMatchServiceContext as default, ProfileMatchServiceContext };