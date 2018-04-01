import { Context } from "@twii/common/lib/Context";
import { IUserService } from "./IUserService";
import { RestUserService } from "./RestUserService";

const UserServiceContext = new Context<IUserService>({
    factory() {
        return new RestUserService();
    }
});

export { UserServiceContext }