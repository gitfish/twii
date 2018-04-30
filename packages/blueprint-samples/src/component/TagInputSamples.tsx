import * as React from "react";
import { TagInput } from "@blueprintjs/core/lib/esm/components/tag-input/tagInput";

interface ITagInputSamplesState {
    values: string[];
}

class TagInputSamples extends React.Component<any, ITagInputSamplesState> {
    constructor(props : any) {
        super(props);
        this.state = { values: [] };
    }
    private _onChange = (values : string[]) => {
        this.setState({ values: values });
    }
    render() {
        return (
            <div style={{ padding: 8 }}>
                <TagInput values={this.state.values} onChange={this._onChange} />
            </div>
        );
    }
}

export { ITagInputSamplesState, TagInputSamples, TagInputSamples as default }

