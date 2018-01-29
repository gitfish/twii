import IUrlConfig from "./IUrlConfig";

const RestPNRServiceConfig : IUrlConfig = {
    //baseUrl: "/DataServicesPNR"
    baseUrl: "/DataServices" //Todo: Change back to DataServicesPNR as this is a workaround only
};

export { RestPNRServiceConfig as default, RestPNRServiceConfig };