import CodeSet from "./CodeSet";

const passportStatusCd = new CodeSet({
    "-": "Being Processed",
    "E": "Expired",
    "F": "Found Cancelled",
    "H": "Held in passport office",
    "K": "Cancelled",
    "L": "Lost",
    "M": "Missing",
    "N": "Normal",
    "T": "Stolen",
    "V": "Void",
    "X": "Spoilt after approval"
});

export { passportStatusCd as default, passportStatusCd };