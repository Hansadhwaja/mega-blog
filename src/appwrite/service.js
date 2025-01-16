import { Client, Databases, ID, Storage } from "appwrite";
import config from "../config/config";


export class Service {
    client = new Client();
    databases;
    bucket;


    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {

        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Service :: createPost error:", error);
        }
    }

    async updateDocument(slug, updateData) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                updateData
            );
        } catch (error) {
            console.error("Service :: updateDocument error:", error);
            throw new Error("Failed to update the document. Please try again later.");
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
        if (status !== undefined) updateData.status = status;

        return this.updateDocument(slug, updateData);
    }

    async updateStatus(slug, { status }) {
        if (status === undefined) {
            throw new Error("Status is required to update the document.");
        }
        return this.updateDocument(slug, { status });
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Service :: deletePost error:", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("Service :: getPost error:", error);
            return false
        }
    }

    async getPosts(queries) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )

        } catch (error) {
            console.log("Service :: getPosts error:", error);
            return false
        }
    }

    //file service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file

            )
        } catch (error) {
            console.log("Service :: uploadFile error:", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Service :: deleteFile error:", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;