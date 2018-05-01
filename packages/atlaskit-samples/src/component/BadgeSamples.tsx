import * as React from "react";
import Badge from "@atlaskit/badge/dist/esm/Badge";
import { borderRadius, colors } from "@atlaskit/theme";

interface IItemProps {
    inverted?: boolean;
}

class Item extends React.Component<any, any> {
    render() {
        return (
            <div style={{
                alignItems: "center",
                background: this.props.inverted ? colors.B400 : "none",
                borderRadius: borderRadius,
                color: this.props.inverted ? colors.N0 : "inherit",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
                maxWidth: 300,
                padding: "0.6em 1em"
            }}>
                {this.props.children}
            </div>
        );
    }
}

class BadgeSample extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <Item>
                    <p>Default</p>
                    <Badge value={5} />
                </Item>
                <Item>
                    <p>Primary</p>
                    <Badge appearance="primary" value={-5} />
                </Item>
                <Item>
                    <p>Important</p>
                    <Badge appearance="important" value={25} />
                </Item>
                <Item inverted>
                    <p>Primary Inverted</p>
                    <Badge appearance="primaryInverted" value={-5} />
                </Item>
                <Item>
                    <p>Added (no theme change)</p>
                    <Badge appearance="added" max={99} value={3000} />
                </Item>
                <Item>
                    <p>Removed (no theme change)</p>
                    <Badge appearance="removed" />
                </Item>
                <Item>
                    <p>Infinity (∞)</p>
                    <Badge max={Infinity} value={Infinity} />
                </Item>
            </div>
        );
    }
}

export { BadgeSample, BadgeSample as default }