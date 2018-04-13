import { UserServiceContext } from "../service/UserServiceContext";
import { MockUserService } from "../service/MockUserService";

const mock = (env : any) => {
     UserServiceContext.value = new MockUserService();
};

export { mock }