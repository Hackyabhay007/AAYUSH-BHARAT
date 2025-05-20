import { useEffect, useState } from "react";
import productService from "@/appwrite/product";
import config from "@/config/config";
import videoService from "@/appwrite/video";
import toast from "react-hot-toast";

const BUCKET_ID = config.appwriteBucketId;

type Video = {
  id: string;
  videourl: string;
  videoname: string;
};

const HeroVideoManager = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);

    const fetchVideos=async()=>{
        try{
            const res = await videoService.fetchVideo();
            setVideos(
              res.map((video: Video) => ({
                id: video.id,
                videourl: video.videourl,
                videoname: video.videoname, 
              }))
            );
        }
        catch(error){
            console.log(error);
            setStatus("Failed to fetch videos.")
        }
    }
useEffect(() => {
    fetchVideos();
  }, []);

  const uploadVideo = async () => {  
    if (!videoFile) return;
    
    const sanitizeFileName = (fileName: string): string => {
  const nameWithoutSpaces = fileName.replace(/\s+/g, "_"); // Replace spaces with underscores
  const extension = fileName.substring(fileName.lastIndexOf("."));
  const baseName = nameWithoutSpaces.substring(0, nameWithoutSpaces.lastIndexOf("."));
  const trimmedBase = baseName.substring(0, 32 - extension.length); // Ensure total < 32
  return `${trimmedBase}${extension}`;
};
console.log(sanitizeFileName(videoFile.name));

    
    try{
    const res = await productService.storage.createFile(BUCKET_ID, sanitizeFileName(videoFile.name), videoFile);
    const videoUrl = productService.storage.getFileView(BUCKET_ID, res.$id);
    setStatus("");
    const video =await videoService.uploadVideo({videourl:videoUrl,videoname:sanitizeFileName(videoFile.name)})
    
    if(video){toast.success('Video Uploaded');
         console.log('video uploaded');
     setVideoFile(null);}
    fetchVideos();
    }
    catch(error){
        console.log(error);
        toast.error("Failed to upload video")
        setStatus("Failed to upload video")
    }
  };

   const handleDelete =async(videoId:string,videoname:string)=> {
    try {
      await videoService.deleteVideo(videoname,videoId,);
      setStatus("Video deleted.");
      toast.success("Video deleted.")
      fetchVideos();
    } catch {
        toast.error("Failed to delete video.")
      setStatus("Failed to delete video.");
    }
  };

  return (

        <div className="max-w-3xl mx-auto space-y-6 mt-10">
      <h2 className="text-2xl font-bold">Hero Video Manager</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={uploadVideo}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Video
        </button>
      </div>

      {status && <p className="text-sm text-gray-600">{status}</p>}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Uploaded Videos</h3>
        <ul className="space-y-4">
          {videos.map((video) => (
            <li
              key={video.id}
              className="border p-4 rounded shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <video
                controls
                src={video.videourl}
                className="w-full sm:w-1/2 max-h-48 object-cover"
              />
              <div className="flex justify-between sm:justify-end gap-4 items-center">
                <p className="text-sm truncate w-40">{video.videoname}</p>
                <button
                  onClick={() => handleDelete(video.id,video.videoname)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeroVideoManager;
