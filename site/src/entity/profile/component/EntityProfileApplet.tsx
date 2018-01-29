import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import IAppProps from "app/component/IAppProps";
import EntityProfileList from "./EntityProfileList";
import EntityProfileListModel from "../EntityProfileListModel";
import * as EntityNameUtils from "entity/EntityNameUtils";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntityProfileApplet.scss";

class EntityProfileApplet extends React.Component<IAppProps, any> {
    private _titleUpdateDisposer : IReactionDisposer;
    componentWillMount() {
        this.props.host.setTitle("Clipboard");
        this._titleUpdateDisposer = autorun(this._updateTitle);
    }
    componentWillUnmount() {
        if(this._titleUpdateDisposer) {
            this._titleUpdateDisposer();
        }
    }
    private _updateTitle = () => {
        const entityProfileList = this.entityProfileList;
        if(entityProfileList && entityProfileList.profiles.length > 0) {
            const titles = entityProfileList.profiles.map(item => {
                return EntityNameUtils.toNISFormat(item.entity);
            });
            this.props.host.setTitle(`Clipboard - ${titles.join(",")}`);
        } else {
            this.props.host.setTitle("Clipboard");
        }
    }
    get entityProfileList() : EntityProfileListModel {
        const host = this.props.host;
        let r = host.state.entityProfileList;
        if(!r) {
            r = new EntityProfileListModel();
            host.setState({ entityProfileList: r });
        }
        return r;
    }
    render() {
        return (
            <AppHostWrapper title="Clipboard" host={this.props.host} className="entity-profile-applet">
                <EntityProfileList profileList={this.entityProfileList} />
            </AppHostWrapper>
        );
    }
}

export { EntityProfileApplet as default, EntityProfileApplet }