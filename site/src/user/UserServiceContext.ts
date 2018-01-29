import Context from "common/Context";
import IUserService from "./IUserService";
import RestUserService from "./RestUserService";

const UserProfileServiceContext = new Context<IUserService>({
    factory() {
        return new RestUserService();
    }
});

export { UserProfileServiceContext as default, UserProfileServiceContext };