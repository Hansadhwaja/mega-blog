import { Account, Client, ID } from "appwrite";
import config from "../config/config";


export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async login({email,password}){
      
        try {
           return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("Error while login:", error);
        }
    }

    async createAccount({ email, password, name }) {

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return login({email,password})
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("Error while creating Account:", error);
        }
    }

    

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser error:", error);
        }
        return null;
    }

    async logout (){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout error:", error);
        }

    }

}

const authService = new AuthService();

export default authService;