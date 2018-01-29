import { action } from "mobx";
import IAirCargoActivity from "./IAirCargoActivity";
import AirCargoActivityDetailStore from "./AirCargoActivityDetailStore";

const openActivityDetails = action((activity : IAirCargoActivity) => {
    /* Disabled for now
    AirCargoActivityDetailStore.load(activity);
    AirCargoActivityDetailStore.setVisible(true);
    */
});

export { openActivityDetails }