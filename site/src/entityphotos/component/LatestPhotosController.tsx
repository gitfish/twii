import * as React from "react";
import { observable } from 'mobx';
import { observer } from "mobx-react";
import { Image } from "office-ui-fabric-react/lib/Image";
import { IconButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import 'office-ui-fabric-react/lib/components/Modal/examples/Modal.Basic.Example.scss'
import './LatestPhotosController.scss';
import IEntityPhoto from "entityphotos/IEntityPhoto";
import EntityPhoto from "entityphotos/component/EntityPhoto";
import EntityPhotosStore from "entityphotos/EntityPhotosStore";

interface LatestPhotosControllerProps {
    images: IEntityPhoto[];
    showModal?: boolean;
}

@observer
class LatestPhotosController extends React.Component<LatestPhotosControllerProps, any>{

    constructor(props) {
      super(props);
    }

    _onImageClick(event) {
        console.log('clicked on image: event.target: ', event.target.src);
        alert('clicked on image: event.target');
    }

    _onModalHeaderClick(event) {
        console.log('clicked on image: event.target: ', event.target);
        EntityPhotosStore.setShowModal(false);
    }

    renderLatestPhotos() {
        return this.props.images.map((image) => {
            return (
                <div className="image-each-wrapper">
                    <Image src={String(image.Base64ImageData)} alt="photo_1" className="image-each" onClick={this._onImageClick.bind(this)} />
                    <EntityPhoto image={image} />
                </div>
            );
        });
    }

    renderButtonGroup() {
        let disabled = false;
        let checked = false;
        return (
            <div className="image-metadata-button-group">
                <div className="image-metadata-button-load-all-photos">
                    <PrimaryButton 
                        data-automation-id='load-all-photos'
                        disabled={ disabled }
                        checked={ checked }
                        text='Load all photos'
                        onClick={ () => alert('Clicked: Load all photos!') }
                    />
                </div >
                <div className="image-metadata-button-load-smartgate-photos">
                    <PrimaryButton 
                        data-automation-id='load-smartgate-photos'
                        disabled={ disabled }
                        checked={ checked }
                        text='Load Smartgate photos'
                        onClick={ () => alert('Clicked: Load Smartgate photos!') }
                    />
                </div>
                <div className="image-metadata-button-load-passport-photos">
                    <PrimaryButton 
                        data-automation-id='load-passport-photos'
                        disabled={ disabled }
                        checked={ checked }
                        text='Load Passport photos'
                        onClick={ () => alert('Clicked: Load Passport photos!') }
                    />
                </div>
            </div>

        );
    }

    render () {

        return (
            <div className="image-metadata-modal-controller" id="image-metadata-modal-controller">
                <div className='ms-modalExample-header' >
                    <span>Entity Photos</span>
                    <IconButton
                        className='ms-Panel-closeButton ms-PanelAction-close close-model-icon-button' 
                        onClick={ this._onModalHeaderClick.bind(this) }
                        ariaLabel="closeButtonAriaLabel" 
                        data-is-visible={ true }
                        iconProps={ { iconName: 'Cancel' } }
                    />
                </div>
                <div className='ms-modalExample-body'>
                    {this.renderLatestPhotos()}
                    {this.renderButtonGroup()}
                </div>
            </div>
        );
    }

}

export { LatestPhotosController as default, LatestPhotosController }