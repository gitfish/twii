import * as React from "react";
import { Slider } from "@blueprintjs/core/lib/esm/components/slider/slider";
import { RangeSlider } from "@blueprintjs/core/lib/esm/components/slider/rangeSlider";

class SliderSamples extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div style={{ padding: 16 }}>
                    <Slider />
                </div>
                <div style={{ padding: 16 }}>
                    <RangeSlider value={[3, 8]} />
                </div>
            </div>
        );
    }
}

export { SliderSamples, SliderSamples as default }