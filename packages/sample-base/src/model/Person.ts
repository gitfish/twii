import { observable, action } from "mobx";
import * as moment from "moment";
import { Address } from "./Address";

class Person {
    @observable firstName : string;
    @observable middleName : string;
    @observable lastName : string;
    @observable dob : moment.Moment;
    @observable address : Address = new Address();
}

export { Person }