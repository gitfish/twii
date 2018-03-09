import * as React from "react";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { AppHostView } from "@twii/ui-core/lib/app/component/AppHostView";
import { containsIgnoreCase } from "@twii/core/lib/common/StringUtils";
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

class PickerSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Picker Sample")
    }
    render() {
        return (
            <AppHostView host={this.props.host} title="Picker Sample App">
                <PickerSamples />
            </AppHostView>
        )
    }
}

export { PickerSampleApp, PickerSamples }