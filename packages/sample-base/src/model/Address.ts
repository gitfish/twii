import { observable, action, computed } from "mobx";

class Address {
    @observable line1 : string;
    @observable line2 : string;
    @observable suburb : string;
    @observable state : string;
    @observable postcode : string;

    @action
    clear() {
        this.line1 = undefined;
        this.line2 = undefined;
        this.suburb = undefined;
        this.state = undefined;
        this.postcode = undefined;
    }
}

export { Address }