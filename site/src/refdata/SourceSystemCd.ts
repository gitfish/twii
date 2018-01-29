import CodeSet from "./CodeSet";

const sourceSystemCd = new CodeSet({
    "ADH": "Adhoc change to IAT: c272449, 439579",
    "AH": "Alert History Batch",
    "AHT": "Alert History Trickle",
    "BF1": "Traveller Multi Person using same document Tidy",
    "BF2": "Traveller late arrival passport and Visa Tidy",
    "BF3": "Traveller movements de-dups",
    "BF4": "Traveller Alert Match tidy",
    "C02": "Source missing names and docs from Traveller Movem",
    "D": "DIMIA",
    "DOV": "DIMA movements Overlap fix",
    "HF1": "Alert Movement History fix Race Condition",
    "MBA": "Mini-batch Actual Movements",
    "MBe": "Mini-batch Late Expected Movements",
    "MBE": "Mini-batch Expected Movements",
    "MBP": "Mini-batch Profiling (APT)",
    "MBV": "Mini-batch Visa",
    "MPP": "Mini-batch Passport Person",
    "MTD": "Missing Travel Doc hist fix",
    "NZF": "New Zealand Passport fix",
    "O": "OAG",
    "P": "PACE",
    "PB": "PACE Batch",
    "PCA": "Pace Chimp Actual",
    "PCe": "Pace Chimp Late Expected",
    "PCE": "Pace Chimp Expected",
    "PRA": "Passport Person duplicate names tidy",
    "PT": "PACE Trickle",
    "SAP": "Split and Merged Trickle Australian Passport",
    "SCB": "Sea Cruise Booking",
    "SMH": "Split and Merged Historical",
    "SML": "Splits and Merges Linkage",
    "SMM": "Split and Merged Trickle Movement",
    "SMP": "Split and Merged Trickle Person",
    "SMT": "Split and Merged Trickle",
    "SMV": "Split and Merged Trickle Visa"
});

export { sourceSystemCd as default, sourceSystemCd };