import CodeSet from "./CodeSet";

const visaStatusCd = new CodeSet({
    "C": "Cancelled",
    "E": "Visa in Effect",
    "N": "Visa is Superseded",
    "S": "Ceased"
});

export { visaStatusCd as default, visaStatusCd };