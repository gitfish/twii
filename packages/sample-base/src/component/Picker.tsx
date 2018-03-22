import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { containsIgnoreCase } from "@twii/common/lib/StringUtils";
import { TagPicker, ITag } from "office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker";

const tags : ITag[] = [
    {
        key: "NSW", name: "New South Wales"
    },
    {
        key: "QLD", name: "Queensland",
    },
    {
        key: "VIC", name: "Victoria"
    },
    {
        key: "SA", name: "South Australia"
    },
    {
        key: "WA", name: "Western Australia"
    },
    {
        key: "NT", name: "Northern Territory"
    },
    {
        key: "ACT", name: "Australian Capital Territory"
    },
    {
        key: "TAS", name: "Tasmania"
    }
];

class PickerSamples extends React.Component<any, any> {
    private _onResolveSuggestions = (filter : string, selectedItems : ITag[]) => {
        const filtered = tags.filter(tag => {
            return containsIgnoreCase(tag.name, filter) && !selectedItems.some(s => s.key === tag.key);
        });
        return filtered;
    }
    render() {
        return (
            <div className="picker-samples" style={{ padding: 8 }}>
                <div className="tag-picker-samples-section">
                    <h2>Tag Picker Samples</h2>
                    <TagPicker onResolveSuggestions={this._onResolveSuggestions} pickerSuggestionsProps={{ noResultsFoundText: "No matching states available" }} />
                </div>
            </div>
        );
    }
}

class PickerSamplesApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Picker Samples");
    }
    render() {
        return <PickerSamples />;
    }
}

export { PickerSamples, PickerSamplesApp }