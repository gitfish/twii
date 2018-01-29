import { action } from "mobx";
import IIATAAgency from "./IIATAAgency";
import IATAAgencyDetailStore from "./IATAAgencyDetailStore";

const openAgencyDetails = action((agency : IIATAAgency) => {
    IATAAgencyDetailStore.load(agency);
    IATAAgencyDetailStore.setVisible(true);
});

export { openAgencyDetails }