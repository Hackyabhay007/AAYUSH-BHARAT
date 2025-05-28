import config from "@/config/config";

const getFilePreview = (fileId: string) => {
    if (!fileId) return '';
    
    try {
        const baseUrl = 'http://backend.aayudhbharat.com/v1';
        const bucketId = config.appwriteBucketId;
        const projectId = config.appwriteProjectId;
        
        // Include mode=admin in the URL
        return `${baseUrl}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;
    } catch (error) {
        console.error('Error generating file preview URL:', error);
        return '';
    }
};

export default getFilePreview;