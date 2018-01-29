interface IPNRServiceResponse<T> {
    data: T[];
    errors?: any;
    totalrecords?: number;
}

export { IPNRServiceResponse as default, IPNRServiceResponse }