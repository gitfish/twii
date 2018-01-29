import Context from "common/Context";
import IVesselScheduleServive from "./IVesselScheduleServive";
import SoapVesselScheduleServive from "./SoapVesselScheduleService";

const VesselScheduleServiveConext = new Context<IVesselScheduleServive>({
    factory() {
        return new SoapVesselScheduleServive();
    }
});

export { VesselScheduleServiveConext as default, VesselScheduleServiveConext };