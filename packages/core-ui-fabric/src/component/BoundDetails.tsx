import * as React from "react";
import { observer } from "mobx-react";
import { IDetailsProps, Details } from "./Details";
import { IBoundProps } from "@twii/core-ui/lib/component/IBoundProps";
import { setBoundValue, getBoundValue } from "@twii/core-ui/lib/component/BoundHelper";

interface IBoundDetailsProps extends IDetailsProps, IBoundProps<any, boolean> {}

class BoundDetails extends React.Component<IBoundDetailsProps, any> {
    private _onOpenChange = (open : boolean) => {
        setBoundValue(this.props, open);
        if(this.props.onOpenChange) {
            this.props.onOpenChange(open);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <Details {...this.props} onOpenChange={this._onOpenChange} open={value} />;
    }
}

export { IBoundDetailsProps, BoundDetails }