import * as React from "react";
import { Button, Checkbox, Form, CheckboxProps } from "semantic-ui-react";
import { next } from "@twii/core/lib/Id";
import Template from "./Template";

const FormSample = (props : any) => {
    console.log("-- Func exec");
    const firstNameIdRef = React.useRef<string>(next("firstName"));
    const lastNameIdRef = React.useRef<string>(next("lastName"));

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [agree, setAgree] = React.useState(false);
    
    const onFirstNameChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const onLastNameChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const onAgreeChange = (event, data : CheckboxProps) => {
        console.log("-- Checked: " + data.checked);
        setAgree(data.checked);
    };

    return (
        <Template {...props}>
            <Form>
                <Form.Field>
                    <label htmlFor={firstNameIdRef.current}>First Name</label>
                    <input id={firstNameIdRef.current} value={firstName || ""} placeholder='First Name' onChange={onFirstNameChange} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor={lastNameIdRef.current}>Last Name</label>
                    <input id={lastNameIdRef.current} value={lastName || ""} placeholder='Last Name' onChange={onLastNameChange} />
                </Form.Field>
                <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' checked={agree} onChange={onAgreeChange} />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Template>
    )
};

export {
    FormSample,
    FormSample as default
}