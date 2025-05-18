import config from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }
  

  async createAccount({
    email,
    password,
    fullname,
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
      if (useraccount) {
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
    // const promise = this.account.createEmailPasswordSession(email, password);
    // promise.then(
    //   function (response) {
    //     return response;
    //   },
    //   function (error) {
    //     return error;
    //   }
    // );
    try {
      const user= await this.account.createEmailPasswordSession(email,password);      
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSession("Session Id");
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string) {
    const redirectUrl = "http://localhost:3000/reset-password";
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
