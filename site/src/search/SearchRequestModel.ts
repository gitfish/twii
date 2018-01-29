import ISearchRequestModel from "./ISearchRequestModel";
import { observable, action } from "mobx";

class SearchRequestModel implements ISearchRequestModel {
    @observable text : string;

    @action
    setText(text : string) : void {
        this.text = text;
    }
}

export { SearchRequestModel as default, SearchRequestModel }