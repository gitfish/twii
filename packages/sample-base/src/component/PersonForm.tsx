import * as React from "react";
import { Person } from "../model/Person";
import { BoundTextField } from "@twii/common/lib/component/BoundTextField";
import { BoundDropdown } from "@twii/common/lib/component/BoundDropdown";
import { BoundMomentField } from "@twii/common/lib/component/BoundMomentField";
import { AddressForm } from "./AddressForm";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { SampleHostAppView } from "./SampleHostAppView";

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

class PersonFormSamples extends React.Component<IPersonFormProps, any> {
    render() {
        return (
            <div className="person-form-samples" style={{ padding: 8 }}>
                <h2>Person Form Samples</h2>
                <PersonForm person={this.props.person} />
                <hr/>
                <PersonForm person={this.props.person} />
            </div>
        )
    }
}

class PersonFormSamplesApp extends React.Component<IAppProps, any> {
    get person() : Person {
        return this.props.host.getState("person", () => { return new Person() });
    }
    private _onClickClear = () => {
        this.person.clear();
    }
    componentWillMount() {
        this.props.host.setTitle("Person Form Samples");
    }
    render() {
        return (
            <SampleHostAppView {...this.props}>
                <PersonFormSamples person={this.person} />
            </SampleHostAppView>
        );
    }
}

export { IPersonFormProps, PersonForm, PersonFormSamples, PersonFormSamplesApp }