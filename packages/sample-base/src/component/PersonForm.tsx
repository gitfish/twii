import * as React from "react";
import { Person } from "../model/Person";
import { BoundTextField } from "@twii/common/lib/component/BoundTextField";
import { BoundDropdown } from "@twii/common/lib/component/BoundDropdown";
import { BoundMomentField } from "@twii/common/lib/component/BoundMomentField";
import { AddressForm } from "./AddressForm";
import { IAppProps } from "@twii/common/lib/component/IAppProps";

interface IPersonFormProps {
    person: Person;
}

class PersonForm extends React.Component<IPersonFormProps, any> {
    render() {
        return (
            <div className="person-form" style={{ padding: 8 }}>
                <BoundTextField label="First Name" bindTarget={this.props.person} bindKey="firstName" />
                <BoundTextField label="Middle Name" bindTarget={this.props.person} bindKey="middleName" />
                <BoundTextField label="Last Name" bindTarget={this.props.person} bindKey="lastName" />
                <BoundMomentField label="Date of Birth" bindTarget={this.props.person} bindKey="dob" />
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

class PersonFormSamplesApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Person Form");
    }
    render() {
        return <PersonFormSamples />
    }
}

export { IPersonFormProps, PersonForm, PersonFormSamples, PersonFormSamplesApp }