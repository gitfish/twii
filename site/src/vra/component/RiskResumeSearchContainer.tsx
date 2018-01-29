import * as React from "react";
import RiskResumeSearchEditor from "./RiskResumeSearchEditor";
import RiskResumeSearchActions from "./RiskResumeSearchActions";
import IRiskResumeSearchRequestModel from "../IRiskResumeSearchRequestModel";
import IRiskResumeSearchRequest from "../IRiskResumeSearchRequest";
import Details from "common/component/Details";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";

interface IRiskResumeSearchContainerProps {
    searchRequest: IRiskResumeSearchRequestModel;
    onSubmit?: (request : IRiskResumeSearchRequest) => void;
}

class RiskResumeSearchContainer extends React.Component<IRiskResumeSearchContainerProps, any> {
    _handleKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter) {
            this.props.searchRequest.submit(this.props.onSubmit);
        }
    };
    render() {
        return (
            <Details title="Search" className="risk-resume-search-container" controlOnHeaderClick={false} open={true}>
                <div onKeyDown={this._handleKeyDown}>
                    <RiskResumeSearchEditor searchRequest={this.props.searchRequest} />
                    <RiskResumeSearchActions searchRequest={this.props.searchRequest} onSubmit={this.props.onSubmit} />
                </div>
            </Details>
        );
    }
}

export { RiskResumeSearchContainer as default, RiskResumeSearchContainer };