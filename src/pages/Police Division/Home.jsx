import React from "react";
import VideoSamples from "../../components/Police Division/Home/VideoSamples"
import PaginationRounded from "../../components/Police Division/Home/Pagination";

export default function Home() {
  
  return (
    <>
      <div className="flex-auto overflow-hidden w-[99%]">
        <div className="flex flex-col h-full">
          <div className="overflow-y-auto">
            <div className="max-h-[calc(100vh-100px)] w-[99%]">
              <VideoSamples />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-[38%] mt-10">
        <PaginationRounded />
      </div>
    </>
  );
}
