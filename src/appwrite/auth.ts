import config from "../config/config";

import { Client, Account, ID, Databases } from "appwrite";
export class AuthService {
  client = new Client();
  account;
  databases;
  constructor() {
    const endpoint = config.appwriteUrl;
    const projectId = config.appwriteProjectId;

    if (!endpoint || !projectId) {
      throw new Error('Appwrite configuration is missing. Please check your environment variables.');
    }

    try {
      // Validate URL format
      new URL(endpoint);
      
      this.client
        .setEndpoint(endpoint)
        .setProject(projectId);
      this.account = new Account(this.client);
      this.databases = new Databases(this.client);    } catch (_error) {
      console.error('Invalid Appwrite endpoint URL:', endpoint);
      throw new Error('Invalid Appwrite endpoint URL configuration');
    }
  }

  async createAccount({
    email,
    password,
    fullname,
    phone,
  }: {
    email: string;
    password: string;
    fullname: string;
    phone: string;
  }) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        fullname
      );
      if (useraccount) {
        const res = await this.databases.createDocument(
          config.appwriteDatabaseId,
          config.appwriteUserCollectionId,
          ID.unique(),
          {
            userid: useraccount.$id,
            email: useraccount.email,
            fullname: fullname,
            phone: phone.toString(),
          }
        );
        console.log("after doc", res);

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
      const user = await this.account.createEmailPasswordSession(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      // Get the current session
      const session = await this.account.getSession('current');
      // Delete the current session
      return await this.account.deleteSession(session.$id);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  async forgotPassword(email: string) {
    const redirectUrl =
      "https://frontend-frontend-ho6i1o-0c4404-46-202-164-152.traefik.me/reset-password";
    const res = await this.account.createRecovery(email, redirectUrl);
    return res;
  }
  async resetPassword(userid: string, secret: string, password: string) {
    const res = await this.account.updateRecovery(userid, secret, password);
    return res;
  }
 async  updateUser({
  name,
  phone,
  email,
  userId,
  password,
}: {
  name: string;
  phone: string;
  email: string;
  userId: string;
  password: string;
}) {
  try {
    // 1. Ensure user is logged in
    const session = await this.account.get(); // Will throw if not logged in

    // 2. Update Appwrite Auth info
    if (session.email !== email) {
      await this.account.updateEmail(email, password); // Requires current password
    }
    if (session.name !== name) {
      await this.account.updateName(name);
    }

    // 3. Update user details in database
    await this.databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteUserCollectionId,
      userId,
      {
        fullname: name,
        phone,
        email,
      }
    );

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to update user:", error.message);
      throw new Error(error.message || "Update failed");
    } else {
      console.error("Failed to update user:", error);
      throw new Error("Update failed");
    }
  }
}
}

const authService = new AuthService();
export default authService;
