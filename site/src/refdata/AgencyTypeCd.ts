import CodeSet from "./CodeSet";

const agencyTypeCd = new CodeSet({
    "HO": "Head Office",
    "BR": "Branch Office",
    "AO": "Administrative Office",
    "CS": "Cargo Sales Office",
    "EB": "ERSP Branch",
    "EP": "ERSP Parent",
    "ES": "European STP",
    "ET": "ERSP Linked to TID",
    "SA": "Specific Sales Activity",
    "SE": "Special Event",
    "SP": "Service Provider",
    "ST": "Satellite Ticket Printer",
    "TD": "Ticket Delivery Office",
    "WH": "Warehouse"
});

export { agencyTypeCd as default, agencyTypeCd };