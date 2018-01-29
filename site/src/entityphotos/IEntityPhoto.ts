import { Image } from "office-ui-fabric-react/lib/Image";

interface IEntityPhoto {
    Base64ImageData?: string;
    ImageMetadata?: {
        mstEntyID?: string;
        travelDocId?: string;
        tdIssueCntryCode?: string;
        tdExpiryDate?: string;
        birthDate?: string;
        travellerId?: string;
        createdDateTime?: string;
        photoMetadataId?: string;
        imageType?: string;
        encoding?: string;
        matchPercentage?: string;
        imageSource?: string;
    };
};

export { IEntityPhoto as default, IEntityPhoto };