import * as React from "react";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";
import { Slider } from "@blueprintjs/core/lib/esm/components/slider/slider";
import { RangeSlider } from "@blueprintjs/core/lib/esm/components/slider/rangeSlider";

class SliderSample extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 16 }}>
                <Slider />
            </div>
        );
    }
}

class RangeSliderSample extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 16 }}>
                <RangeSlider value={[3, 8]} />
            </div>
        );
    }
}

class SliderSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Slider Samples");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <SliderSample />
                <RangeSliderSample />
            </SampleHostAppView>
        );
    }
}

export { SliderSampleApp }