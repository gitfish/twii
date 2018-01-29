import ITravelDocInfo from "risk/traveller/iat/common/ITravelDocInfo";

interface ITravelDoc {
    TravelDocInfo?: ITravelDocInfo;
    TravelDocDBT?: number;
}

export { ITravelDoc as default, ITravelDoc }