import IClientRiskCheckKey from "./IClientRiskCheckKey";

class ApplicationClientRiskCheckKey implements IClientRiskCheckKey {
    applicationClientRoleId: string;
    asString(): string {
        return this.applicationClientRoleId;
    }
    asRequest(): any {
        return {
            applicationClientRoleId: this.applicationClientRoleId
        };
    }
}

export { ApplicationClientRiskCheckKey as default, ApplicationClientRiskCheckKey };