import config from "../config/config";

import { Client, Account, ID, Databases } from "appwrite";
export class AuthService {
  client = new Client();
  account;
   databases;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
     this.databases = new Databases(this.client);
  }
  

  async createAccount({
    email,
    password,
    fullname
  }: {
    email: string;
    password: string;
    fullname: string;
  }) {
   
    
    
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        fullname
      );
      console.log(useraccount.$id,useraccount.email);
      
      if (useraccount) {

          const res=await this.databases.createDocument(
          config.appwriteDatabaseId,         
          config.appwriteUserCollectionId,   
          ID.unique(),
          {
            userid:useraccount.$id,
            email: useraccount.email,
            fullname: fullname,
          }
          
        );
        console.log('after doc',res);


        return this.login({ email, password });
      } else {
        return useraccount;
      }
    } catch (error) {
      console.log("Error in creating appwrite user:", error);

      throw error;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const user= await this.account.createEmailPasswordSession(email,password);     
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user=await this.account.get();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("Session Id");
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string) {
    const redirectUrl = "https://frontend-frontend-ho6i1o-0c4404-46-202-164-152.traefik.me/reset-password";
    const res = await this.account.createRecovery(email, redirectUrl);
    return res;
  }
  async resetPassword(userid: string, secret: string, password: string) {
    const res = await this.account.updateRecovery(userid, secret, password);
    return res;
  }
}

const authService = new AuthService();
export default authService;
