import { observable, action, computed } from "mobx";
import { IListingModel } from "./IListingModel";
import { IListingReview } from "../IListingReview";
import { IListingReviewModel } from "./IListingReviewModel";
import { IUserProfile } from "../../user/IUserProfile";
import { ListingServiceContext } from "../service/ListingServiceContext";
import { Sync } from "@twii/common/lib/model/Sync";

class ListingReviewModel implements IListingReviewModel {
    @observable sync = new Sync();
    @observable listingRef : IListingModel;
    @observable id : number;
    @observable author : IUserProfile;
    @observable rate : number = null;
    @observable text : string;
    @observable edited_date : string;
    @observable created_date : string;

    constructor(listingRef : IListingModel) {
        this.setListingRef(listingRef);
    }
    
    @action
    setListingRef(listingRef : IListingModel) {
        this.listingRef = listingRef;
    }

    @action
    setRate(rate : number) {
        this.rate = rate;
    }

    @action
    setText(text : string) {
        this.text = text;
    }

    @computed
    get data() : IListingReview {
        return {
            id: this.id,
            rate: this.rate,
            text: this.text,
            listing: this.listingRef ? this.listingRef.id : undefined
        };
    }
    set data(value) {
        this.setData(value);
    }

    @action
    setData(data : IListingReview) {
        this.id = data ? data.id : undefined;
        this.author = data ? data.author : undefined;
        this.rate = data ? data.rate : undefined;
        this.text = data ? data.text : undefined;
        this.edited_date = data ? data.edited_date : undefined;
        this.created_date = data ? data.created_date : undefined;
    }

    private _onSaveDone = (data : IListingReview) => {
        this.setData(data);
        this.sync.syncEnd();
    }

    private _onSaveError = (error : any) => {
        this.sync.syncError(error);
    }

    @action
    save() : Promise<any> {
        // TODO: validate
        this.sync.syncStart();
        return ListingServiceContext.value.saveListingReview(this.data).then(this._onSaveDone).catch(this._onSaveError);
    }
}

export { ListingReviewModel as default, ListingReviewModel }
