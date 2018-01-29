import IRiskResumeSearchRequest from "./IRiskResumeSearchRequest";

interface IRiskResumeSearchHistoryEntry {
    timestamp: Date;
    request: IRiskResumeSearchRequest;
}

export { IRiskResumeSearchHistoryEntry as default, IRiskResumeSearchHistoryEntry };