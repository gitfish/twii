import * as React from "react";
import { observer } from "mobx-react";
import IEntityModel from "../IEntityModel";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import IMasterEntitySourceEntityName from "../IMasterEntitySourceEntityName";
import IMasterEntitySourceEntityAddress from "../IMasterEntitySourceEntityAddress";
import IMasterEntitySourceEntityCredential from "../IMasterEntitySourceEntityCredential";
import MasterEntitySourceEntityName from "./MasterEntitySourceEntityName";
import MasterEntitySourceEntityAddress from "./MasterEntitySourceEntityAddress";
import MasterEntitySourceEntityPhone from "./MasterEntitySourceEntityPhone";
import MasterEntitySourceEntityCredential from "./MasterEntitySourceEntityCredential";
import MasterEntityPotentialMatchesModel from "../MasterEntityPotentialMatchesModel";
import IMasterEntityPotentialMatchesModel from "../IMasterEntityPotentialMatchesModel";
import IMasterEntityModel from "../IMasterEntityModel";
import { Output as DateOutputFormat } from "common/DateFormats";
import * as DateUtils from "util/Date";
import GenderRefList from "common/ref/GenderRefList";
import DefinitionList from "common/component/DefinitionList";
import * as StringUtils from "util/String";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { css } from "office-ui-fabric-react/lib/Utilities";
import IMasterEntityHistoryModel from "../IMasterEntityHistoryModel";
import MasterEntityHistoryModel from "../MasterEntityHistoryModel";
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import MasterEntityHistoryContainer from "./MasterEntityHistory";
import "./EntityAttributes.scss";

interface IEntityAttributeProps {
    label?: any;
}

class EntityAttribute extends React.Component<IEntityAttributeProps, any> {
    render() {
        return (
            <DefinitionList inline={true} className="entity-attribute" name={this.props.label}>
                {this.props.children}
            </DefinitionList>
        );
    }
}

enum EntityAttributesType {
    primary,
    secondary
}

