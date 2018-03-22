interface IMasterEntitySearchRequest {
    fullName?: string;
    emailAddress?: string;
    credentialType?: string;
    credential?: string;
    firstName?: string;
    middleName?: string;
    familyName?: string;
    dob?: string;
    sex?: string;
    fullAddress?: string;
    unitnNo?: string;
    streetNo?: string;
    streetName?: string;
    streetType?: string;
    locality?: string;
    state?: string;
    postCode?: string;
    phoneNumber?: string;
    masterEntityIndicator?: string;
    maxNumberOfRecords?: number;
}

export { IMasterEntitySearchRequest }