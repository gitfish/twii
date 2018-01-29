import CodeSet from "./CodeSet";

const passportTypeCd = new CodeSet({
    "B": "Frequent Traveller's Passport",
    "C": "Certificate of Identity",
    "D": "Diplomatic Passport",
    "E": "Endorsements",
    "F": "Official Passport",
    "I": "Document of Identity",
    "O": "Ordinary Passport",
    "U": "UN Convention Travel Document"
});

export { passportTypeCd as default, passportTypeCd };