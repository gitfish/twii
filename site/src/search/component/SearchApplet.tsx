import * as React from "react";
import { observer } from "mobx-react";
import IAppHost from "app/IAppHost";
import SearchContainer from "./SearchContainer";
import SearchModel from "../SearchModel";
import SearchRequestModel from "../SearchRequestModel";

interface ISearchAppletProps {
    host: IAppHost;
}

@observer
class SearchApplet extends React.Component<ISearchAppletProps, any> {
    get request() {
        const host = this.props.host;
        if(!host.state.searchRequest) {
            host.state.searchRequest = new SearchRequestModel();
        }
        return host.state.searchRequest;
    }
    get search() {
        const host = this.props.host;
        if(!host.state.search) {
            const search = new SearchModel();
            search.addCoreById("Cargo_IAir_CR_Line", "Air Cargo");
            search.addCoreById("Cargo_ISea_CR_Line", "Sea Cargo");
            search.addCoreById("Mail", "Mail");
            search.addCoreById("PNR", "PNR");
            search.addCoreById("NIS", "NIS");
            host.state.search = search;
        }
        return host.state.search;
    }
    componentWillMount() {
        this.props.host.setTitle("Search");
    }
    render() {
        return (
            <div className="search-applet">
                <SearchContainer request={this.request} search={this.search}  />
            </div>
        );
    }
}

export { SearchApplet as default, SearchApplet }