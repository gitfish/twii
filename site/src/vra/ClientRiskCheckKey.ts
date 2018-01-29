import IClientRiskCheckKey from "./IClientRiskCheckKey";

class ClientRiskCheckKey implements IClientRiskCheckKey {
    clientId: string;
    applicationTypeCode: string;
    clientRoleTypeCode: string;
    visaSubClassCode: string;
    visaStreamCode: string;
    eventTypeCode: string;
    clientLocationCode: string;
    asString(): string {
        return `${this.clientId}:${this.applicationTypeCode}:${this.clientRoleTypeCode}:${this.visaSubClassCode}:` +
            `${this.visaStreamCode}:${this.eventTypeCode}:${this.clientLocationCode}`;
    }
    asRequest(): any {
        return {
            clientId: this.clientId,
            applicationTypeCode: this.applicationTypeCode,
            clientRoleTypeDesc: this.clientRoleTypeCode,
            visaSubClassCode: this.visaSubClassCode,
            visaStreamCode: this.visaStreamCode,
            eventTypeCode: this.eventTypeCode,
            clientLocationCode: this.clientLocationCode
        };
    }
}

export { ClientRiskCheckKey as default, ClientRiskCheckKey };