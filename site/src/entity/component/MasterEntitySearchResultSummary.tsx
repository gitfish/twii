import * as React from "react";
import { observer } from "mobx-react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import IMasterEntitySearchResultModel from "../IMasterEntitySearchResultModel";
import IMasterEntitySearchResultItem from "../IMasterEntitySearchResultItem";
import { createItems as createRequestItems } from "./MasterEntitySearchRequestSummary";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import * as moment from "moment";
import { Output as DateOutputFormats } from "common/DateFormats";
import DefinitionList from "common/component/DefinitionList";
import { TooltipHost, TooltipDelay, DirectionalHint } from "office-ui-fabric-react/lib/Tooltip";
import "./MasterEntitySearchResultSummary.scss";

interface IMasterEntitySearchResultSummaryProps {
    searchResult: IMasterEntitySearchResultModel;
}

@observer
class MasterEntitySearchResultSummary extends React.Component<IMasterEntitySearchResultSummaryProps, any> {
    private _onRenderHasMoreRowsTooltip = () => {
        return <div>This search returned a large number of results. Only the first {this.props.searchResult.total} results are displayed.</div>;
    }
    render() {
        const sync = this.props.searchResult.sync;
        const request = this.props.searchResult.request;
        if(request && sync.startDate) {
            return (
                <div className="master-entity-search-result-summary">
                    {createRequestItems(this.props.searchResult.request)}
                    <DefinitionList inline={true} key="startDate" name="Start">
                        {DateUtils.dateToTimestampOutputText(sync.startDate)}
                    </DefinitionList>
                    {sync.endDate && (
                        <DefinitionList inline={true} key="endDate" name="End">
                            {DateUtils.dateToTimestampOutputText(sync.endDate)}
                        </DefinitionList>
                    )}
                    {this.props.searchResult.sync.endDate && (
                        <DefinitionList inline={true} key="duration" name="Duration">
                        {moment(this.props.searchResult.sync.endDate).diff(this.props.searchResult.sync.startDate)} ms
                        </DefinitionList>
                    )}
                    {this.props.searchResult.sync.endDate && (
                        <DefinitionList inline={true} key="total" name="Total Records">
                            {this.props.searchResult.items ? this.props.searchResult.items.length : 0}
                            {this.props.searchResult.hasMoreRows && (
                                <TooltipHost tooltipProps={ { onRenderContent: this._onRenderHasMoreRowsTooltip } }>
                                    <Icon iconName="AlertSolid" className="alert-icon" />
                                </TooltipHost>
                            )}
                        </DefinitionList>
                    )}
                </div>
            );
        }
        return null;
    }
}

export { MasterEntitySearchResultSummary as default, MasterEntitySearchResultSummary };