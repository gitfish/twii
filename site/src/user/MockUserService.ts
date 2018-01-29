import { IUserService, IGetUsersRequest } from "./IUserService";
import { IUser } from "./IUser";
import IUserProfile from "./IUserProfile";

class MockUserProfileService implements IUserService {
    userProfile : IUserProfile = {
        id: 1,
        display_name: "Mock User",
        user: {
            username: "MOCK",
            email: "mock@border.gov.au",
            groups: [
                {
                    name: "USER"
                },
                {
                    name: "ORG_STEWARD"
                },
                {
                    name: "APPS_MALL_STEWARD"
                },
                {
                    name: "analyst_desktop_admin"
                },
                {
                    name: "analyst_desktop_entity_search"
                },
                {
                    name: "analyst_desktop_match_evaluation"
                },
                {
                    name: "analyst_desktop_risk_resume"
                },
                {
                    name: "analyst_desktop_pnr_search"
                }
            ]
        }
    };
    getUsers(request : IGetUsersRequest) : Promise<IUser[]> {
        return Promise.resolve([this.userProfile.user]);
    }
    getUserProfile() : Promise<IUserProfile> {
        return Promise.resolve(this.userProfile)
    }
}

export { MockUserProfileService as default, MockUserProfileService }