interface IRequestHeader {
    correlationRequestId?: string;
    userId?: string;
    userRole?: string;
    sourceSystemId?: string;
    requestTimeStamp?: Date;
}

export { IRequestHeader as default, IRequestHeader }