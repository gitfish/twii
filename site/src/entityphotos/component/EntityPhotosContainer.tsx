import * as React from 'react';
import { observer } from 'mobx-react';
import {
    DetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import Error from "common/component/Error";
import { Details } from "common/component/Details";
import ViewPreferencesModel from 'common/ViewPreferencesModel';
import * as Icons from "icon/AnalystDesktopIcons";
import EntityPhotosModel from 'entityphotos/EntityPhotosModel';
import EntityPhotoColumns from 'entityphotos/component/EntityPhotoColumns';
import ImageGalleryContainer from "entityphotos/component/ImageGalleryContainer";
import './EntityPhotosContainer.scss';

interface EntityPhotosProps {
    model?: EntityPhotosModel;
    showModal?: boolean;
    showNav?: boolean;
    showBullets?: boolean;
    showIndex?: boolean;
    showFullscreenButton?: boolean;
    showGalleryFullscreenButton?: boolean;
    showGalleryPlayButton?: boolean;
    showPlayButton?: boolean;
    thumbnailPosition?: String;
    showThumbnails?: boolean;
    
}

const EntityPhotosViewPrefsStore = new ViewPreferencesModel('EntityPhotos');

@observer
class EntityPhotosLoadHandler extends React.Component<EntityPhotosProps, any> {
    render() {
        let content;
        let cols = [];
        if(this.props.model.sync.syncing) {
            content = <Spinner label="Loading ..." className="load-spinner"/>;
        } else if(this.props.model.sync.error) {
            content = <Error error={this.props.model.sync.error} />
        } else if(this.props.model.sync.hasSynced) {
            cols = EntityPhotoColumns.filter((column: any) => EntityPhotosViewPrefsStore.isFieldVisible(column.key));
            content = <ImageGalleryContainer images={this.props.model.entityPhotos} 
            showModal={this.props.model.showModal} 
            showNav={this.props.model.showNav} 
            showBullets={this.props.model.showBullets} 
            showIndex={this.props.model.showIndex} 
            showFullscreenButton={this.props.model.showFullscreenButton} 
            showGalleryFullscreenButton={this.props.model.showGalleryFullscreenButton} 
            showGalleryPlayButton={this.props.model.showGalleryPlayButton} 
            showPlayButton={this.props.model.showPlayButton} 
            thumbnailPosition={this.props.model.thumbnailPosition} 
            showThumbnails={this.props.model.showThumbnails} 
            />
        }
        return (
            <div className="ms-Grid entity-photos-load-handler-section">
                {content}
            </div>
        );
    }
}

@observer
class EntityPhotosContainer extends React.Component<EntityPhotosProps, any> {
      render() {
        return (
            <div className="entity-photos-container">
                <div className="entity-photos-load-handler">
                    <EntityPhotosLoadHandler model={this.props.model} />
                </div>
            </div>
        );
    }
}

export {EntityPhotosContainer as default, EntityPhotosContainer}