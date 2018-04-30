import * as React from "react";
import { Popover } from "@blueprintjs/core/lib/esm/components/popover/popover";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";

class PopoverSamples extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <Popover>
                    <Button>Popover Target</Button>
                    <div>
                        Popover content
                    </div>
                </Popover>
            </div>
        );
    }
}

export { PopoverSamples, PopoverSamples as default }