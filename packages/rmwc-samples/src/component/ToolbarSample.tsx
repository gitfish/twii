import * as React from "react";
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from "rmwc/Toolbar";


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

export { ToolbarSample, ToolbarSample as default }