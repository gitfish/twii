import { UserServiceContext } from "../service/UserServiceContext";
import { RestUserService } from "../service/RestUserService";

const rest = (env : any) => {
    const s = new RestUserService();
    s.baseUrl = env["ozp.user.service.baseUrl"];
    UserServiceContext.value = s;
};

export { rest }