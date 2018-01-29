import Context from "common/Context";
import IApplicationClientDetailsService from "./IApplicationClientDetailsService";
import RestApplicationClientDetailsService from "./RestApplicationClientDetailsService";

const ApplicationClientDetailsServiceContext = new Context<IApplicationClientDetailsService>({
    id: "ApplicationClientDetailsService",
    factory() { 
        return new RestApplicationClientDetailsService()
    }
});

export { ApplicationClientDetailsServiceContext as default, ApplicationClientDetailsServiceContext };