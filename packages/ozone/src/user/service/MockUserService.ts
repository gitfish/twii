import { IUserService, IGetUsersRequest } from "./IUserService";
import { IUserProfile } from "../IUserProfile";
import { IUser } from "../IUser";

class MockUserService implements IUserService {
    getUsers(request?: IGetUsersRequest) : Promise<IUser[]> {
        return Promise.resolve(null);
    }
    getUserProfile() : Promise<IUserProfile> {
        return Promise.resolve({
            id: 1,
            display_name: "Mock User",
            bio: "Mock User Bio",
            user: {
                username: "mock",
                email: "mock@twii.test",
                groups: [
                    {
                        name: "user"
                    },
                    {
                        name: "developer"
                    },
                    {
                        name: "admin"
                    }
                ]
            }
        });
    }
}

export { MockUserService }