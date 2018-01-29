interface IPayment {
    FormOfPayment?: string;
    Type?: string;
    Amount?: number;
    Tax?: number;
    CreditCardNumber?: string;
    CreditCardName?: string;
    Currency?: string;
    FreeTextValue?: string;
}

export { IPayment as default, IPayment }