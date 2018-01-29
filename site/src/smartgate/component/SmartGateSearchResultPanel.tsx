import * as React from "react";
import { observer } from "mobx-react";
import { ISmartGateSearchResult } from "../ISmartGateSearchResult";
import { IHandleModel } from "common/IHandleModel";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { SmartGateSearchResultCard } from "./SmartGateSearchResultCard";

interface ISmartGateSearchResultPanelProps {
    resultHandle: IHandleModel<ISmartGateSearchResult>;
}

@observer
class SmartGateSearchResultPanel extends React.Component<ISmartGateSearchResultPanelProps, any> {
    private _onDismiss = () => {
        this.props.resultHandle.clearValue();
    }
    render() {
        return (
            <Panel isOpen={this.props.resultHandle.value ? true : false}
                   headerText="Details"
                   isLightDismiss
                   onDismiss={this._onDismiss}
                   type={PanelType.large}>
                {this.props.resultHandle.value ? <SmartGateSearchResultCard searchResult={this.props.resultHandle.value} /> : undefined}
            </Panel>
        )
    }
}

export { SmartGateSearchResultPanel }
