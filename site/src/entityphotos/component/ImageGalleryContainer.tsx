import * as React from 'react';
import { observer } from "mobx-react";
import ImageGallery from 'react-image-gallery';
import { Image } from "office-ui-fabric-react/lib/Image";
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
//import './Modal.Basic.Example.scss';
import 'office-ui-fabric-react/lib/components/Modal/examples/Modal.Basic.Example.scss'
import "./ImageGalleryContainer.scss";
import IEntityPhoto from "entityphotos/IEntityPhoto";
import LatestPhotosController from "entityphotos/component/LatestPhotosController";
import EntityPhotosStore from "entityphotos/EntityPhotosStore";


interface ImageGalleryContainerTestProps {
    images?: IEntityPhoto[];
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

@observer
class ImageGalleryContainer extends React.Component<ImageGalleryContainerTestProps, any> {
     constructor(props) {
      super(props);
    }
    
  _onImageClick(event) {
    //console.debug('clicked on image', event.target, 'at index', this.props.images[0].ImageMetadata.travelDocId);
    this._showModal.bind(this);
    alert("In ImageGalleryContainer: you clicked on _onImageClick()");
  }

  _onImageLoad(event) {
    console.log("In ImageGalleryContainer: Triggered on _onImageLoad()");
  }

  private _showModal() {
    EntityPhotosStore.setShowModal(true);
  }

  private _closeModal() {
    EntityPhotosStore.setShowModal(false);
  }

 
  render() {
    const images = this.props.images.map(function (image) {
      return {
        original: image.Base64ImageData,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: image.ImageMetadata.imageType

        };
    });

    return (
      <div className="entity-photos-image-gallery">
        <ImageGallery
          items={images} 
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad.bind(this)}
          showBullets={this.props.showBullets}
          showIndex={this.props.showIndex}
          showNav={this.props.showNav}
          showFullscreenButton={this.props.showFullscreenButton && this.props.showGalleryFullscreenButton}
          showPlayButton={this.props.showPlayButton && this.props.showGalleryPlayButton}
        />
        <div className="view-photos"> 
          <DefaultButton className="view-photos-button"
            description='View Photos'
            onClick={ this._showModal.bind(this) }
            text='View Photos'
          />
          <Modal
            isOpen={ this.props.showModal }
            onDismiss={ this._closeModal.bind(this) }
            isBlocking={ false }
            containerClassName='ms-modalExample-container'
          >
            <LatestPhotosController  images={this.props.images} showModal={this.props.showModal} />
          </Modal>
        </div>
      </div>
    );
  }

}

export { ImageGalleryContainer as default, ImageGalleryContainer };