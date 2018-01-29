import * as React from 'react';
import { observer } from "mobx-react";
import {EntityPhotosModel} from "entityphotos/EntityPhotosModel";
import {EntityPhotosStore} from "entityphotos/EntityPhotosStore";
import IGetLatestTravellerImagesByEntityIdRequest from "entityphotos/request/IGetLatestTravellerImagesByEntityIdRequest";
import EntityPhotosContainer from "entityphotos/component/EntityPhotosContainer";

interface EntityPhotosProps {
    model?: EntityPhotosModel;
}


class EntityPhotos extends React.Component<EntityPhotosProps, any> {
    request: IGetLatestTravellerImagesByEntityIdRequest = {};

    componentWillMount() {
        EntityPhotosStore.loadEntityPhotos(this.request);
    }

    render() {
        return (
            <EntityPhotosContainer model={this.props.model} />
        );
    }

}

export { EntityPhotos as default, EntityPhotos }