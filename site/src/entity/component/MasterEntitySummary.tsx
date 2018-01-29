import * as React from "react";
import { observer } from "mobx-react";
import { FocusZone } from "office-ui-fabric-react/lib/FocusZone";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import IMasterEntityModel from "../IMasterEntityModel";
import IMasterEntityHandleModel from "../IMasterEntityHandleModel";
import DefinitionList from "common/component/DefinitionList";
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import MasterEntityNISName from "./MasterEntityNISName";
import MasterEntitySourceEntityName from "./MasterEntitySourceEntityName";
import IMasterEntitySourceEntityName from "../IMasterEntitySourceEntityName";
import IMasterEntitySourceEntityAddress from "../IMasterEntitySourceEntityAddress";
import IMasterEntitySourceEntityCredential from "../IMasterEntitySourceEntityCredential";
import EntityAttributes from "./EntityAttributes";
import MasterEntitySourceContainer from "./MasterEntitySourceContainer";
import ImageGalleryContainer from "entityphotos/component/ImageGalleryContainer";
import {EntityPhotosStore} from "entityphotos/EntityPhotosStore";
import EntityPhotos from "entityphotos/component/EntityPhotos";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import "./MasterEntitySummary.scss";

interface IMasterEntityProps {
    masterEntity: IMasterEntityModel;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

class MasterEntityPersonTitle extends React.Component<IMasterEntityProps, any> {
    render() {
        return (
            <div className="master-entity-title master-entity-person-title">
                <MasterEntityNISName masterEntity={this.props.masterEntity} />
            </div>
        );
    }
}

class MasterEntityOrgTitle extends React.Component<IMasterEntityProps, any> {
    render() {
        return (
            <div className="master-entity-title master-entity-org-title">
                <MasterEntitySourceEntityName name={this.props.masterEntity.name} />
            </div>
        );
    }
}

@observer
class MasterEntityTitle extends React.Component<IMasterEntityProps, any> {
    render() {
        let title;
        if(this.props.masterEntity.isPerson) {
            title = <MasterEntityPersonTitle masterEntity={this.props.masterEntity} />;
        } else if(this.props.masterEntity.isOrganisation) {
            title = <MasterEntityOrgTitle masterEntity={this.props.masterEntity} />;
        } else {
            title = <MasterEntitySourceEntityName className="master-entity-title" name={this.props.masterEntity.name} />;
        }
        return title;
    }
}

@observer
class MasterEntitySubtitle extends React.Component<IMasterEntityProps, any> {
    render() {
        return (
            <div className="master-entity-subtitle">
                <EntityAttributes entity={this.props.masterEntity} onSearch={this.props.onSearch} />
            </div>
        );
    }
}

class MasterEntityPhotos extends React.Component<IMasterEntityProps, any> {
    render() {
        return <EntityPhotos model={EntityPhotosStore} />
    }
}

class MasterEntityPreview extends React.Component<IMasterEntityProps, any> {
    render() {
        return (
            <div className="master-entity-preview">
                {/*
                <MasterEntityPhotos masterEntity={this.props.masterEntity} />
                */}
            </div>

        );
    }
}

class MasterEntitySummary extends React.Component<IMasterEntityProps, any> {
    render() {
        return (
            <div className="master-entity-summary">
                <MasterEntityTitle {...this.props} />
                <MasterEntitySubtitle {...this.props} />
            </div>
        );
    }
}

export {
    MasterEntitySummary as default,
    MasterEntitySummary,
    IMasterEntityProps,
    MasterEntityPersonTitle,
    MasterEntityOrgTitle
};