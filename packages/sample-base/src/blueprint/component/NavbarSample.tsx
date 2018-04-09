import * as React from "react";
import { Navbar } from "@blueprintjs/core/lib/esm/components/navbar/navbar";
import { NavbarHeading } from "@blueprintjs/core/lib/esm/components/navbar/navbarHeading";
import { NavbarGroup } from "@blueprintjs/core/lib/esm/components/navbar/navbarGroup";
import { NavbarDivider } from "@blueprintjs/core/lib/esm/components/navbar/navbarDivider";
import { Alignment } from "@blueprintjs/core/lib/esm/common/alignment";
import { DARK, INPUT } from "@blueprintjs/core/lib/esm/common/classes";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

class NavbarSample extends React.Component<any, any> {
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

class NavbarSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Navbar Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <NavbarSample />
            </SampleHostAppView>
        );
    }
}

export { NavbarSampleApp }