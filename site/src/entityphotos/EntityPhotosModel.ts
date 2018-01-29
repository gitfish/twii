import { observable, action, computed } from "mobx";
import IMasterEntityHandleModel from "entity/IMasterEntityHandleModel";
import IActivityListModel from "common/IActivityListModel";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import IEntityPhoto from "entityphotos/IEntityPhoto";
import IGetLatestTravellerImagesByEntityIdRequest from "entityphotos/request/IGetLatestTravellerImagesByEntityIdRequest";
import IGetLatestTravellerImagesByEntityIdResponse from "entityphotos/response/IGetLatestTravellerImagesByEntityIdResponse";
import EntityPhotosServiceContext from "entityphotos/EntityPhotosServiceContext";

class EntityPhotosModel{
    @observable entityPhotos: IEntityPhoto[] = [];
    @observable sync: ISyncModel = new SyncModel();
    @observable showModal: boolean = false;
    @observable showNav: boolean = true;
    @observable showBullets: boolean = false; 
    @observable showIndex: boolean = false;
    @observable showFullscreenButton: boolean = false;
    @observable showGalleryFullscreenButton: boolean = false;
    @observable showGalleryPlayButton: boolean = false;
    @observable showPlayButton: boolean = false;
    @observable thumbnailPosition: String = 'bottom';
    @observable showThumbnails: boolean = false;

    @action loadEntityPhotos = (getLatestTravellerImagesByEntityIdRequest: IGetLatestTravellerImagesByEntityIdRequest) : Promise<any> => {
        const syncId = this._calcSyncId(getLatestTravellerImagesByEntityIdRequest.mstEntyID);
        this.sync.syncStart({id: syncId});
        return EntityPhotosServiceContext.value.getLatestTravellerImagesByEntityId(getLatestTravellerImagesByEntityIdRequest)
        .then((entityPhotosRespData) => {

            this.entityPhotos = entityPhotosRespData;
            this.sync.syncEnd();
        })
        .catch((error) => {
            this.entityPhotos = [];
            this.sync.syncError(error);
        })
    }

    @action
    setShowModal(showModal: boolean) {
        this.showModal = showModal;
    }

    protected _calcSyncId(IATTravellerId: any) : string {
        return String(IATTravellerId);
    }
}

export { EntityPhotosModel as default, EntityPhotosModel }