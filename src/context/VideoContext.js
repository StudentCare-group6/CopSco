import React, { createContext, useState } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <VideoContext.Provider value={{ selectedVideo, setSelectedVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
