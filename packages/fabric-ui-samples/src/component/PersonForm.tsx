import * as React from "react";
import { Person } from "../model/Person";
import { BoundTextField } from "@twii/fabric-ui/lib/component/BoundTextField";
import { BoundDropdown } from "@twii/fabric-ui/lib/component/BoundDropdown";
import { BoundMomentField } from "@twii/fabric-ui/lib/component/BoundMomentField";
import { BoundCheckbox } from "@twii/fabric-ui/lib/component/BoundCheckbox";
import { AddressForm } from "./AddressForm";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

interface IPersonFormProps {
    person: Person;
}

class PersonForm extends React.Component<IPersonFormProps, any> {
    render() {
        return (
            <div className="person-form" style={{ padding: 8 }}>
                <BoundTextField label="First Name" binding={{ target: this.props.person, key: "firstName" }} />
                <BoundTextField label="Middle Name" binding={{ target: this.props.person, key: "middleName" }} />
                <BoundTextField label="Last Name" binding={{ target: this.props.person, key: "lastName" }} />
                <BoundMomentField label="Date of Birth" binding={{ target: this.props.person, key: "dob" }} />
                <BoundCheckbox label="Opt In" binding={{ target: this.props.person, key: "optIn" }} styles={{ root: { marginTop: 8 } }} />
                <AddressForm address={this.props.person.address} />
            </div>
        );
    }
}

class PersonFormSamples extends React.Component<any, any> {
    private _person = new Person();
    render() {
        return (
            <div className="person-form-samples" style={{ padding: 8 }}>
                <h2>Person Form Samples</h2>
                <PersonForm person={this._person} />
                <hr/>
                <PersonForm person={this._person} />
            </div>
        )
    }
}

export { IPersonFormProps, PersonForm, PersonFormSamples, PersonFormSamples as default }