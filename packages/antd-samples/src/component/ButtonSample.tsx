import * as React from "react";
import Button from "antd/lib/button/index";

class ButtonSamples extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <div><Button type="primary">Primary</Button></div>
                <div><Button>Default</Button></div>
                <div><Button type="dashed">Dashed</Button></div>
                <div><Button type="danger">Danger</Button></div>
            </div>
        );
    }
}

export { ButtonSamples, ButtonSamples as default }

