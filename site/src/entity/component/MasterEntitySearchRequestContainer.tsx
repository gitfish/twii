import * as React from "react";
import MasterEntitySearchRequestEditor from "./MasterEntitySearchRequestEditor";
import MasterEntitySearchRequestActions from "./MasterEntitySearchRequestActions";
import IMasterEntitySearchRequestModel from "../IMasterEntitySearchRequestModel";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";

interface IMasterEntitySearchRequestContainerProps {
    searchRequest: IMasterEntitySearchRequestModel;
    onSubmit?: (request : IMasterEntitySearchRequest) => void;
    onClear?: () => void;
}

class MasterEntitySearchRequestContainer extends React.Component<IMasterEntitySearchRequestContainerProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter) {
            this.props.searchRequest.submit(this.props.onSubmit);
        }
    }
    render() {
        return (
            <div className="master-entity-search-container" onKeyDown={this._onKeyDown}>
                <MasterEntitySearchRequestEditor searchRequest={this.props.searchRequest} />
                <MasterEntitySearchRequestActions searchRequest={this.props.searchRequest} onSubmit={this.props.onSubmit} onClear={this.props.onClear} />
            </div>
        );
    }
}

export {
    MasterEntitySearchRequestContainer as default,
    MasterEntitySearchRequestContainer,
    IMasterEntitySearchRequestContainerProps
};