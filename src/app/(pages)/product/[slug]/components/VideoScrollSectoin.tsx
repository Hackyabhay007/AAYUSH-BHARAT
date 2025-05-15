import React from 'react';

const videos = [
  {
    id: 1,
    src: '/videos/video1.mp4',
    caption: 'Bala movie ke scene haunt karne lagte hain?',
    thumbnail: 'https://www.zeroharm.in/cdn/shop/files/biotin-01.jpg?v=1718445398&width=990',
  },
  {
    id: 2,
    src: '/videos/video2.mp4',
    caption: 'I don’t wear a helmet, mujhe usse hair fall hota hai',
    thumbnail: 'https://www.zeroharm.in/cdn/shop/files/biotin-01.jpg?v=1718445398&width=990',
  },
  {
    id: 3,
    src: '/videos/video3.mp4',
    caption: 'most think that it is all genetics',
    thumbnail: 'https://www.zeroharm.in/cdn/shop/files/biotin-01.jpg?v=1718445398&width=990',
  },
  {
    id: 4,
    src: '/videos/video4.mp4',
    caption: '',
    thumbnail: 'https://www.zeroharm.in/cdn/shop/files/biotin-01.jpg?v=1718445398&width=990',
  },
];

const VideoScrollSection = () => {
  return (
    <div className="bg-cream py-6 mt-16 mb-8">
      {/* Horizontal Scroll */}
      <div className="overflow-x-auto justify-center items-center whitespace-nowrap px-4 flex space-x-4 scrollbar-hide">
        {videos.map((video) => (
          <div
            key={video.id}
            className="w-[220px] flex-shrink-0 rounded-xl overflow-hidden shadow-md bg-white"
          >
            <video
              className="w-full h-[380px] object-cover"
              poster={video.thumbnail}
              controls
              preload="none"
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
           
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-16  grid grid-cols-5 gap-4 px-6 text-center bg-dark-green py-4 text-white">
      
          <div className='flex justify-center items-center gap-2'>
<div className="text-xl">🎬</div>
          <div className="text-sm mt-1">Videos</div>
          </div>
     
        
        <div className='flex justify-center items-center gap-2'>
          <div className="text-xl">🌿</div>
          <div className="text-sm mt-1">Benefits</div>
        </div>
        <div className='flex justify-center items-center gap-2'>
          <div className="text-xl">⭐</div>
          <div className="text-sm mt-1">Reviews</div>
        </div>
        <div className='flex justify-center items-center gap-2'>
          <div className="text-xl">❓</div>
          <div className="text-sm mt-1">FAQs</div>
        </div>
        <div className='flex justify-center items-center gap-2'>
          <div className="text-xl">🧪</div>
          <div className="text-sm mt-1">Ingredients</div>
        </div>
      </div>
    </div>
  );
};

export default VideoScrollSection;
