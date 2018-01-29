import * as React from "react";
import { observer } from "mobx-react";
import { Image } from "office-ui-fabric-react/lib/Image";
import 'office-ui-fabric-react/lib/components/Modal/examples/Modal.Basic.Example.scss'
import IEntityPhoto from "entityphotos/IEntityPhoto";
import './EntityPhoto.scss';

interface EntityPhotoProps {
    image: IEntityPhoto;
}

@observer
class EntityPhoto extends React.Component<EntityPhotoProps, any>{

    renderLatestPhotoMetadata(photo) {
        //console.log("In EntityPhoto: within renderLatestPhotoMetadata(photo): photo.ImageMetadata.imageType: " + photo.ImageMetadata.imageType);
        //alert("In EntityPhoto: within renderLatestPhotoMetadata(photo): photo.ImageMetadata.imageType: " + photo.ImageMetadata.imageType);
        return (
            <div className="meta-data-each">
                <table className="meta-data-each-table">
                    <tr>
                        <td>Master Entity ID: </td>
                        <td>{ photo.ImageMetadata.mstEntyID }</td> 
                    </tr>
                     <tr>
                        <td>Travel Doc Id: </td>
                        <td>{ photo.ImageMetadata.travelDocId }</td> 
                    </tr>
                     <tr>
                        <td>TD Issue Country Code: </td>
                        <td>{ photo.ImageMetadata.tdIssueCntryCode }</td> 
                    </tr>
                     <tr>
                        <td>TD Expiry Date: </td>
                        <td>{ photo.ImageMetadata.tdExpiryDate }</td> 
                    </tr>
                     <tr>
                        <td>Birth Date: </td>
                        <td>{ photo.ImageMetadata.birthDate }</td> 
                    </tr>
                     <tr>
                        <td>Traveller ID: </td>
                        <td>{ photo.ImageMetadata.travellerId }</td> 
                    </tr>
                     <tr>
                        <td>Created DateTime: </td>
                        <td>{ photo.ImageMetadata.createdDateTime }</td> 
                    </tr>
                     <tr>
                        <td>Photo Metadata ID: </td>
                        <td>{ photo.ImageMetadata.photoMetadataId }</td> 
                    </tr>
                     <tr>
                        <td>Image Type: </td>
                        <td>{ photo.ImageMetadata.imageType }</td> 
                    </tr>
                     <tr>
                        <td>Encoding: </td>
                        <td>{ photo.ImageMetadata.encoding }</td> 
                    </tr>
                     <tr>
                        <td>Match Percentage: </td>
                        <td>{ photo.ImageMetadata.matchPercentage }</td> 
                    </tr>
                     <tr>
                        <td>Image Source: </td>
                        <td>{ photo.ImageMetadata.imageSource }</td> 
                    </tr>
                </table>
                
            </div>
        );
    }

    render () {

        return (
            <div className="entity-photo-each">
                {this.renderLatestPhotoMetadata(this.props.image)}
            </div>
        );
    }

}

export { EntityPhoto as default, EntityPhoto }