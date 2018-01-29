import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { AppWrapper } from "@navish/ui-core/lib/app/component/AppWrapper";

class TextFieldExamples extends React.Component<any, any> {
    private _onRenderPrefix = () => {
        return <div><Icon iconName="Contact" /><strong>Custom Prefix</strong></div>;
    }
    private _onRenderSuffix = () => {
        return <div><Icon iconName="Cat" /><strong>Custom Suffix</strong></div>;
    }
    private _onGetErrorMessage = (value : string) => {
        return value && value.indexOf("c") >= 0 ? "We don't like c around here" : undefined;
    }
    render() {
        return (
            <div className="text-field-examples">
                <TextField label="Default Text Field" />

                <TextField label="Disabled Text Field" disabled={true} />

                <TextField label="With Description" description="Here's the description" />

                <TextField label="With Error Message" errorMessage="Sample Error Message" />

                <TextField label="With Custom Validator" onGetErrorMessage={this._onGetErrorMessage} />

                <TextField label="Text Field with Icon" iconProps={{ iconName: "Calendar" }} />

                <TextField label="Text Field with a Prefix" prefix="http://" />

                <TextField label="Text Field with custom rendered Prefix" onRenderPrefix={this._onRenderPrefix} />

                <TextField label="Text Field with a Suffix" suffix=".com.au" />

                <TextField label="Text Field with custom rendered Suffix" onRenderSuffix={this._onRenderSuffix} />
            </div>
        );
    }
}

class FormExamples extends React.Component<any, any> {
    render() {
        return (
            <div className="form-examples" style={{ padding: 8 }}>
                <div className="form-example-section">
                    <h2>Text Field Examples</h2>
                    <TextFieldExamples />
                </div>
            </div>
        );
    }
}

class FormExamplesApplet extends React.Component<any, any> {
    render() {
        const farItems = [
            { path: "/user/profile/menuItem"}
        ];
        return (
            <AppWrapper title="Form Examples" farItems={farItems}>
                <FormExamples />
            </AppWrapper>
        );
    }
}

export { FormExamplesApplet, FormExamples, TextFieldExamples }