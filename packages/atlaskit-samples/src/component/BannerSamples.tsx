import * as React from "react";
import Banner from "@atlaskit/banner/dist/esm/components/Banner";
import WarningIcon from "@atlaskit/icon/glyph/warning";
import ErrorIcon from "@atlaskit/icon/glyph/error";

class BannerSamples extends React.Component<any, any> {
    render() {
        const warningIcon = <WarningIcon label="Warning" secondaryColor="inherit" /> 
        const errorIcon = <ErrorIcon label="Error" secondaryColor="inherit" />
        return (
            <div style={{ padding: 8 }}>
                <Banner icon={warningIcon} isOpen={true} appearance="warning">
                    This is a warning banner
                </Banner>
                <br/>
                <Banner icon={errorIcon} isOpen={true} appearance="error">
                    This is an error banner
                </Banner>
            </div>
        );
    }
}

export { BannerSamples, BannerSamples as default }