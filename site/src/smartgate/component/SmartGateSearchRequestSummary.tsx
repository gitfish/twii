import * as React from "react";
import { DefinitionListGroup, IFieldProps } from "common/component/DefinitionListGroup";
import { ISmartGateSearchRequest } from "../ISmartGateSearchRequest";

interface ISmartGateSearchRequestSummaryProps {
    request: ISmartGateSearchRequest;
}

class SmartGateSearchRequestSummary extends React.Component<ISmartGateSearchRequestSummaryProps, any> {
    render() {
        return <DefinitionListGroup value={this.props.request} inline />
    }
}

export { SmartGateSearchRequestSummary }