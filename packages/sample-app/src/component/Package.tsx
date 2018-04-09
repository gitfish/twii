import * as React from "react";
import packageInfo from "package.json";

class PackageInfo extends React.Component<any, any> {
    render() {
        return (
            <pre>
                {JSON.stringify(packageInfo, null, "\t")}
            </pre>
        )
    }
}

export { PackageInfo }