import ContactType from "./ContactType";

interface IContact {
    ID?: string;
    Type?: ContactType,
    Text?: string;
    HomePhoneNumber?: string;
    Email?: string;
    FaxNumber?: string;
}

export { IContact as default, IContact }