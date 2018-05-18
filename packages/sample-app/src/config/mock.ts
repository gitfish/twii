import mockOzone from "@twii/ozone/lib/config/mock";
import mockDashboardStorage from "@twii/bored/lib/config/mock";

const mock = (env : any) => {
    mockOzone(env);
    mockDashboardStorage(env);
};

export { mock, mock as default }