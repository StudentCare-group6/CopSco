import React, { createContext, useState } from 'react';

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <VideoContext.Provider value={{ selectedVideo, setSelectedVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