interface IEntityAttributesProps {
    entity: IEntityModel;
    type?: EntityAttributesType;
    position?: number;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

const DefaultEntityAttributesProps : IEntityAttributesProps = {
    entity: null,
    type: EntityAttributesType.primary,
    position: null,
    onSearch: null
}

const MasterEntityHistoryStore = new MasterEntityHistoryModel();
const MasterEntityPotentialMatchesStore = new MasterEntityPotentialMatchesModel();

interface IMasterEntityHistoryDialogProps {
    masterEntity: IMasterEntityModel;
    history: IMasterEntityHistoryModel;
    potentialMatches: IMasterEntityPotentialMatchesModel;
}

class MasterEntityHistoryDialog extends React.Component<IMasterEntityHistoryDialogProps, any> {
    private _handleDialogClose = () => {
        this.props.history.setVisible(false);
    };
    render() {
        return (
            <Dialog hidden={false} onDismiss={this._handleDialogClose}
                    dialogContentProps={{ type: DialogType.normal, title: 'Master Entity History' }}
                    modalProps={{ isBlocking: false, className: "master-entity-history-dialog" }}>
                    <MasterEntityHistoryContainer masterEntity={this.props.masterEntity}
                                                  history={this.props.history}
                                                  potentialMatches={this.props.potentialMatches}/>
            </Dialog>
        );
    }
}

@observer
class EntityAttributes extends React.Component<IEntityAttributesProps, any> {
    public static defaultProps = DefaultEntityAttributesProps;
    private _handleHistoryClick = () => {
        const masterEntity = this.props.entity as IMasterEntityModel;
        MasterEntityHistoryStore.load(masterEntity.masterEntityId);
        MasterEntityHistoryStore.setVisible(true);
    };
    componentWillMount() {
        MasterEntityHistoryStore.setVisible(false);
        MasterEntityPotentialMatchesStore.setVisible(false);
    }
    render() {
        let positionDescription;
        let names;
        let addresses;
        let phones;
        let credentials;
        let dob;
        let gender;

        if(this.props.position) {
            positionDescription = <EntityAttribute>({this.props.position})</EntityAttribute>;
        }

        if(this.props.entity && this.props.entity.names && this.props.entity.names.length > 0) {
            const nameItems = this.props.entity.names.map((name) => {
                return <MasterEntitySourceEntityName className="entity-attribute-value" key={name.sourceSystemCd + name.sourceEntityNameId} name={name} onClick={this.props.onSearch} />;
            });
            names = <EntityAttribute label="Names">{nameItems}</EntityAttribute>;
        }
        if(this.props.entity && this.props.entity.addresses && this.props.entity.addresses.length > 0) {
            const addressItems = this.props.entity.addresses.map((address) => {
                return <MasterEntitySourceEntityAddress className="entity-attribute-value" key={address.sourceSystemCd + address.sourceEntityAddressId} address={address} onClick={this.props.onSearch} />;
            });
            addresses = <EntityAttribute label="Addresses">{addressItems}</EntityAttribute>;
        }
        if(this.props.entity && this.props.entity.phones && this.props.entity.phones.length > 0) {
            const phoneItems = this.props.entity.phones.map((phone) => {
                return <MasterEntitySourceEntityPhone className="entity-attribute-value" key={phone.sourceSystemCd + phone.sourceEntityPhoneId} phone={phone} onClick={this.props.onSearch} />;
            });
            phones = <EntityAttribute label="Phones">{phoneItems}</EntityAttribute>;
        }
        if(this.props.entity && this.props.entity.credentials && this.props.entity.credentials.length > 0) {
            const credentialItems = this.props.entity.credentials.map((credential) => {
                return <MasterEntitySourceEntityCredential
                            className="entity-attribute-value" 
                            key={credential.sourceSystemCd + credential.sourceEntityCredentialId}
                            credential={credential}
                            onClick={this.props.onSearch} />
            });
            credentials = <EntityAttribute label="Credentials">{credentialItems}</EntityAttribute>;
        }
        if(this.props.entity && this.props.entity.dateOfBirth) {
            dob = <EntityAttribute label="Date of Birth"><div className="entity-attribute-value">{DateUtils.dateToOutputText(this.props.entity.dateOfBirth)}</div></EntityAttribute>
        }
        if(this.props.entity && this.props.entity.gender) {
            const genderRefListItem = GenderRefList.getItemByKey(this.props.entity.gender);
            if(genderRefListItem) {
                gender = <EntityAttribute label="Gender"><div className="entity-attribute-value">{genderRefListItem.text}</div></EntityAttribute>
            }
        }
        const historyButton = this.props.type === EntityAttributesType.primary ?
                <EntityAttribute label="Mastering">
                    <DefaultButton iconProps={ { iconName: 'FullHistory' } } onClick={this._handleHistoryClick}>
                        History
                    </DefaultButton>
                </EntityAttribute> : undefined;
        let history = this.props.type === EntityAttributesType.primary && MasterEntityHistoryStore.visible
            ? <MasterEntityHistoryDialog masterEntity={this.props.entity as IMasterEntityModel}
                                         history={MasterEntityHistoryStore}
                                         potentialMatches={MasterEntityPotentialMatchesStore}/> : undefined;

        if(names || dob || gender || addresses || phones || credentials) {
            return (
                <div className={css("entity-attributes", { "primary": this.props.type === EntityAttributesType.primary, "secondary": this.props.type === EntityAttributesType.secondary })}>
                    {positionDescription}
                    {names}
                    {dob}
                    {gender}
                    {addresses}
                    {phones}
                    {credentials}
                    {historyButton}
                    {history}
                </div>
            );
        }
        return null;
    }
}

export { EntityAttributes as default, EntityAttributes, IEntityAttributesProps, EntityAttributesType };