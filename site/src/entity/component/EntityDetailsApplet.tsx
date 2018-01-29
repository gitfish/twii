import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import IAppHost from "app/IAppHost";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import MasterEntityContainer from "./MasterEntityContainer";
import MasterEntityDashboard from "./MasterEntityDashboard";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import IMasterEntityModel from "../IMasterEntityModel";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { openNewSearch, loadSearch, loadSearchResult } from "../MasterEntitySearchActions";
import * as EntityNameUtils from "../EntityNameUtils";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntityDetailsApplet.scss";

@observer
class EntityDetailsCommandBar extends React.Component<IEntityAppletProps, any> {
    private _onBackToSearchResult = () => {
        loadSearchResult(this.props.host);
    }
    private _onBackToSearch = () => {
        loadSearch(this.props.host);
    }
    render() {
        const items : IContextualMenuItem[] = [];
        items.push({
            key: "backToSearch",
            name: "Search",
            title: "Back to Search",
            iconProps: {
                iconName: "Back"
            },
            onClick: this._onBackToSearch
        });
        if(this.props.host.state.entitySearchResult) {
            items.push({
                key: "backToSearchResults",
                name: "Search Results",
                title: "Back to Search Results",
                iconProps: {
                    iconName: "Back"
                },
                onClick: this._onBackToSearchResult
            });
        }
        return <CommandBar className="entity-details-command-bar" items={items} />;
    }
}

interface IEntityDetailsProps {
    entity: IMasterEntityModel;
    host: IAppHost;
}

class EntityDetails extends React.Component<IEntityDetailsProps, any> {
    private _onSearch = (request : IMasterEntitySearchRequest) => {
        openNewSearch(this.props.host, request);
    }
    componentWillMount() {
        this.props.host.setTitle(`Entity Details - ${EntityNameUtils.toNISFormat(this.props.entity)}`);
    }
    render() {
        return (
            <div className="master-entity-dashboard-container">
                <MasterEntityDashboard masterEntity={this.props.entity} host={this.props.host} onSearch={this._onSearch} />
            </div>
        );
    }
}

class EntityDetailsApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Entity Details");
    }
    private _onRenderEntity = (entity) => {
        return <EntityDetails entity={entity} host={this.props.host} />;
    }
    render() {
        return (
            <AppHostWrapper title="Entity Details" host={this.props.host} className="entity-details-applet">
                <EntityDetailsCommandBar {...this.props} />
                <MasterEntityContainer entityHandle={findByEntityId(this.props.entityId)} onRenderEntity={this._onRenderEntity} />
            </AppHostWrapper>
        );
    }
}

export { EntityDetailsApplet as default, EntityDetailsApplet }