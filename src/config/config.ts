const config={
    appwriteUrl:String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    appwriteProjectId:String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteUserCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID),
    appwriteContactCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_CONTACT_COLLECTION_ID)
}
export default config;