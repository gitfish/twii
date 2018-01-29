import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import MasterEntityContainer from "entity/component/MasterEntityContainer";
import ITravllerRiskModel from "../../../iat/travellerhistory/model/ITravellerRiskModel";

interface ITravellerRiskProps {
 //   travellerModel? : ITravllerRiskModel;
}

@observer
class TravellerRisk extends React.Component<ITravellerRiskProps, any> {
    render() {
        return <div>Will do some work here</div>
    }
}

export {
    TravellerRisk as default,
    TravellerRisk,
    ITravellerRiskProps
}