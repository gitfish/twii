import IUrlConfig from "config/IUrlConfig";

interface ISolrConfig extends IUrlConfig {
    server?: string;
    port?: string;
}

export { ISolrConfig }