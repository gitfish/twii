import * as React from "react";
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from "rmwc/Toolbar";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";


class ToolbarSample extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div style={{ padding: 8 }}>
                    {/* Minimum usage */}
                    <Toolbar>
                      <ToolbarRow>
                        <ToolbarTitle>Toolbar</ToolbarTitle>
                      </ToolbarRow>
                    </Toolbar>
                </div>
                <div style={{ padding: 8 }}>    
                    {/* With multiple sections */}
                    <Toolbar>
                      <ToolbarRow>
                        <ToolbarSection alignStart>
                          <ToolbarMenuIcon use="menu"/>
                          <ToolbarTitle>Toolbar</ToolbarTitle>
                        </ToolbarSection>
                        <ToolbarSection alignEnd>
                          <ToolbarIcon use="save"/>
                          <ToolbarIcon use="print"/>
                        </ToolbarSection>
                      </ToolbarRow>
                    </Toolbar>
                </div>
                <div style={{ padding: 8 }}>
                    {/* Multiple rows */}
                    <Toolbar>
                      <ToolbarRow>
                        <ToolbarTitle>Toolbar</ToolbarTitle>
                      </ToolbarRow>
                      <ToolbarRow>
                        <ToolbarTitle>Second Row</ToolbarTitle>
                      </ToolbarRow>
                    </Toolbar>
                </div>
            </div>
        )
    }
}

class ToolbarSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("RMWC Toolbar Samples");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <ToolbarSample />
            </SampleHostAppView>
        );
    }
}

export { ToolbarSampleApp }