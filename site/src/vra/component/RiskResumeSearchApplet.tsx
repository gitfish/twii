import * as React from "react";
import { observer } from "mobx-react";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import IAppHost from "app/IAppHost";
import IAppProps from "app/component/IAppProps";
import DefinitionList from "common/component/DefinitionList";
import SystemIdTypeRefList from "common/ref/SystemIdTypeRefList";
import IRiskResumeSearchRequestModel from "../IRiskResumeSearchRequestModel";
import RiskResumeSearchRequestModel from "../RiskResumeSearchRequestModel";
import IRiskResumeSearchRequest from "../IRiskResumeSearchRequest";
import RiskResumeSearchContainer from "./RiskResumeSearchContainer";
import RiskResumeSearchHistoryStore from "../RiskResumeSearchHistoryStore";
import IRiskResumeSearchHistoryEntry from "../IRiskResumeSearchHistoryEntry";
import * as RiskResumeActions from "../RiskResumeActions";
import "./RiskResumeSearchApplet.scss";

interface IRiskResumeSearchHistoryEntryButtonProps {
    host: IAppHost;
    entry: IRiskResumeSearchHistoryEntry;
}

class RiskResumeSearchHistoryEntryButton extends React.Component<IRiskResumeSearchHistoryEntryButtonProps, any> {
    private _onClick = () => {
        RiskResumeActions.submitSearchRequest(this.props.host, this.props.entry.request);
    };
    render() {
        let idTypeRefItem = SystemIdTypeRefList.getItemByKey(this.props.entry.request.idType);
        let idTypeText = idTypeRefItem ? idTypeRefItem.text : "";
        return (
            <div role="button" data-is-focusable={true} className="risk-resume-search-history-item-button" onClick={this._onClick}>
                <div className="risk-resume-search-request-summary" aria-label="Risk Resume Search Request Summary">
                    <DefinitionList inline={true} name={idTypeText}>{this.props.entry.request.id}</DefinitionList>
                </div>
            </div>
        );
    }
}

@observer
class RiskResumeSearchCommandBar extends React.Component<IAppProps, any> {
    private _onRenderHistoryEntry = (item : any) => {
        return <RiskResumeSearchHistoryEntryButton key={item.key} entry={item.entry} host={this.props.host} />;
    };
    componentWillMount() {
        RiskResumeSearchHistoryStore.load();
    }
    render() {
        const menuHistoryItems : IContextualMenuItem[] = [];
        if(RiskResumeSearchHistoryStore.sync.syncing) {
            menuHistoryItems.push({
                key: "loading",
                name: "Loading..."
            });
        } else {
            if(RiskResumeSearchHistoryStore.items.length > 0) {
                RiskResumeSearchHistoryStore.items.forEach((item, idx) => {
                    menuHistoryItems.push({
                        key: String(idx),
                        name: `Item ${idx}`,
                        entry: item,
                        onRender: this._onRenderHistoryEntry
                    });
                });
            } else {
                menuHistoryItems.push({
                    key: "none",
                    name: "No Recent Searches available"
                });
            }
        }
        const items : IContextualMenuItem[] = [
            {
                key: "recentSearches",
                name: "Recent Searches",
                subMenuProps: {
                    className: "risk-resume-search-history-items",
                    items: menuHistoryItems
                }
            }
        ];
        return <CommandBar className="risk-resume-command-bar" items={items} />
    }
}

class RiskResumeSearchApplet extends React.Component<IAppProps, any> {
    get searchRequest() : IRiskResumeSearchRequestModel {
        const host = this.props.host;
        let r = host.state.riskResumeSearchRequest;
        if(!r) {
            r = new RiskResumeSearchRequestModel();
            host.setState({ riskResumeSearchRequest: r });
        }
        return r;
    }
    private _onSubmitRequest = (request: IRiskResumeSearchRequest) => {
        RiskResumeActions.submitSearchRequest(this.props.host, request);
    };
    componentDidMount() {
        this.props.host.title = "Risk Resume Search";
    }
    render() {
        return (
            <div className="risk-resume-search-applet">
                <RiskResumeSearchCommandBar {...this.props} />
                <RiskResumeSearchContainer  searchRequest={this.searchRequest} onSubmit={this._onSubmitRequest} />
            </div>
        );
    }
}

export { RiskResumeSearchApplet as default, RiskResumeSearchApplet }