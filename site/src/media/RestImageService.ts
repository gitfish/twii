import axios from "axios";
import { IImage } from "./IImage";
import { IImageService, IGetImagesRequest } from "media/IImageService";
import { IUrlConfig } from "config/IUrlConfig";
import { RestApiConfig } from "config/RestApiConfig";
import { AbstractRestService } from "common/AbstractRestService";
import * as PathUtils from "util/Path";

class RestImageService extends AbstractRestService implements IImageService {
    constructor(config?: IUrlConfig) {
        super();
        this._config = config;
    }
    get config() {
        return this._config || RestApiConfig;
    }
    getImageUrl(request : IImage) : string {
        return `${this.config.baseUrl}/image/${request.id}/`;
    }
    getImages(request : IGetImagesRequest) : Promise<IImage[]> {
        return axios.get(`${this.config.baseUrl}/image/`, { params: request, auth: this.config.auth }).then(value => {
            return value.data as IImage[];
        });
    }
    saveImage(request : IImage) : Promise<IImage> {
        const imageFormData = new FormData();
        imageFormData.append("image", request.file);
        if(request.security_marking) {
            imageFormData.append("security_marking", request.security_marking);
        }
        if(request.image_type) {
            imageFormData.append("image_type", request.image_type);
        }
        imageFormData.append("file_extension", PathUtils.extname(request.file.name, true).toLowerCase());
        const imagePromise = request.id ?
            axios.patch(`${this.config.baseUrl}/image/${request.id}/`, imageFormData, { auth: this.config.auth }) :
            axios.post(`${this.config.baseUrl}/image/`, imageFormData, { auth: this.config.auth });
        return imagePromise.then(value => {
            return value.data as IImage;
        });
    }
    deleteImage(request : IImage) : Promise<any> {
        return axios.delete(`${this.config.baseUrl}/listing/${request.id}/`, { auth: this.config.auth });
    }
}

export {
    RestImageService
}