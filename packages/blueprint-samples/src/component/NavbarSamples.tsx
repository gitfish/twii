import * as React from "react";
import { Navbar } from "@blueprintjs/core/lib/esm/components/navbar/navbar";
import { NavbarHeading } from "@blueprintjs/core/lib/esm/components/navbar/navbarHeading";
import { NavbarGroup } from "@blueprintjs/core/lib/esm/components/navbar/navbarGroup";
import { NavbarDivider } from "@blueprintjs/core/lib/esm/components/navbar/navbarDivider";
import { Alignment } from "@blueprintjs/core/lib/esm/common/alignment";
import { DARK, INPUT } from "@blueprintjs/core/lib/esm/common/classes";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";

class NavbarSamples extends React.Component<any, any> {
    render() {
        return (
            <Navbar className={DARK}>
                <NavbarGroup>
                    <NavbarHeading>Navbar Heading</NavbarHeading>
                    <input type="input" className={INPUT} />
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button rightIcon="home">Home</Button>
                    <NavbarDivider />
                    <Button rightIcon="cog">Settings</Button>
                </NavbarGroup>
            </Navbar>
        );
    }
}

export { NavbarSamples, NavbarSamples as default }