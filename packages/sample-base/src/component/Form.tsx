import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { IAppProps } from "@twii/common/lib/component/IAppProps";

class TextFieldSamples extends React.Component<any, any> {
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
            <div className="text-field-samples">
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

class FormSamples extends React.Component<any, any> {
    render() {
        return (
            <div className="form-samples" style={{ padding: 8 }}>
                <h2>Text Field Samples</h2>
                <TextFieldSamples />
            </div>
        );
    }
}

class FormSamplesApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Form Samples");
    }
    render() {
        return <FormSamples />
    }
}

export { FormSamples, TextFieldSamples, FormSamplesApp }