import * as React from "react";
import { TextField, TextFieldIcon, TextFieldHelperText } from "rmwc/TextField";
import { Select } from "rmwc/Select";
import { Slider } from "rmwc/Slider";
import { Switch } from "rmwc/Switch";
import { Checkbox } from "rmwc/Checkbox";

class TextFieldSamples extends React.Component<any, any> {
    render() {
        return (
            <div>
                {/* Standard text field. */}
                <TextField label="Write something..." />
                
                {/* Help text can be added to appear on focus. Place it directly after TextField. */}
                <TextFieldHelperText>Optional help text.</TextFieldHelperText>
                
                {/* Leading and trailing icons can be used, they look the best with the box prop. You can pass anything the Icon component accepts. */}
                <TextField box withLeadingIcon="search" label="Write something..." />
                
                {/* If you need full control over the icon, you can pass TextFieldIcon in and add your own props. */}
                <TextField box withTrailingIcon={<TextFieldIcon use="close"/>} label="Write something..." />
                
                {/* An outlined TextField */}
                <TextField outlined label="Write something..." />
                
                {/* A fullWidth input. */}
                <TextField fullwidth placeholder="Full Width..."/>
                
                {/* You can make the TextField a textarea. */}
                <TextField textarea fullwidth label="Multiline..." rows="8" />
                
                {/* You can optionally make HelperText always visible with the persistent prop. */}
                <TextFieldHelperText persistent validationMsg>The field is required.</TextFieldHelperText>
                
                {/* Disabled text field. */}
                <TextField disabled label="Disabled..." />  
            </div>
        );
    }
}

interface ISelectSamplesState {
    value?: string;
}

class SelectSamples extends React.Component<any, ISelectSamplesState> {
    constructor(props : any) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Select
                  value={this.state.value}
                  onChange={evt => this.setState({value: evt.target.value})}
                  label="Array"
                  options={[
                    {
                      label: 'Cookies',
                      value: '1'
                    },
                    {
                      label: 'Pizza',
                      value: '2',
                
                      /** Any additional items will be passed to the
                       child ListItem as props */
                
                      'aria-disabled': true,
                      'tabIndex': -1
                    },
                    {
                      label: 'Icecream',
                      value: '3'
                    }
                  ]}
                />
                
                {/*  A simple value => label map */}
                <Select
                  label="Object map"
                  options={{'1': 'Cookies', '2': 'Pizza', '3': 'Icecream'}}
                />
                
                {/* a simple array of options with box styling, value will be the same as label */}
                <Select
                  box
                  label="Simple Array"
                  placeholder="-- Select One --"
                  options={['Cookies', 'Pizza', 'Icecream']}
                />
            </div>
        );
    }
}

interface ISliderSamplesState {
    sliderValue?: number;
    sliderValue2?: number;
}

class SliderSamples extends React.Component<any, ISliderSamplesState> {
    constructor(props : any) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {/* Uncontrolled Slider */}
                <Slider
                  onInput={evt => console.log(evt)}
                  onChange={evt => console.log(evt)}
                />
                
                {/* Controlled Slider */}
                {/* onInput is required and will fire continuously. onChange is optional. */}
                <Slider
                  value={this.state.sliderValue === undefined ? 50 : this.state.sliderValue}
                  onChange={evt => this.setState({sliderValue: evt.detail.value})}
                  onInput={evt => this.setState({sliderValue: evt.detail.value})}
                  discrete
                  step={1}
                />
                
                {/* Controlled Slider with Markers */}
                <Slider
                  value={this.state.sliderValue2 === undefined ? 150 : this.state.sliderValue2}
                  onChange={evt => this.setState({sliderValue2: evt.detail.value})}
                  onInput={evt => this.setState({sliderValue2: evt.detail.value})}
                  discrete
                  displayMarkers
                  min={100}
                  max={200}
                  step={5}
                />
            </div>
        );
    }
}

interface ISwitchSamplesState {
    cookiesChecked?: boolean;
}

class SwitchSamples extends React.Component<any, ISwitchSamplesState> {
    constructor(props : any) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {/* Controlled with change handler */}
                <Switch
                  checked={this.state.cookiesChecked}
                  onChange={evt => this.setState({cookiesChecked: evt.target.checked})}>
                  Cookies
                </Switch>
                
                {/* Standard Switch */}
                <Switch>Pizza</Switch>
                
                {/* Using the label prop */}
                <Switch label="Icecream" />
            </div>  
        );
    }
}

interface ICheckboxSamplesState {
    cookiesChecked?: boolean;
}

class CheckboxSamples extends React.Component<any, ICheckboxSamplesState> {
    constructor(props : any) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {/* Controlled with change handlers */}
                <Checkbox
                  checked={this.state.cookiesChecked || false}
                  onChange={evt => this.setState({cookiesChecked: evt.target.checked})}>
                  Cookies
                </Checkbox>
                
                {/* Standard Checkbox */}
                <Checkbox>Pizza</Checkbox>
                
                {/* Using the label prop */}
                <Checkbox label="Icecream" />
                
                {/* Making a "half" checked, indeterminate Checkbox */}
                <Checkbox indeterminate={true}>Broccoli</Checkbox>
            </div>
        );
    }
}

class FormSamples extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <h2>Text Field Samples</h2>
                <div style={{ padding: 8 }}>
                    <TextFieldSamples />
                </div>
                <h2>Select Samples</h2>
                <div style={{ padding: 8 }}>
                    <SelectSamples />
                </div>
                <h2>Slider Samples</h2>
                <div style={{ padding: 8 }}>
                    <SliderSamples />
                </div>
                <h2>Switch Samples</h2>
                <div style={{ padding: 8 }}>
                    <SwitchSamples />
                </div>
                <h2>Checkbox Samples</h2>
                <div style={{ padding: 8 }}>
                    <CheckboxSamples />
                </div>
            </div>
        );
    }
}

export { FormSamples, FormSamples as default }