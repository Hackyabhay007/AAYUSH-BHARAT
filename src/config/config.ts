const config={
    appwriteUrl:String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    appwriteProjectId:String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteUserCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID),
    appwriteContactCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_CONTACT_COLLECTION_ID),
    appwriteProductCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID),
    appwriteVariantCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_VARIANT_COLLECTION_ID),
    appwriteApiSecretKey:String(process.env.NEXT_PUBLIC_APPWRITE_API_SECRET_KEY),
    appwriteBucketId:String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID),
    appwriteVideoCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID),
    appwriteReelCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_REEL_COLLECTION_ID),
    appwriteVariantsCollectionId:String(process.env.NEXT_PUBLIC_APPWRITE_VARIANTS_COLLECTION_ID),
}
export default config;