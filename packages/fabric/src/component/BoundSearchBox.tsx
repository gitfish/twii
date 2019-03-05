import * as React from "react";
import { observer } from "mobx-react";
import { SearchBox, ISearchBoxProps } from "office-ui-fabric-react/lib/SearchBox";
import { IBoundProps } from "../../../core-ui/src/component/IBoundProps";
import { setBoundValue, getBoundValue } from "../../../core-ui/src/component/BoundHelper";

interface IBoundSearchBoxProps extends ISearchBoxProps, IBoundProps<any, string> { }

@observer
class BoundSearchBox extends React.Component<IBoundSearchBoxProps, any> {
    private _onChange = (value : string) => {
        setBoundValue(this.props, value);
        if(this.props.onChanged) {
            this.props.onChanged(value);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <SearchBox {...this.props}
                         onChange={this._onChange}
                         value={value || ""} />
    }
}

export { IBoundSearchBoxProps, BoundSearchBox }