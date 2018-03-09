import axios from "axios";
import { IImage } from "../IImage";
import { IImageService, IGetImagesRequest } from "./IImageService";
import { extname } from "@twii/core/lib/common/PathUtils";
import { IAuthConfig, Defaults } from "../../Config"; 

class RestImageService implements IImageService {
    private _baseUrl;
    private _authConfig;
    get baseUrl() {
        return this._baseUrl || Defaults.apiBaseUrl;
    }
    set baseUrl(value : string) {
        this._baseUrl = value;
    }
    // NOTE: this would probably only ever be for server side usage
    get auth() {
        return this._authConfig || Defaults.apiAuth;
    }
    set auth(value : IAuthConfig) {
        this._authConfig = value;
    }
    getImageUrl(request : IImage) : string {
        return `${this.baseUrl}/image/${request.id}/`;
    }
    getImages(request : IGetImagesRequest) : Promise<IImage[]> {
        return axios.get(`${this.baseUrl}/image/`, { params: request, auth: this.auth }).then(value => {
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
        imageFormData.append("file_extension", extname(request.file.name, true).toLowerCase());
        const imagePromise = request.id ?
            axios.patch(`${this.baseUrl}/image/${request.id}/`, imageFormData, { auth: this.auth }) :
            axios.post(`${this.baseUrl}/image/`, imageFormData, { auth: this.auth });
        return imagePromise.then(value => {
            return value.data as IImage;
        });
    }
    deleteImage(request : IImage) : Promise<any> {
        return axios.delete(`${this.baseUrl}/image/${request.id}/`, { auth: this.auth });
    }
}

export {
    RestImageService
}