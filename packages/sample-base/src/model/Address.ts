import { observable, action, computed } from "mobx";

class Address {
    @observable line1 : string;
    @observable line2 : string;
    @observable suburb : string;
    @observable state : string;
    @observable postcode : string;
}

export { Address }