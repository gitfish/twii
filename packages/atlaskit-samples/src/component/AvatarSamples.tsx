import * as React from "react";
import Avatar from "@atlaskit/avatar/dist/esm/components/Avatar";

class AvatarSamples extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <div style={{ padding: 8 }}>
                    <h3>Circle</h3>
                    <div style={{ display: "flex" }}>
                        <Avatar name="xxlarge" size="xxlarge" />
            
                        <Avatar name="xlarge" size="xlarge" presence="online" />
                        
                        <Avatar name="large" size="large" presence="offline" />
                        
                        <Avatar name="medium" size="medium" presence="busy" />
                        
                        <Avatar name="small" size="small" presence="focus" />
                        
                        <Avatar name="xsmall" size="xsmall" />
                    </div>
                </div>
                <div style={{ padding: 8 }}>
                    <h3>Square</h3>
                    <div style={{ display: "flex" }}>
                        <Avatar appearance="square" name="xxlarge" size="xxlarge" />
                    
                        <Avatar
                            appearance="square"
                            name="xlarge"
                            size="xlarge"
                            status="approved"
                        />
                
                        <Avatar appearance="square" name="large" size="large" status="declined" />
                    
                        <Avatar appearance="square" name="medium" size="medium" status="locked" />
                    
                        <Avatar appearance="square" name="small" size="small" />
                    
                        <Avatar appearance="square" name="xsmall" size="xsmall" />
                    </div>
                </div>
            </div>
        );
    }
}

export { AvatarSamples, AvatarSamples as default }