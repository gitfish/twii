import { observable, action } from "mobx";
import * as moment from "moment";
import { Address } from "./Address";

class Person {
    @observable firstName : string;
    @observable middleName : string;
    @observable lastName : string;
    @observable dob : moment.Moment;
    @observable address : Address = new Address();

    @action
    clear() {
        this.firstName = undefined;
        this.middleName = undefined;
        this.lastName = undefined;
        this.dob = undefined;
        this.address.clear();
    }
}

export { Person }