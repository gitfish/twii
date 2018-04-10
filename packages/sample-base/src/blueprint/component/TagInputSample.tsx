import * as React from "react";
import { TagInput } from "@blueprintjs/core/lib/esm/components/tag-input/tagInput";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

interface ITagInputSampleState {
    values: string[];
}

class TagInputSample extends React.Component<any, ITagInputSampleState> {
    constructor(props : any) {
        super(props);
        this.state = { values: [] };
    }
    private _onChange = (values : string[]) => {
        this.setState({ values: values });
    }
    render() {
        return (
            <TagInput values={this.state.values} onChange={this._onChange} />
        );
    }
}

class TagInputSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Tag Input Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <TagInputSample />
                </div>
            </SampleHostAppView>
        );
    }
}

export { TagInputSampleApp }

