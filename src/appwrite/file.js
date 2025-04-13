import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class FileService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.storage = new Storage(this.client)
    }

    async fileUpload(file) {
        try {
            return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            return false
        }
    }

    async fileDelete(fileId) {
        try {
            await this.storage.deleteFile(conf.appwriteBucketId, fileId)
            return true
        } catch (error) {
            return false
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
    }
}

const fileService = new FileService()

export default fileService