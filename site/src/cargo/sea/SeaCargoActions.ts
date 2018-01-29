import { action } from "mobx";
import ISeaCargoActivity from "./ISeaCargoActivity";
import SeaCargoActivityDetailStore from "./SeaCargoActivityDetailStore";

const openActivityDetails = action((activity : ISeaCargoActivity) => {
    /* Disabled for now
    SeaCargoActivityDetailStore.load(activity);
    SeaCargoActivityDetailStore.setVisible(true);
    */
});

export { openActivityDetails }